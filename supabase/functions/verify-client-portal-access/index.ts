import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerifyAccessRequest {
  documentId: string
  clientToken: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { documentId, clientToken }: VerifyAccessRequest = await req.json()

    if (!documentId || !clientToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Document ID and client token are required' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verify client token and get document info
    // This is a simple token verification - in production you might want more robust security
    const expectedToken = generateClientToken(documentId)
    
    if (clientToken !== expectedToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid access token' 
        }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Try to find the document in various tables
    const documentInfo = await findDocumentInTables(supabaseClient, documentId)
    
    if (!documentInfo) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Document not found' 
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get client information
    const { data: clientData } = await supabaseClient
      .from('clients')
      .select('name, company_name, email')
      .eq('id', documentInfo.client_id)
      .single()

    const responseDocument = {
      id: documentInfo.id,
      title: documentInfo.title,
      type: documentInfo.type,
      amount: documentInfo.amount || 0,
      status: documentInfo.status,
      created_at: documentInfo.created_at,
      client_name: clientData?.name || 'Unknown Client',
      company_name: clientData?.company_name || '',
      signnow_document_id: documentInfo.signnow_document_id,
      signed_at: documentInfo.signed_at,
      signed_document_url: documentInfo.signed_document_url
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        document: responseDocument 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error verifying client portal access:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function generateClientToken(documentId: string): string {
  // Simple token generation - in production use more robust method
  // This should match the token generation in your main application
  const secret = Deno.env.get('CLIENT_PORTAL_SECRET') || 'default-secret'
  const encoder = new TextEncoder()
  const data = encoder.encode(`${documentId}-${secret}`)
  
  // Simple hash (in production, use crypto.subtle.digest)
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data[i]
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(36)
}

async function findDocumentInTables(supabaseClient: any, documentId: string) {
  const tables = [
    { name: 'estimates', type: 'estimate' },
    { name: 'quotes', type: 'quote' },
    { name: 'invoices', type: 'invoice' },
    { name: 'contracts', type: 'contract' },
    { name: 'work_orders', type: 'workorder' },
    { name: 'bids', type: 'bid' },
    { name: 'business_proposals', type: 'proposal' }
  ]

  for (const table of tables) {
    try {
      const { data, error } = await supabaseClient
        .from(table.name)
        .select('*')
        .eq('id', documentId)
        .single()

      if (!error && data) {
        return {
          ...data,
          type: table.type
        }
      }
    } catch (error) {
      // Continue to next table
      console.log(`Document not found in ${table.name}:`, error)
    }
  }

  return null
}