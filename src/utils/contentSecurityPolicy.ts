
// Content Security Policy and Security Headers

export const applySecurityHeaders = () => {
  // Apply CSP via meta tag since we can't modify server headers directly
  const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  if (!existingMeta) {
    const meta = document.createElement('meta')
    meta.httpEquiv = 'Content-Security-Policy'
    meta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.openai.com https://api.stripe.com wss://*.supabase.co",
      "frame-src 'self' https://js.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
    document.head.appendChild(meta)
  }

  // Apply additional security headers via meta tags where possible
  const securityMetas = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' },
    { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
  ]

  securityMetas.forEach(({ httpEquiv, content }) => {
    if (!document.querySelector(`meta[http-equiv="${httpEquiv}"]`)) {
      const meta = document.createElement('meta')
      meta.httpEquiv = httpEquiv
      meta.content = content
      document.head.appendChild(meta)
    }
  })
}

// Validate external URLs before navigation
export const validateExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    
    // Block dangerous protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false
    }
    
    // Block suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /vbscript:/i,
      /data:/i,
      /file:/i
    ]
    
    return !suspiciousPatterns.some(pattern => pattern.test(url))
  } catch {
    return false
  }
}

// Secure iframe sandbox attributes
export const getSecureIframeSandbox = (): string => {
  return 'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
}
