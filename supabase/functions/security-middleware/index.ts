import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), location=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}

interface RateLimitRequest {
  action: string
  ip?: string
  maxRequests?: number
  windowMinutes?: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, ip, maxRequests = 10, windowMinutes = 60 }: RateLimitRequest = await req.json()

    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get client IP from request headers if not provided
    const clientIP = ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    console.log(`Rate limit check for action: ${action}, IP: ${clientIP}`)

    // Check rate limit using the database function
    const { data: isAllowed, error: rateLimitError } = await supabase
      .rpc('check_rate_limit', {
        client_ip: clientIP,
        action: action,
        max_requests: maxRequests,
        window_minutes: windowMinutes
      })

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError)
      return new Response(
        JSON.stringify({ error: 'Rate limit check failed' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!isAllowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}, action: ${action}`)
      
      // Log security event for rate limit violation
      await supabase.rpc('log_security_event', {
        p_table_name: 'rate_limits',
        p_operation: 'RATE_LIMIT_EXCEEDED',
        p_record_id: `${clientIP}_${action}`,
        p_old_data: null,
        p_new_data: {
          ip: clientIP,
          action: action,
          max_requests: maxRequests,
          window_minutes: windowMinutes,
          timestamp: new Date().toISOString()
        }
      })

      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          retryAfter: windowMinutes * 60
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(windowMinutes * 60)
          } 
        }
      )
    }

    // Clean up old rate limit entries periodically
    if (Math.random() < 0.1) { // 10% chance to clean up
      await supabase.rpc('cleanup_old_rate_limits')
    }

    return new Response(
      JSON.stringify({ 
        allowed: true,
        remaining: maxRequests - 1 // Approximate remaining requests
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Security middleware error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})