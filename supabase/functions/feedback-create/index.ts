import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const body = await req.json();
    const payload = {
      rating: body.rating,
      comment: (body.comment || '').slice(0, 300),
      locale: body.locale || 'en',
      source: body.source || 'featherbot_end_of_chat',
      user_id: body.user_id || null
    };
    const { data, error } = await supabase.from('featherbot_feedback').insert(payload).select('id').single();
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, id: data.id }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
  }
});