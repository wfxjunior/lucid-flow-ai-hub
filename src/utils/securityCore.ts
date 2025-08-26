// Core Security Utilities - Unified and Enhanced
import DOMPurify from 'dompurify'

// Enhanced security configuration
export const SECURITY_CONFIG = {
  CSP_DIRECTIVES: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'", 
      "'unsafe-inline'", // Required for React inline handlers
      "'unsafe-eval'", // Required for some bundlers
      'https://js.stripe.com',
      'https://checkout.stripe.com'
    ],
    'style-src': [
      "'self'", 
      "'unsafe-inline'", // Required for styled-components and Tailwind
      'https://fonts.googleapis.com'
    ],
    'img-src': [
      "'self'", 
      'data:', 
      'https:', 
      'blob:'
    ],
    'font-src': [
      "'self'", 
      'https://fonts.gstatic.com'
    ],
    'connect-src': [
      "'self'", 
      'https://tvdromfazjzargvesruq.supabase.co',
      'wss://tvdromfazjzargvesruq.supabase.co',
      'https://api.stripe.com'
    ],
    'frame-src': [
      "'self'",
      'https://js.stripe.com',
      'https://checkout.stripe.com'
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'", 'https://checkout.stripe.com'],
    'upgrade-insecure-requests': []
  },
  
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self)'
  },

  SANITIZATION: {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'a'
    ],
    ALLOWED_ATTRIBUTES: ['href', 'target', 'rel', 'class', 'id'],
    MAX_INPUT_LENGTH: 10000
  }
}

// Unified input sanitization function
export const sanitizeInput = (input: string, options: {
  allowHtml?: boolean
  maxLength?: number
  stripScripts?: boolean
} = {}): string => {
  if (typeof input !== 'string') return ''
  
  const {
    allowHtml = false,
    maxLength = SECURITY_CONFIG.SANITIZATION.MAX_INPUT_LENGTH,
    stripScripts = true
  } = options

  let sanitized = input.trim()
  
  // Length validation
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  if (allowHtml) {
    // Use DOMPurify for HTML sanitization
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: SECURITY_CONFIG.SANITIZATION.ALLOWED_TAGS,
      ALLOWED_ATTR: SECURITY_CONFIG.SANITIZATION.ALLOWED_ATTRIBUTES,
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form'],
      FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'style']
    })
  } else {
    // Strip all HTML
    sanitized = sanitized.replace(/<[^>]*>/g, '')
  }

  if (stripScripts) {
    // Remove dangerous patterns
    const dangerousPatterns = [
      /javascript:/gi,
      /vbscript:/gi,
      /data:text\/html/gi,
      /on\w+\s*=/gi
    ]
    
    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '')
    })
  }

  return sanitized
}

// Enhanced validation functions
export const validateInput = (input: string, type: 'email' | 'url' | 'phone' | 'text' = 'text'): boolean => {
  if (!input || typeof input !== 'string') return false
  
  const sanitized = sanitizeInput(input)
  
  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(sanitized)
    case 'url':
      try {
        const url = new URL(sanitized)
        return ['http:', 'https:'].includes(url.protocol)
      } catch {
        return false
      }
    case 'phone':
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      return phoneRegex.test(sanitized.replace(/[\s\-\(\)]/g, ''))
    case 'text':
    default:
      return sanitized.length > 0 && sanitized.length <= SECURITY_CONFIG.SANITIZATION.MAX_INPUT_LENGTH
  }
}

// Security event logging
export const logSecurityEvent = (event: string, metadata?: Record<string, any>) => {
  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...metadata
  }
  
  console.log('[SECURITY EVENT]', eventData)
  
  // Store in localStorage for debugging
  try {
    const events = JSON.parse(localStorage.getItem('security_events') || '[]')
    events.push(eventData)
    
    // Keep only last 50 events
    if (events.length > 50) {
      events.splice(0, events.length - 50)
    }
    
    localStorage.setItem('security_events', JSON.stringify(events))
  } catch (error) {
    console.error('Failed to store security event:', error)
  }
}

// Apply enhanced security headers
export const applySecurityHeaders = () => {
  // Create CSP header value
  const cspValue = Object.entries(SECURITY_CONFIG.CSP_DIRECTIVES)
    .map(([directive, sources]) => 
      sources.length > 0 
        ? `${directive} ${sources.join(' ')}`
        : directive
    )
    .join('; ')

  // Apply CSP via meta tag
  let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
  if (!cspMeta) {
    cspMeta = document.createElement('meta')
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy')
    document.head.appendChild(cspMeta)
  }
  cspMeta.setAttribute('content', cspValue)

  // Apply other security headers
  Object.entries(SECURITY_CONFIG.SECURITY_HEADERS).forEach(([name, value]) => {
    let meta = document.querySelector(`meta[http-equiv="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('http-equiv', name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', value)
  })

  logSecurityEvent('Enhanced security headers applied', {
    cspDirectives: Object.keys(SECURITY_CONFIG.CSP_DIRECTIVES).length,
    securityHeaders: Object.keys(SECURITY_CONFIG.SECURITY_HEADERS).length
  })
}
