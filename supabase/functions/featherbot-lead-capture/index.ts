import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface LeadCaptureRequest {
  name: string
  email: string
  language: string
  timestamp: string
  page_url?: string
}

serve(async (req) => {
  console.log('Lead capture function called')
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, language, timestamp, page_url }: LeadCaptureRequest = await req.json()
    console.log('Lead capture request:', { name, email, language, timestamp, page_url })

    if (!name || !email) {
      throw new Error('Name and email are required')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store lead in database
    const { error: dbError } = await supabase
      .from('featherbot_leads')
      .insert({
        name,
        email,
        language,
        source: 'pricing_chatbot',
        created_at: timestamp
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue with email even if DB fails
    }

    // Standard user confirmation email template - user_confirm_generic_v1
    const firstName = name.split(' ')[0]
    const displayName = firstName || name
    const currentTimestamp = new Date().toISOString()
    const pageUrl = page_url || 'Chatbot interaction'

    const userConfirmationTemplate = {
      subject: "We received your request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <div style="padding: 30px; background: white;">
            <p>Hi ${displayName},</p>
            <br>
            <p>Thanks for reaching out to FeatherBiz. We've received your request and our team will get back to you shortly.</p>
            <br>
            <p><strong>Summary</strong></p>
            <ul style="margin: 10px 0;">
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Submitted from: ${pageUrl}</li>
              <li>Time: ${currentTimestamp}</li>
            </ul>
            <br>
            <p>If you didn't make this request, reply to this email.</p>
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
      text: `Hi ${displayName},

Thanks for reaching out to FeatherBiz. We've received your request and our team will get back to you shortly.

Summary
• Name: ${name}
• Email: ${email}
• Submitted from: ${pageUrl}
• Time: ${currentTimestamp}

If you didn't make this request, reply to this email.

FeatherBiz - Modern Business Management Platform
Privacy Policy: https://featherbiz.io/privacy`
    }

    // Send user confirmation email
    const userEmailResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: [email],
      subject: userConfirmationTemplate.subject,
      html: userConfirmationTemplate.html,
      text: userConfirmationTemplate.text,
    })

    console.log('User confirmation email sent:', userEmailResponse)

    // Send internal notification to hello@featherbiz.io
    const adminEmailResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: ['hello@featherbiz.io'],
      subject: '[FeatherBiz] New submission — leads.create',
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Timestamp:</strong> ${currentTimestamp}</p>
        <p><strong>Page URL:</strong> ${pageUrl}</p>
        <p><strong>Locale:</strong> ${language}</p>
        <br>
        <p><strong>Submitted Fields:</strong></p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Source: Pricing Chatbot</li>
        </ul>
      `,
      text: `New Lead Submission

Timestamp: ${currentTimestamp}
Page URL: ${pageUrl}
Locale: ${language}

Submitted Fields:
- Name: ${name}
- Email: ${email}
- Source: Pricing Chatbot`
    })

    console.log('Internal notification sent:', adminEmailResponse)

    // Log analytics event
    console.log('[Analytics] form_submit_success', { 
      form_name: 'leads.create', 
      email, 
      locale: language, 
      page_url: pageUrl, 
      timestamp: currentTimestamp 
    })
    console.log('[Analytics] notify_internal_sent', { form_name: 'leads.create', timestamp: currentTimestamp })
    console.log('[Analytics] user_confirmation_sent', { form_name: 'leads.create', email, timestamp: currentTimestamp })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead captured successfully',
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error: any) {
    console.error('Error in lead capture function:', error)
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