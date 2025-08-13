import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const body = await req.json();
    const { friend_email, sender_email, locale = 'en', source = 'featherbot_end_of_chat', consent, page_url } = body;
    if (!friend_email || !consent) {
      return new Response(JSON.stringify({ ok: false, error: 'friend_email and consent required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }
    
    const currentTimestamp = new Date().toISOString();
    const pageUrl = page_url || 'Referral form';

    const { data, error } = await supabase.from('featherbot_referrals').insert({
      friend_email,
      sender_email: sender_email || null,
      locale,
      source,
      consent: !!consent,
      status: 'pending'
    }).select('id').single();
    if (error) throw error;

    // Send internal notification to hello@featherbiz.io
    await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: ['hello@featherbiz.io'],
      subject: '[FeatherBiz] New submission — referrals.create',
      html: `
        <h2>New Referral Submission</h2>
        <p><strong>Timestamp:</strong> ${currentTimestamp}</p>
        <p><strong>Page URL:</strong> ${pageUrl}</p>
        <p><strong>Locale:</strong> ${locale}</p>
        <br>
        <p><strong>Submitted Fields:</strong></p>
        <ul>
          <li>Friend Email: ${friend_email}</li>
          <li>Sender Email: ${sender_email || 'Not provided'}</li>
          <li>Source: ${source}</li>
          <li>Consent: ${consent ? 'Yes' : 'No'}</li>
        </ul>
      `,
      text: `New Referral Submission

Timestamp: ${currentTimestamp}
Page URL: ${pageUrl}
Locale: ${locale}

Submitted Fields:
- Friend Email: ${friend_email}
- Sender Email: ${sender_email || 'Not provided'}
- Source: ${source}
- Consent: ${consent ? 'Yes' : 'No'}`
    });

    // Send double opt-in email to friend
    await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      replyTo: 'hello@featherbiz.io',
      to: [friend_email],
      subject: locale === 'pt' ? 'Convite do FeatherBiz' : 'FeatherBiz Invitation',
      html: `<p>${locale === 'pt' ? 'Seu amigo recomenda o FeatherBiz.' : 'Your friend recommends FeatherBiz.'}</p>
             <p>${locale === 'pt' ? 'Quer receber um convite?' : 'Would you like to receive an invite?'}</p>
             <p>${locale === 'pt' ? 'Confirme seu interesse respondendo a este e-mail.' : 'Please confirm by replying to this email.'}</p>`
    });

    // Send confirmation to sender if provided - user_confirm_referral_v1
    if (sender_email) {
      const senderFirstName = sender_email.split('@')[0];
      await resend.emails.send({
        from: 'FeatherBiz <hello@featherbiz.io>',
        replyTo: 'hello@featherbiz.io',
        to: [sender_email],
        subject: "We've sent your referral",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <div style="padding: 30px; background: white;">
              <p>Hi ${senderFirstName},</p>
              <br>
              <p>Your referral to ${friend_email} has been sent. We'll keep you posted on any updates.</p>
              <br>
              <p>Manage referrals: <a href="https://featherbiz.io/referrals" style="color: #2563eb;">https://featherbiz.io/referrals</a></p>
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
        text: `Hi ${senderFirstName},

Your referral to ${friend_email} has been sent. We'll keep you posted on any updates.

Manage referrals: https://featherbiz.io/referrals

Thank you,
FeatherBiz Team

FeatherBiz - Modern Business Management Platform
Privacy Policy: https://featherbiz.io/privacy`
      });
    }

    // Log analytics events
    console.log('[Analytics] form_submit_success', { 
      form_name: 'referrals.create', 
      email: friend_email, 
      locale, 
      page_url: pageUrl, 
      timestamp: currentTimestamp 
    });
    console.log('[Analytics] notify_internal_sent', { form_name: 'referrals.create', timestamp: currentTimestamp });
    console.log('[Analytics] user_confirmation_sent', { form_name: 'referrals.create', email: sender_email, timestamp: currentTimestamp });

    return new Response(JSON.stringify({ 
      ok: true, 
      id: data.id, 
      message: "Referral sent. We've emailed a confirmation to you." 
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  }
});