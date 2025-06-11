
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
    const { documentId, accessToken } = await req.json()
    
    if (!documentId || !accessToken) {
      throw new Error('Missing required fields: documentId, accessToken')
    }

    const response = await fetch(`https://api-eval.signnow.com/document/${documentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SignNow status error:', errorText)
      throw new Error(`Status check failed: ${response.status}`)
    }

    const result = await response.json()
    
    // Map SignNow status to our internal status
    let status = 'pending'
    if (result.status === 'completed' || result.status === 'signed') {
      status = 'signed'
    } else if (result.status === 'declined') {
      status = 'declined'
    }
    
    return new Response(JSON.stringify({
      ...result,
      mapped_status: status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Status check error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Status check failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
