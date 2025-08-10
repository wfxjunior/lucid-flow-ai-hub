import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface ListTemplatesReq {
  context?: string
  language?: string
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: req.headers.get("Authorization") || "" } },
  })

  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  try {
    const body: ListTemplatesReq = req.method === "GET"
      ? Object.fromEntries(new URL(req.url).searchParams.entries()) as any
      : await req.json()

    const context = (body.context || '').trim()
    const language = (body.language || 'en').trim()

    let query = supabase
      .from('templates')
      .select('*')
      .or(`user_id.eq.${auth.user.id},user_id.is.null,is_default.eq.true`)

    if (context) query = query.eq('context', context)
    if (language) query = query.eq('language', language)

    let { data: rows, error } = await query
    if (error) throw error

    // Fallback to English if no results and language != en
    if ((!rows || rows.length === 0) && language !== 'en') {
      let qb2 = supabase
        .from('templates')
        .select('*')
        .or(`user_id.eq.${auth.user.id},user_id.is.null,is_default.eq.true`)
      if (context) qb2 = qb2.eq('context', context)
      qb2 = qb2.eq('language', 'en')
      const alt = await qb2
      if (!alt.error) rows = alt.data || []
    }

    return new Response(JSON.stringify({ templates: rows || [] }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (e: any) {
    console.error('list-templates error:', e)
    return new Response(JSON.stringify({ error: e?.message || 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
