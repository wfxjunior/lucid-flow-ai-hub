
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const clientId = Deno.env.get('SIGNNOW_CLIENT_ID')
    const clientSecret = Deno.env.get('SIGNNOW_CLIENT_SECRET')
    
    if (!clientId || !clientSecret) {
      throw new Error('SignNow credentials not configured')
    }

    const credentials = btoa(`${clientId}:${clientSecret}`)
    
    const response = await fetch('https://api-eval.signnow.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SignNow auth error:', errorText)
      throw new Error(`Authentication failed: ${response.status}`)
    }

    const tokenData: TokenResponse = await response.json()
    
    return new Response(JSON.stringify(tokenData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Auth error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Authentication failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
