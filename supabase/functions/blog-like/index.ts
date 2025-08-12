/// <reference lib="deno.unstable" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { post_id, client_id } = body || {}
    if (!post_id) return new Response(JSON.stringify({ error: 'post_id required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, serviceKey)

    // Identify user if Authorization header provided (optional)
    let user_id: string | null = null
    try {
      const auth = req.headers.get('authorization') || ''
      if (auth.toLowerCase().startsWith('bearer ')) {
        const jwt = auth.slice(7)
        const { data } = await supabase.auth.getUser(jwt)
        user_id = data.user?.id ?? null
      }
    } catch (_) {}

    // Check if like exists
    const { data: existing, error: fetchErr } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('post_id', post_id)
      .or(user_id ? `user_id.eq.${user_id}` : `client_id.eq.${client_id}`)
      .maybeSingle()

    if (fetchErr) throw fetchErr

    let liked = false
    if (existing) {
      // Unlike
      const { error: delErr } = await supabase.from('blog_likes').delete().eq('id', existing.id)
      if (delErr) throw delErr
      // Decrement count (guard >=0)
      const { data: post } = await supabase.from('blog_posts').select('likes_count').eq('id', post_id).maybeSingle()
      const next = Math.max(0, (post?.likes_count || 1) - 1)
      await supabase.from('blog_posts').update({ likes_count: next }).eq('id', post_id)
      liked = false
      return new Response(JSON.stringify({ liked, likes_count: next }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    } else {
      // Like
      const payload: any = { post_id }
      if (user_id) payload.user_id = user_id
      if (!user_id && client_id) payload.client_id = client_id
      const { error: insErr } = await supabase.from('blog_likes').insert(payload)
      if (insErr) throw insErr
      const { data: post } = await supabase.from('blog_posts').select('likes_count').eq('id', post_id).maybeSingle()
      const next = (post?.likes_count || 0) + 1
      await supabase.from('blog_posts').update({ likes_count: next }).eq('id', post_id)
      liked = true
      return new Response(JSON.stringify({ liked, likes_count: next }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: 'unexpected_error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
