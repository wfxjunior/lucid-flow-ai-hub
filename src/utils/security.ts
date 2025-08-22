
// Enhanced security utility functions

const isDevelopment = process.env.NODE_ENV === 'development'

// Secure logging with PII protection
export const securityEvent = (event: string, metadata?: Record<string, any>) => {
  const sanitizedMetadata = sanitizeLogData(metadata || {})
  
  if (isDevelopment) {
    console.log(`[SECURITY] ${event}`, sanitizedMetadata)
  }
  
  // In production, this would send to your logging service
  // For now, we'll store in sessionStorage for debugging
  try {
    const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]')
    logs.push({
      timestamp: new Date().toISOString(),
      event,
      metadata: sanitizedMetadata,
      userAgent: navigator.userAgent,
      url: window.location.href
    })
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100)
    }
    
    sessionStorage.setItem('security_logs', JSON.stringify(logs))
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}

export const secureError = (message: string, metadata?: Record<string, any>) => {
  const sanitizedMetadata = sanitizeLogData(metadata || {})
  
  console.error(`[SECURITY ERROR] ${message}`, sanitizedMetadata)
  
  // Log as security event as well
  securityEvent(`ERROR: ${message}`, sanitizedMetadata)
}

export const secureLog = (message: string, data?: any) => {
  if (isDevelopment) {
    console.log(`[SECURE LOG] ${message}`, data)
  }
  securityEvent(`LOG: ${message}`, data)
}

// Sanitize log data to prevent PII leakage
const sanitizeLogData = (data: Record<string, any>): Record<string, any> => {
  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'email', 'phone', 'ssn', 'creditcard']
  const sanitized: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()
    
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'string' && value.length > 100) {
      sanitized[key] = value.substring(0, 100) + '...[TRUNCATED]'
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
}

// Enhanced email validation
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.toLowerCase().trim())
}

// Phone validation
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false
  
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone.trim())
}

// URL validation
export const validateUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// Generate secure random string
export const generateSecureToken = (length = 32): string => {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

// Performance monitoring utility
export const performanceMonitor = {
  mark: (name: string) => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name)
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.measure(name, startMark, endMark)
        const entries = performance.getEntriesByName(name)
        if (entries.length > 0) {
          const duration = entries[entries.length - 1].duration
          secureLog(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` })
          return duration
        }
      } catch (error) {
        secureError('Performance measurement failed', { name, error })
      }
    }
    return 0
  },
  
  clear: () => {
    if (typeof performance !== 'undefined' && performance.clearMarks) {
      performance.clearMarks()
      performance.clearMeasures()
    }
  }
}

// Content Security Policy helper
export const getSecurityHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), location=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  }
}
