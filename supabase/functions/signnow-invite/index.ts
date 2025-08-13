
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
    // Require authenticated user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token)
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    const { documentId, signerEmail, signerName, accessToken } = await req.json()
    
    if (!documentId || !signerEmail || !accessToken) {
      throw new Error('Missing required fields: documentId, signerEmail, accessToken')
    }

    const inviteData = {
      to: [{
        email: signerEmail,
        role_name: signerName || 'Signer',
        role: 'Signer',
        order: 1,
        decline_by_signature: true,
        remind_after_days: 7
      }],
      from: 'noreply@featherbiz.com',
      subject: 'Please sign this document',
      message: `Hello, please sign this document. Click the link below to review and sign.`
    }

    const response = await fetch(`https://api-eval.signnow.com/document/${documentId}/invite`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inviteData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SignNow invite error:', errorText)
      throw new Error(`Invite failed: ${response.status}`)
    }

    const result = await response.json()
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Invite error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Invite failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
