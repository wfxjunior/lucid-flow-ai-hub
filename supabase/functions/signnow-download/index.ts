
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

    const response = await fetch(`https://api-eval.signnow.com/document/${documentId}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SignNow download error:', errorText)
      throw new Error(`Download failed: ${response.status}`)
    }

    // Get the PDF as array buffer
    const pdfBuffer = await response.arrayBuffer()
    
    // Convert to base64 for easier handling
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)))
    
    return new Response(JSON.stringify({
      success: true,
      pdf_data: base64Pdf,
      content_type: 'application/pdf'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Download error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Download failed' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
