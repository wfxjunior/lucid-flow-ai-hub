
// Enhanced Content Security Policy and security headers
export const applyEnhancedSecurityHeaders = () => {
  // Remove any existing CSP meta tags
  const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  if (existingCSP) {
    existingCSP.remove()
  }

  // Apply enhanced CSP via meta tag
  const cspMeta = document.createElement('meta')
  cspMeta.httpEquiv = 'Content-Security-Policy'
  cspMeta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://*.supabase.co",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co https://api.openai.com",
    "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ].join('; ')
  
  document.head.appendChild(cspMeta)

  // Apply additional security headers
  const securityHeaders = [
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' },
    { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), location=(), payment=(), geolocation=(), gyroscope=(), magnetometer=()' },
    { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' }
  ]

  securityHeaders.forEach(header => {
    const existingMeta = document.querySelector(`meta[http-equiv="${header.httpEquiv}"]`)
    if (existingMeta) {
      existingMeta.remove()
    }
    
    const metaElement = document.createElement('meta')
    metaElement.httpEquiv = header.httpEquiv
    metaElement.content = header.content
    document.head.appendChild(metaElement)
  })
}

// Enhanced domain validation with additional security checks
export const validateDomainSecurity = (): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = []
  
  const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'featherbiz.io',
    'www.featherbiz.io',
    'lovable.app'
  ]

  const currentDomain = window.location.hostname
  const isValidDomain = allowedDomains.some(domain => 
    currentDomain === domain || currentDomain.endsWith(`.${domain}`)
  )
  
  if (!isValidDomain) {
    warnings.push(`Application running on unexpected domain: ${currentDomain}`)
  }

  // Check for HTTPS in production
  if (currentDomain !== 'localhost' && currentDomain !== '127.0.0.1' && window.location.protocol !== 'https:') {
    warnings.push('Application should be served over HTTPS in production')
  }

  // Check for mixed content
  if (window.location.protocol === 'https:' && document.querySelectorAll('script[src^="http:"], link[href^="http:"], img[src^="http:"]').length > 0) {
    warnings.push('Mixed content detected - some resources are loaded over HTTP')
  }

  return {
    isValid: isValidDomain && warnings.length === 0,
    warnings
  }
}

// Security event monitoring for client-side threats
export const monitorClientSideThreats = () => {
  // Monitor for console access attempts (potential developer tools abuse)
  let devToolsOpen = false
  const devtools = { open: false, orientation: null }
  
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
      if (!devtools.open) {
        devtools.open = true
        console.warn('Developer tools detected - monitoring for security')
      }
    } else {
      devtools.open = false
    }
  }, 1000)

  // Monitor for suspicious DOM mutations
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element
            // Check for suspicious script tags
            if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-approved')) {
              console.warn('Unapproved script element detected:', element)
            }
            // Check for suspicious iframes
            if (element.tagName === 'IFRAME' && !element.hasAttribute('data-approved')) {
              console.warn('Unapproved iframe detected:', element)
            }
          }
        })
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return () => observer.disconnect()
}
