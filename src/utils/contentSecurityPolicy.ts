
// Content Security Policy and security headers
export const applySecurityHeaders = () => {
  // Apply CSP via meta tag if not already set by server
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta')
    cspMeta.httpEquiv = 'Content-Security-Policy'
    cspMeta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co",
      "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
    
    document.head.appendChild(cspMeta)
  }

  // Apply additional security headers via meta tags
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' },
    { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), location=(), payment=()' }
  ]

  securityMetas.forEach(meta => {
    if (!document.querySelector(`meta[http-equiv="${meta.httpEquiv}"]`)) {
      const metaElement = document.createElement('meta')
      metaElement.httpEquiv = meta.httpEquiv
      metaElement.content = meta.content
      document.head.appendChild(metaElement)
    }
  })
}

// Validate that we're running on expected domain
export const validateDomain = () => {
  const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'featherbiz.io',
    'www.featherbiz.io',
    'lovable.app'
  ]

  const currentDomain = window.location.hostname
  
  if (!allowedDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith(`.${domain}`)
  )) {
    console.warn('Application running on unexpected domain:', currentDomain)
    return false
  }

  return true
}

// XSS protection utilities
export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

export const escapeHTML = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
