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

    // Require a configured secret for client portal access
    if (!Deno.env.get('CLIENT_PORTAL_SECRET')) {
      console.error('CLIENT_PORTAL_SECRET is not configured')
      return new Response(
        JSON.stringify({ success: false, error: 'Access not available' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

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

    // Verify HMAC-based client token with expiry
    const isValid = await verifyClientToken(documentId, clientToken)
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid or expired access token' 
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

async function generateClientToken(documentId: string, ttlSeconds: number = 60 * 60 * 24): Promise<string> {
  const secret = Deno.env.get('CLIENT_PORTAL_SECRET') || 'default-secret'
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const data = encoder.encode(`${documentId}.${exp}`)
  const signature = await crypto.subtle.sign('HMAC', key, data)
  const sigB64 = toBase64Url(new Uint8Array(signature))
  return `${exp}.${sigB64}`
}

async function verifyClientToken(documentId: string, token: string): Promise<boolean> {
  try {
    const secret = Deno.env.get('CLIENT_PORTAL_SECRET') || 'default-secret'
    const [expStr, sig] = token.split('.')
    if (!expStr || !sig) return false
    const exp = parseInt(expStr, 10)
    if (!Number.isFinite(exp) || Math.floor(Date.now() / 1000) > exp) return false

    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const data = encoder.encode(`${documentId}.${exp}`)
    const signature = await crypto.subtle.sign('HMAC', key, data)
    const expected = toBase64Url(new Uint8Array(signature))
    return timingSafeEqual(expected, sig)
  } catch (_) {
    return false
  }
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  const base64 = btoa(binary)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
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