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
    const { friend_email, sender_email, locale = 'en', source = 'featherbot_end_of_chat', consent } = body;
    if (!friend_email || !consent) {
      return new Response(JSON.stringify({ ok: false, error: 'friend_email and consent required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }

    const { data, error } = await supabase.from('featherbot_referrals').insert({
      friend_email,
      sender_email: sender_email || null,
      locale,
      source,
      consent: !!consent,
      status: 'pending'
    }).select('id').single();
    if (error) throw error;

    // Send double opt-in email
    await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      to: [friend_email],
      subject: locale === 'pt' ? 'Convite do FeatherBiz' : 'FeatherBiz Invitation',
      html: `<p>${locale === 'pt' ? 'Seu amigo recomenda o FeatherBiz.' : 'Your friend recommends FeatherBiz.'}</p>
             <p>${locale === 'pt' ? 'Quer receber um convite?' : 'Would you like to receive an invite?'}</p>
             <p>${locale === 'pt' ? 'Confirme seu interesse respondendo a este e-mail.' : 'Please confirm by replying to this email.'}</p>`
    });

    return new Response(JSON.stringify({ ok: true, id: data.id }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  }
});