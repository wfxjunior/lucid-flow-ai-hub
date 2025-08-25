
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Enhanced CORS configuration (Security Fix #3)
const getSecureCorsHeaders = (origin: string | null) => {
  const allowedOrigins = [
    'https://featherbiz.io',
    'https://lovable.app',
    'http://localhost:5173' // Only in development
  ]
  
  // Check if origin is allowed
  const allowedOrigin = allowedOrigins.find(allowed => 
    origin === allowed || 
    (origin && allowed.includes('localhost') && origin.includes('localhost'))
  )
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin || allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400',
    // Additional security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  }
}

serve(async (req) => {
  const origin = req.headers.get('origin')
  const corsHeaders = getSecureCorsHeaders(origin)

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { action, maxRequests = 10, windowMinutes = 15 } = await req.json()

    // Get client IP from various possible headers
    const clientIP = req.headers.get('cf-connecting-ip') || 
                    req.headers.get('x-forwarded-for')?.split(',')[0] || 
                    req.headers.get('x-real-ip') || 
                    'unknown'

    console.log(`Security middleware: Checking rate limit for ${action} from ${clientIP}`)

    // Enhanced rate limiting with security monitoring
    const { data: allowed, error } = await supabase.rpc('enhanced_rate_limit_check', {
      client_ip: clientIP,
      action: action,
      user_context: null,
      max_requests: maxRequests,
      window_minutes: windowMinutes
    })

    if (error) {
      console.error('Rate limit check error:', error)
      return new Response(
        JSON.stringify({ 
          allowed: false, 
          error: 'Security check failed',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const response = {
      allowed: allowed === true,
      action,
      clientIP: clientIP.substring(0, 8) + '***', // Partial IP for logging
      timestamp: new Date().toISOString(),
      windowMinutes,
      maxRequests
    }

    if (!allowed) {
      console.log(`Rate limit exceeded for ${action} from ${clientIP}`)
      return new Response(
        JSON.stringify({ 
          ...response, 
          message: 'Rate limit exceeded. Please try again later.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Rate limit check passed for ${action}`)
    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Security middleware error:', error)
    return new Response(
      JSON.stringify({ 
        allowed: false, 
        error: 'Internal security error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
