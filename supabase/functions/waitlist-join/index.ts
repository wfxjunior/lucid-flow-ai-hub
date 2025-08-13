import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface WaitlistRequest {
  email: string
  name?: string
  page_url?: string
}

serve(async (req) => {
  console.log('Waitlist join function called')
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, name, page_url }: WaitlistRequest = await req.json()
    console.log('Waitlist request:', { email, name, page_url })

    if (!email) {
      throw new Error('Email is required')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const currentTimestamp = new Date().toISOString()
    const pageUrl = page_url || 'Scale waitlist page'
    const firstName = name ? name.split(' ')[0] : email.split('@')[0]

    // Store waitlist entry in database (you may need to create this table)
    const { error: dbError } = await supabase
      .from('scale_waitlist')
      .insert({
        email,
        name: name || null,
        created_at: currentTimestamp
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue with email even if DB fails
    }

    // Send internal notification to hello@featherbiz.io
    const internalNotificationResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: ['hello@featherbiz.io'],
      subject: '[FeatherBiz] New submission — waitlist.join',
      html: `
        <h2>New Scale Waitlist Submission</h2>
        <p><strong>Timestamp:</strong> ${currentTimestamp}</p>
        <p><strong>Page URL:</strong> ${pageUrl}</p>
        <p><strong>Locale:</strong> en</p>
        <br>
        <p><strong>Submitted Fields:</strong></p>
        <ul>
          <li>Email: ${email}</li>
          ${name ? `<li>Name: ${name}</li>` : ''}
        </ul>
      `,
      text: `New Scale Waitlist Submission

Timestamp: ${currentTimestamp}
Page URL: ${pageUrl}
Locale: en

Submitted Fields:
- Email: ${email}
${name ? `- Name: ${name}` : ''}`
    })

    console.log('Internal notification sent:', internalNotificationResponse)

    // Send user confirmation email - user_confirm_scale_ea_v1
    const userEmailResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: [email],
      subject: "You're on the Scale Early Access list",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <div style="padding: 30px; background: white;">
            <p>Hi ${firstName},</p>
            <br>
            <p>You've been added to the Scale Early Access waitlist. We'll notify you as soon as invites roll out.</p>
            <br>
            <p><strong>What happens next</strong></p>
            <ul style="margin: 10px 0;">
              <li>We review applications in batches.</li>
              <li>You'll receive an invite email when selected.</li>
              <li>Reply to this email if your use case changes.</li>
            </ul>
            <br>
            <p>Thank you,<br>FeatherBiz Team</p>
            <br>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              FeatherBiz - Modern Business Management Platform<br>
              <a href="https://featherbiz.io/privacy" style="color: #6b7280;">Privacy Policy</a> | 
              <a href="https://featherbiz.io" style="color: #6b7280;">featherbiz.io</a>
            </p>
          </div>
        </div>
      `,
      text: `Hi ${firstName},

You've been added to the Scale Early Access waitlist. We'll notify you as soon as invites roll out.

What happens next
• We review applications in batches.
• You'll receive an invite email when selected.
• Reply to this email if your use case changes.

Thank you,
FeatherBiz Team

FeatherBiz - Modern Business Management Platform
Privacy Policy: https://featherbiz.io/privacy`
    })

    console.log('User confirmation email sent:', userEmailResponse)

    // Log analytics events
    console.log('[Analytics] form_submit_success', { 
      form_name: 'waitlist.join', 
      email, 
      locale: 'en', 
      page_url: pageUrl, 
      timestamp: currentTimestamp 
    })
    console.log('[Analytics] notify_internal_sent', { form_name: 'waitlist.join', timestamp: currentTimestamp })
    console.log('[Analytics] user_confirmation_sent', { form_name: 'waitlist.join', email, timestamp: currentTimestamp })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "You're on the list. A confirmation was sent to your email.",
        userEmailId: userEmailResponse.data?.id,
        internalEmailId: internalNotificationResponse.data?.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error: any) {
    console.error('Error in waitlist join function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})