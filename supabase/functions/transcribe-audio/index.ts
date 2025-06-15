
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Transcribe audio function called')
    
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      console.error('No audio file provided')
      throw new Error('No audio file provided')
    }

    console.log('Audio file received, size:', audioFile.size)

    // Get OpenAI API key
    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIKey) {
      console.error('OpenAI API key not found')
      throw new Error('OpenAI API key not configured')
    }

    // Convert file to format suitable for OpenAI
    const openAIFormData = new FormData()
    openAIFormData.append('file', audioFile, 'audio.webm')
    openAIFormData.append('model', 'whisper-1')
    openAIFormData.append('language', 'pt') // Portuguese language

    console.log('Sending request to OpenAI Whisper API')

    // Send to OpenAI Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
      },
      body: openAIFormData,
    })

    console.log('OpenAI response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    console.log('Transcription successful:', result.text)

    return new Response(
      JSON.stringify({ transcript: result.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in transcribe-audio function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
