
// Enhanced Security Configuration (Security Fix #3 - CORS & CSP)
interface SecurityConfig {
  corsOrigins: string[]
  cspDirectives: Record<string, string[]>
  trustedDomains: string[]
}

const getSecurityConfig = (): SecurityConfig => {
  const isDevelopment = import.meta.env.DEV
  
  return {
    corsOrigins: isDevelopment 
      ? ['http://localhost:5173', 'https://lovable.app'] 
      : ['https://featherbiz.io', 'https://*.featherbiz.io'],
    
    cspDirectives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://js.stripe.com'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'img-src': ["'self'", 'data:', 'https:', 'blob:'],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'connect-src': [
        "'self'", 
        'https://tvdromfazjzargvesruq.supabase.co',
        'https://api.openai.com',
        'https://api.stripe.com'
      ],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"]
    },
    
    trustedDomains: [
      'featherbiz.io',
      'tvdromfazjzargvesruq.supabase.co',
      'api.openai.com',
      'api.stripe.com'
    ]
  }
}

export const applyEnhancedSecurityHeaders = () => {
  const config = getSecurityConfig()
  
  // Create CSP header value
  const cspValue = Object.entries(config.cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')
  
  // Apply security headers if possible (for meta tags fallback)
  const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  if (!metaCSP) {
    const meta = document.createElement('meta')
    meta.httpEquiv = 'Content-Security-Policy'
    meta.content = cspValue
    document.head.appendChild(meta)
  }
  
  // Apply other security headers via meta tags
  const securityHeaders = [
    { name: 'X-Content-Type-Options', value: 'nosniff' },
    { name: 'X-Frame-Options', value: 'DENY' },
    { name: 'X-XSS-Protection', value: '1; mode=block' },
    { name: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
  ]
  
  securityHeaders.forEach(({ name, value }) => {
    const existing = document.querySelector(`meta[http-equiv="${name}"]`)
    if (!existing) {
      const meta = document.createElement('meta')
      meta.httpEquiv = name
      meta.content = value
      document.head.appendChild(meta)
    }
  })
}

export const validateDomainSecurity = () => {
  const config = getSecurityConfig()
  const currentDomain = window.location.hostname
  const warnings: string[] = []
  
  if (!config.trustedDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith(`.${domain}`)
  )) {
    warnings.push(`Untrusted domain detected: ${currentDomain}`)
  }
  
  if (window.location.protocol !== 'https:' && !import.meta.env.DEV) {
    warnings.push('Insecure HTTP protocol detected in production')
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    domain: currentDomain
  }
}

export const getSecureCorsHeaders = () => {
  const config = getSecurityConfig()
  const origin = window.location.origin
  
  return {
    'Access-Control-Allow-Origin': config.corsOrigins.includes(origin) ? origin : config.corsOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400'
  }
}

export { getSecurityConfig }
