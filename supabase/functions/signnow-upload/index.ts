
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

    const { documentContent, fileName, accessToken } = await req.json()
    
    if (!documentContent || !fileName || !accessToken) {
      throw new Error('Missing required fields: documentContent, fileName, accessToken')
    }

    // Convert base64 to binary if needed
    let documentData = documentContent
    if (typeof documentContent === 'string' && documentContent.startsWith('data:')) {
      documentData = documentContent.split(',')[1]
    }

    const formData = new FormData()
    
    // Create blob from base64
    const binaryString = atob(documentData)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: 'application/pdf' })
    
    formData.append('file', blob, fileName)

    const response = await fetch('https://api-eval.signnow.com/document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SignNow upload error:', errorText)
      throw new Error(`Upload failed: ${response.status}`)
    }

    const result = await response.json()
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Upload failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
