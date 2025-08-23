
import { securityEvent } from './security'

interface SecurityHeaders {
  [key: string]: string
}

interface DomainValidationResult {
  isValid: boolean
  warnings: string[]
}

export function applyEnhancedSecurityHeaders(): void {
  const headers: SecurityHeaders = {
    // Content Security Policy - Comprehensive protection
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://maps.googleapis.com https://www.google.com https://www.gstatic.com https://apis.google.com https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://unpkg.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://tvdromfazjzargvesruq.supabase.co https://maps.googleapis.com https://www.google.com wss://tvdromfazjzargvesruq.supabase.co",
      "media-src 'self' data: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "upgrade-insecure-requests"
    ].join('; '),

    // Security Headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(self)',
    
    // HSTS
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  }

  // Apply headers using meta tags for client-side enforcement
  Object.entries(headers).forEach(([name, value]) => {
    const existingMeta = document.querySelector(`meta[http-equiv="${name}"]`)
    if (existingMeta) {
      existingMeta.setAttribute('content', value)
    } else {
      const meta = document.createElement('meta')
      meta.httpEquiv = name
      meta.content = value
      document.head.appendChild(meta)
    }
  })

  // Log security headers application
  securityEvent('Enhanced security headers applied', {
    timestamp: new Date().toISOString(),
    headersCount: Object.keys(headers).length
  })
}

export function validateDomainSecurity(): DomainValidationResult {
  const warnings: string[] = []
  const currentDomain = window.location.hostname
  
  // Check for secure protocol
  if (window.location.protocol !== 'https:' && currentDomain !== 'localhost') {
    warnings.push('Site is not using HTTPS protocol')
  }
  
  // Check for suspicious domains
  const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf']
  if (suspiciousTlds.some(tld => currentDomain.endsWith(tld))) {
    warnings.push('Domain uses potentially suspicious TLD')
  }
  
  // Check for mixed content
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const httpScripts = scripts.filter(script => 
    script.src && script.src.startsWith('http:')
  )
  
  if (httpScripts.length > 0) {
    warnings.push(`${httpScripts.length} scripts loaded over HTTP`)
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  }
}

export function monitorClientSideThreats(): () => void {
  const threatPatterns = [
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /<script/i,
    /on\w+\s*=/i
  ]
  
  // Monitor for potential XSS attempts in URLs
  const checkUrl = () => {
    const url = window.location.href
    const params = new URLSearchParams(window.location.search)
    
    for (const [key, value] of params.entries()) {
      if (threatPatterns.some(pattern => pattern.test(value))) {
        securityEvent('Potential XSS attempt detected in URL', {
          parameter: key,
          value: value.substring(0, 100), // Limit logged value length
          url: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  // Monitor for suspicious DOM modifications
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const innerHTML = element.innerHTML || ''
            
            if (threatPatterns.some(pattern => pattern.test(innerHTML))) {
              securityEvent('Suspicious DOM modification detected', {
                tagName: element.tagName,
                className: element.className,
                timestamp: new Date().toISOString()
              })
            }
          }
        })
      }
    })
  })
  
  // Start monitoring
  checkUrl()
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  // Monitor URL changes for SPAs
  let currentUrl = window.location.href
  const urlCheckInterval = setInterval(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href
      checkUrl()
    }
  }, 1000)
  
  // Return cleanup function
  return () => {
    observer.disconnect()
    clearInterval(urlCheckInterval)
  }
}

// Enhanced input sanitization
export function sanitizeUserInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:text\/html/gi, '') // Remove data URLs
    .trim()
}

// Content validation for rich text editors
export function validateContentSecurity(content: string): {
  isValid: boolean
  sanitizedContent: string
  warnings: string[]
} {
  const warnings: string[] = []
  let sanitizedContent = content
  
  // Check for script tags
  if (/<script/i.test(content)) {
    warnings.push('Script tags detected and removed')
    sanitizedContent = sanitizedContent.replace(/<script[^>]*>.*?<\/script>/gi, '')
  }
  
  // Check for javascript: protocols
  if (/javascript:/i.test(content)) {
    warnings.push('JavaScript protocols detected and removed')
    sanitizedContent = sanitizedContent.replace(/javascript:[^"']*/gi, '')
  }
  
  // Check for event handlers
  if (/on\w+\s*=/i.test(content)) {
    warnings.push('Event handlers detected and removed')
    sanitizedContent = sanitizedContent.replace(/on\w+\s*=[^"']*["'][^"']*["']/gi, '')
  }
  
  return {
    isValid: warnings.length === 0,
    sanitizedContent,
    warnings
  }
}
