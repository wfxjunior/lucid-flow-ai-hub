
// Enhanced Content Security Policy utilities
export const applyEnhancedSecurityHeaders = (): void => {
  // Create a more restrictive CSP
  const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-eval'", // Required for React dev tools and some libraries
      "https://js.stripe.com",
      "https://maps.googleapis.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for CSS-in-JS and Tailwind
      "https://fonts.googleapis.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "blob:"
    ],
    'font-src': [
      "'self'",
      "data:",
      "https://fonts.gstatic.com"
    ],
    'connect-src': [
      "'self'",
      "https://tvdromfazjzargvesruq.supabase.co",
      "https://api.stripe.com"
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'object-src': ["'none'"],
    'media-src': ["'self'"],
    'worker-src': ["'self'", "blob:"]
  }

  const cspString = Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')

  // Apply security headers via meta tags (for client-side)
  const existingCsp = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  if (existingCsp) {
    existingCsp.setAttribute('content', cspString)
  } else {
    const meta = document.createElement('meta')
    meta.setAttribute('http-equiv', 'Content-Security-Policy')
    meta.setAttribute('content', cspString)
    document.head.appendChild(meta)
  }

  // Additional security headers
  const securityHeaders = [
    ['X-Frame-Options', 'DENY'],
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
    ['Permissions-Policy', 'camera=(), microphone=(), location=(), payment=()']
  ]

  securityHeaders.forEach(([name, value]) => {
    const existing = document.querySelector(`meta[http-equiv="${name}"]`)
    if (existing) {
      existing.setAttribute('content', value)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('http-equiv', name)
      meta.setAttribute('content', value)
      document.head.appendChild(meta)
    }
  })
}

export const validateDomainSecurity = (): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = []
  const hostname = window.location.hostname

  // Check for development vs production
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    warnings.push('Running on localhost - ensure production security is configured')
  }

  // Check protocol
  if (window.location.protocol !== 'https:' && hostname !== 'localhost') {
    warnings.push('Not using HTTPS - data transmission is not secure')
  }

  // Check for mixed content
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const mixedContent = scripts.some(script => {
    const src = script.getAttribute('src')
    return src && src.startsWith('http:') && window.location.protocol === 'https:'
  })

  if (mixedContent) {
    warnings.push('Mixed content detected - some resources loaded over HTTP')
  }

  return {
    isValid: warnings.length === 0,
    warnings
  }
}

export const monitorClientSideThreats = (): (() => void) => {
  const threatPatterns = [
    /eval\s*\(/gi,
    /innerHTML\s*=/gi,
    /document\.write/gi,
    /javascript:/gi,
    /<script/gi
  ]

  // Monitor for potential XSS attempts
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const content = element.innerHTML || element.textContent || ''
            
            threatPatterns.forEach((pattern) => {
              if (pattern.test(content)) {
                console.warn('Potential security threat detected:', content.substring(0, 100))
                // Log to security monitoring
                if (window.gtag) {
                  window.gtag('event', 'security_threat_detected', {
                    threat_type: 'client_side_injection',
                    content_sample: content.substring(0, 50)
                  })
                }
              }
            })
          }
        })
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Return cleanup function
  return () => observer.disconnect()
}
