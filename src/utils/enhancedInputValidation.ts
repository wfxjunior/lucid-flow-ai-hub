
import { securityEvent } from './security'

export interface ValidationResult {
  isValid: boolean
  sanitized: string
  errors: string[]
  warnings: string[]
}

// Enhanced email validation with security checks
export const validateEmailSecurity = (email: string): ValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []
  
  if (!email || typeof email !== 'string') {
    errors.push('Email is required')
    return { isValid: false, sanitized: '', errors, warnings }
  }

  const sanitized = email.toLowerCase().trim()
  
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(sanitized)) {
    errors.push('Invalid email format')
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /on\w+\s*=/i
  ]
  
  if (suspiciousPatterns.some(pattern => pattern.test(sanitized))) {
    errors.push('Email contains suspicious content')
    warnings.push('Potential XSS attempt detected')
    securityEvent('Suspicious email pattern detected', { email: sanitized })
  }

  // Length validation (RFC 5321 limit)
  if (sanitized.length > 320) {
    errors.push('Email address too long')
  }

  // Check for multiple consecutive dots or dashes
  if (sanitized.includes('..') || sanitized.includes('--')) {
    warnings.push('Email contains unusual patterns')
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
    warnings
  }
}

// Enhanced phone validation
export const validatePhoneSecurity = (phone: string): ValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []
  
  if (!phone || typeof phone !== 'string') {
    return { isValid: true, sanitized: '', errors, warnings } // Phone is optional
  }

  // Remove all non-digit characters except + ( ) - space
  let sanitized = phone.replace(/[^\d\s\-\(\)\+]/g, '')
  
  // Basic format validation
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
  if (!phoneRegex.test(sanitized)) {
    errors.push('Invalid phone number format')
  }

  // Check for suspicious patterns
  if (phone.includes('<') || phone.includes('>') || phone.includes('script')) {
    errors.push('Phone contains invalid characters')
    warnings.push('Potential XSS attempt in phone field')
    securityEvent('Suspicious phone pattern detected', { phone })
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
    warnings
  }
}

// Enhanced text validation
export const validateTextSecurity = (
  text: string,
  options: {
    required?: boolean
    minLength?: number
    maxLength?: number
    allowHtml?: boolean
    fieldName?: string
  } = {}
): ValidationResult => {
  const { required = false, minLength = 0, maxLength = 10000, allowHtml = false, fieldName = 'Text' } = options
  const errors: string[] = []
  const warnings: string[] = []
  
  if (!text || typeof text !== 'string') {
    if (required) {
      errors.push(`${fieldName} is required`)
    }
    return { isValid: !required, sanitized: '', errors, warnings }
  }

  let sanitized = text.trim()

  // Length validation
  if (required && sanitized.length === 0) {
    errors.push(`${fieldName} is required`)
  }

  if (sanitized.length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters`)
  }

  if (sanitized.length > maxLength) {
    errors.push(`${fieldName} must be no more than ${maxLength} characters`)
    sanitized = sanitized.substring(0, maxLength)
    warnings.push(`${fieldName} was truncated to ${maxLength} characters`)
  }

  // XSS protection
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /vbscript:/gi,
    /data:text\/html/gi
  ]

  let hasXssAttempt = false
  xssPatterns.forEach(pattern => {
    if (pattern.test(sanitized)) {
      hasXssAttempt = true
      sanitized = sanitized.replace(pattern, '')
      warnings.push('Potentially dangerous content was removed')
    }
  })

  if (hasXssAttempt) {
    securityEvent('XSS attempt detected in text field', {
      fieldName,
      originalLength: text.length,
      sanitizedLength: sanitized.length
    })
  }

  // HTML validation
  if (!allowHtml && (sanitized.includes('<') || sanitized.includes('>'))) {
    sanitized = sanitized.replace(/<[^>]*>/g, '')
    warnings.push('HTML tags were removed')
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
    warnings
  }
}

// Enhanced URL validation
export const validateUrlSecurity = (url: string): ValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []
  
  if (!url || typeof url !== 'string') {
    return { isValid: true, sanitized: '', errors, warnings } // URL is optional
  }

  const sanitized = url.trim()

  try {
    const urlObj = new URL(sanitized)
    
    // Only allow safe protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
    if (!allowedProtocols.includes(urlObj.protocol)) {
      errors.push(`Protocol ${urlObj.protocol} is not allowed`)
      securityEvent('Dangerous URL protocol blocked', { 
        url: sanitized, 
        protocol: urlObj.protocol 
      })
    }

    // Check for suspicious patterns in URL
    if (sanitized.includes('javascript:') || sanitized.includes('data:')) {
      errors.push('URL contains dangerous content')
      warnings.push('Potential XSS attempt detected')
    }

    return {
      isValid: errors.length === 0,
      sanitized: urlObj.toString(),
      errors,
      warnings
    }
  } catch {
    errors.push('Invalid URL format')
    return {
      isValid: false,
      sanitized: '',
      errors,
      warnings
    }
  }
}

// File upload validation
export const validateFileUploadSecurity = (
  file: File,
  options: {
    maxSize?: number
    allowedTypes?: string[]
    allowedExtensions?: string[]
  } = {}
): ValidationResult => {
  const { maxSize = 10 * 1024 * 1024, allowedTypes = [], allowedExtensions = [] } = options
  const errors: string[] = []
  const warnings: string[] = []

  // Size validation
  if (file.size > maxSize) {
    errors.push(`File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`)
  }

  // Type validation
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`)
  }

  // Extension validation
  const fileName = file.name.toLowerCase()
  const fileExtension = fileName.split('.').pop() || ''
  
  if (allowedExtensions.length > 0 && !allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension .${fileExtension} is not allowed`)
  }

  // Dangerous file patterns
  const dangerousPatterns = [
    '.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.dll', '.vbs', '.js', '.jar'
  ]
  
  if (dangerousPatterns.some(pattern => fileName.includes(pattern))) {
    errors.push('File type appears to be potentially dangerous')
    warnings.push('Executable file type detected')
    securityEvent('Suspicious file upload attempt', { 
      fileName: file.name, 
      fileType: file.type, 
      fileSize: file.size 
    })
  }

  return {
    isValid: errors.length === 0,
    sanitized: file.name,
    errors,
    warnings
  }
}
