
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fileUrl, fileName } = await req.json()
    
    if (!fileUrl) {
      throw new Error('File URL is required')
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    console.log('Processing file:', fileName)

    // Call OpenAI Vision API to extract data from the image
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this receipt/invoice image and extract the following information in JSON format:
                {
                  "title": "Brief descriptive title for the document",
                  "vendor": "Company/vendor name",
                  "amount": "Total amount as a number",
                  "date": "Date in YYYY-MM-DD format",
                  "category": "Expense category (choose from: Office Supplies, Travel & Transportation, Meals & Entertainment, Software & Subscriptions, Equipment & Hardware, Marketing & Advertising, Professional Services, Utilities, Rent & Facilities, Insurance, Taxes, Other)",
                  "items": "Array of items/services",
                  "tax_amount": "Tax amount if visible",
                  "payment_method": "Payment method if visible"
                }
                
                Only return valid JSON. If information is not clear or visible, use null for that field.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: fileUrl
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    console.log('OpenAI response:', openaiData)

    if (!openaiData.choices || !openaiData.choices[0] || !openaiData.choices[0].message) {
      throw new Error('Invalid response from OpenAI')
    }

    const content = openaiData.choices[0].message.content
    let extractedData

    try {
      // Try to parse the JSON response
      extractedData = JSON.parse(content)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', content)
      // If parsing fails, create a basic response
      extractedData = {
        title: fileName,
        vendor: null,
        amount: null,
        date: null,
        category: "Other",
        items: [],
        tax_amount: null,
        payment_method: null
      }
    }

    console.log('Extracted data:', extractedData)

    return new Response(
      JSON.stringify(extractedData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in extract-receipt-data function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process receipt' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
