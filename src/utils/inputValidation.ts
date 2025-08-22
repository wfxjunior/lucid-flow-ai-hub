// Enhanced Input Validation and Sanitization utilities
import DOMPurify from 'dompurify'
import { securityEvent, secureError } from './security'

// Enhanced input length limits for security
const INPUT_LIMITS = {
  text: 1000,
  email: 254,
  phone: 20,
  url: 2048,
  password: 128,
  textarea: 5000,
  name: 100,
  title: 200,
  description: 2000
} as const

// Client-side rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export const checkClientRateLimit = (action: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now()
  const key = `${action}_${Math.floor(now / windowMs)}`
  const current = rateLimitStore.get(key) || { count: 0, resetTime: now + windowMs }
  
  if (now > current.resetTime) {
    rateLimitStore.delete(key)
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= maxRequests) {
    securityEvent('Client rate limit exceeded', { action, count: current.count })
    return false
  }
  
  current.count++
  rateLimitStore.set(key, current)
  return true
}

// Enhanced input sanitization with length limits
export const sanitizeInput = (input: string, type: keyof typeof INPUT_LIMITS = 'text'): string => {
  if (!input) return ''
  
  const limit = INPUT_LIMITS[type]
  let sanitized = input.trim()
  
  // Apply length limit
  if (sanitized.length > limit) {
    sanitized = sanitized.substring(0, limit)
    securityEvent('Input truncated due to length limit', { type, originalLength: input.length, limit })
  }
  
  // Enhanced sanitization
  sanitized = DOMPurify.sanitize(sanitized, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  })
  
  // Remove potentially dangerous patterns
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    
  return sanitized
}

// Enhanced email validation - export this function
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) return { isValid: false, error: 'Email is required' }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Email address is too long' }
  }
  
  return { isValid: true }
}

// Enhanced validation with security logging
export const validateInput = (
  value: string, 
  type: 'text' | 'email' | 'url' | 'phone' | 'password',
  options: { required?: boolean; minLength?: number; maxLength?: number } = {}
): { isValid: boolean; errors: string[]; sanitizedValue: string } => {
  const errors: string[] = []
  const sanitizedValue = sanitizeInput(value, type)
  
  // Required validation
  if (options.required && !sanitizedValue) {
    errors.push('This field is required')
  }
  
  // Length validation
  if (options.minLength && sanitizedValue.length < options.minLength) {
    errors.push(`Minimum length is ${options.minLength} characters`)
  }
  
  if (options.maxLength && sanitizedValue.length > options.maxLength) {
    errors.push(`Maximum length is ${options.maxLength} characters`)
  }
  
  // Type-specific validation
  switch (type) {
    case 'email':
      if (sanitizedValue) {
        const emailValidation = validateEmail(sanitizedValue)
        if (!emailValidation.isValid && emailValidation.error) {
          errors.push(emailValidation.error)
        }
      }
      break
      
    case 'url':
      try {
        if (sanitizedValue) {
          const url = new URL(sanitizedValue)
          if (!['http:', 'https:'].includes(url.protocol)) {
            errors.push('URL must use HTTP or HTTPS protocol')
          }
        }
      } catch {
        errors.push('Please enter a valid URL')
      }
      break
      
    case 'phone':
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
      if (sanitizedValue && !phoneRegex.test(sanitizedValue)) {
        errors.push('Please enter a valid phone number')
      }
      break
      
    case 'password':
      if (sanitizedValue.length < 8) {
        errors.push('Password must be at least 8 characters long')
      }
      if (!/(?=.*[a-z])/.test(sanitizedValue)) {
        errors.push('Password must contain at least one lowercase letter')
      }
      if (!/(?=.*[A-Z])/.test(sanitizedValue)) {
        errors.push('Password must contain at least one uppercase letter')
      }
      if (!/(?=.*\d)/.test(sanitizedValue)) {
        errors.push('Password must contain at least one number')
      }
      break
  }
  
  // Log validation failures for security monitoring
  if (errors.length > 0) {
    securityEvent('Input validation failed', { 
      type, 
      errorCount: errors.length,
      valueLength: value.length,
      sanitizedLength: sanitizedValue.length
    })
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue
  }
}

// Comprehensive form data validation
export const validateFormData = (
  formData: Record<string, any>,
  validationRules: Record<string, {
    type: 'text' | 'email' | 'url' | 'phone' | 'password' | 'number'
    options?: {
      required?: boolean
      minLength?: number
      maxLength?: number
      pattern?: RegExp
      customValidator?: (value: string) => boolean
    }
  }>
): {
  isValid: boolean
  sanitizedData: Record<string, any>
  results: Record<string, { isValid: boolean; errors: string[]; sanitizedValue: any }>
} => {
  const results: Record<string, { isValid: boolean; errors: string[]; sanitizedValue: any }> = {}
  const sanitizedData: Record<string, any> = {}
  let overallValid = true
  
  for (const [key, rule] of Object.entries(validationRules)) {
    const value = formData[key]
    
    if (rule.type === 'number') {
      const numValue = Number(value)
      const isValidNumber = !isNaN(numValue) && isFinite(numValue)
      results[key] = {
        isValid: isValidNumber,
        errors: isValidNumber ? [] : ['Please enter a valid number'],
        sanitizedValue: isValidNumber ? numValue : 0
      }
      sanitizedData[key] = results[key].sanitizedValue
    } else {
      const validation = validateInput(String(value || ''), rule.type, rule.options)
      
      // Custom validation
      if (validation.isValid && rule.options?.customValidator) {
        if (!rule.options.customValidator(validation.sanitizedValue)) {
          validation.isValid = false
          validation.errors.push('Invalid value')
        }
      }
      
      // Pattern validation
      if (validation.isValid && rule.options?.pattern) {
        if (!rule.options.pattern.test(validation.sanitizedValue)) {
          validation.isValid = false
          validation.errors.push('Invalid format')
        }
      }
      
      results[key] = validation
      sanitizedData[key] = validation.sanitizedValue
    }
    
    if (!results[key].isValid) {
      overallValid = false
    }
  }
  
  return {
    isValid: overallValid,
    sanitizedData,
    results
  }
}

// File upload validation
export const validateFileUpload = (file: File, options: {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  // Size validation
  if (options.maxSize && file.size > options.maxSize) {
    errors.push(`File size must be less than ${Math.round(options.maxSize / (1024 * 1024))}MB`)
  }
  
  // Type validation
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`)
  }
  
  // Extension validation
  if (options.allowedExtensions) {
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !options.allowedExtensions.includes(extension)) {
      errors.push(`File extension must be one of: ${options.allowedExtensions.join(', ')}`)
    }
  }
  
  // Log potentially malicious uploads
  if (errors.length > 0) {
    securityEvent('File upload validation failed', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      errors
    })
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
