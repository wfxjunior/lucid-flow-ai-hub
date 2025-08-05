
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

    // Get language from request or default to auto-detect
    const language = formData.get('language') as string || 'auto'
    
    // Convert file to format suitable for OpenAI
    const openAIFormData = new FormData()
    openAIFormData.append('file', audioFile, 'audio.webm')
    openAIFormData.append('model', 'whisper-1')
    
    // Only set language if not auto-detect
    if (language !== 'auto') {
      openAIFormData.append('language', language)
    }
    
    // Add prompt for better recognition of business terms
    openAIFormData.append('prompt', 'Business commands: invoice, customer, project, appointment, analytics, estimate, quote, billing, meeting, schedule')

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

    // Process the transcript for better command recognition
    const processedTranscript = processBusinessCommands(result.text)

    return new Response(
      JSON.stringify({ 
        transcript: result.text,
        processedTranscript: processedTranscript,
        confidence: 'high' // Whisper doesn't return confidence, but we can indicate quality
      }),
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

// Function to enhance business command recognition
function processBusinessCommands(transcript: string): string {
  let processed = transcript.toLowerCase().trim()
  
  // Common misheard words and their corrections
  const corrections: Record<string, string> = {
    // Invoice variations
    'in voice': 'invoice',
    'invoice': 'invoice',
    'invoices': 'invoices',
    'in voices': 'invoices',
    'bill': 'invoice',
    'billing': 'invoices',
    
    // Customer variations
    'customer': 'customers',
    'customers': 'customers',
    'client': 'customers',
    'clients': 'customers',
    
    // Project variations
    'project': 'projects',
    'projects': 'projects',
    'project': 'projects',
    
    // Appointment variations
    'appointment': 'appointments',
    'appointments': 'appointments',
    'meeting': 'appointments',
    'meetings': 'appointments',
    'schedule': 'appointments',
    
    // Analytics variations
    'analytics': 'analytics',
    'analysis': 'analytics',
    'dashboard': 'analytics',
    'reports': 'analytics',
    'report': 'analytics',
    
    // Estimate variations
    'estimate': 'estimates',
    'estimates': 'estimates',
    'quote': 'estimates',
    'quotes': 'estimates',
    
    // Action words
    'show': 'open',
    'display': 'open',
    'view': 'open',
    'go to': 'open',
    'navigate to': 'open',
    'take me to': 'open'
  }
  
  // Apply corrections
  for (const [incorrect, correct] of Object.entries(corrections)) {
    const regex = new RegExp(`\\b${incorrect}\\b`, 'gi')
    processed = processed.replace(regex, correct)
  }
  
  return processed
}
