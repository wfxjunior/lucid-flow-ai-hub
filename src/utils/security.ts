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
