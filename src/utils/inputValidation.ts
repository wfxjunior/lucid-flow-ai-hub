
import { sanitizeInput, validatePhone, validateUrl } from './security'

// Export validateEmail function that was missing
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.toLowerCase())
}

// Enhanced input validation with security focus
interface ValidationRule {
  type: 'text' | 'email' | 'url' | 'phone' | 'number'
  options?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    customValidator?: (value: string) => boolean
  }
}

interface ValidationResult {
  isValid: boolean
  sanitizedValue: any
  errors: string[]
}

// Client-side rate limiting for security
const rateLimits = new Map<string, { count: number; timestamp: number }>()

export const checkClientRateLimit = (action: string, maxRequests = 5, windowMs = 300000): boolean => {
  const now = Date.now()
  const key = `${action}_${navigator.userAgent.slice(0, 50)}` // Use partial UA as identifier
  
  const current = rateLimits.get(key)
  
  if (!current || now - current.timestamp > windowMs) {
    rateLimits.set(key, { count: 1, timestamp: now })
    return true
  }
  
  if (current.count >= maxRequests) {
    return false
  }
  
  current.count++
  return true
}

export const validateFormData = (
  data: Record<string, any>, 
  rules: Record<string, ValidationRule>
): { isValid: boolean; sanitizedData: Record<string, any>; results: Record<string, ValidationResult> } => {
  const results: Record<string, ValidationResult> = {}
  const sanitizedData: Record<string, any> = {}
  let overallValid = true

  for (const [fieldName, rule] of Object.entries(rules)) {
    const value = data[fieldName]
    const result = validateField(value, rule)
    
    results[fieldName] = result
    sanitizedData[fieldName] = result.sanitizedValue
    
    if (!result.isValid) {
      overallValid = false
    }
  }

  return { isValid: overallValid, sanitizedData, results }
}

const validateField = (value: any, rule: ValidationRule): ValidationResult => {
  const errors: string[] = []
  let sanitizedValue = value

  // Handle null/undefined values
  if (value == null || value === '') {
    if (rule.options?.required) {
      errors.push('This field is required')
    }
    return { isValid: errors.length === 0, sanitizedValue: '', errors }
  }

  // Convert to string and sanitize
  const stringValue = String(value)
  sanitizedValue = sanitizeInput(stringValue)

  // Length validation
  if (rule.options?.minLength && sanitizedValue.length < rule.options.minLength) {
    errors.push(`Must be at least ${rule.options.minLength} characters`)
  }
  
  if (rule.options?.maxLength && sanitizedValue.length > rule.options.maxLength) {
    errors.push(`Must be no more than ${rule.options.maxLength} characters`)
    sanitizedValue = sanitizedValue.slice(0, rule.options.maxLength)
  }

  // Type-specific validation
  switch (rule.type) {
    case 'email':
      if (!validateEmail(sanitizedValue)) {
        errors.push('Please enter a valid email address')
      }
      break
      
    case 'phone':
      if (!validatePhone(sanitizedValue)) {
        errors.push('Please enter a valid phone number')
      }
      break
      
    case 'url':
      if (sanitizedValue && !validateUrl(sanitizedValue)) {
        errors.push('Please enter a valid URL')
      }
      break
      
    case 'number':
      const numValue = Number(sanitizedValue)
      if (isNaN(numValue)) {
        errors.push('Please enter a valid number')
      } else {
        sanitizedValue = numValue
      }
      break
  }

  // Pattern validation
  if (rule.options?.pattern && !rule.options.pattern.test(sanitizedValue)) {
    errors.push('Please enter a valid format')
  }

  // Custom validation
  if (rule.options?.customValidator && !rule.options.customValidator(sanitizedValue)) {
    errors.push('Please enter a valid value')
  }

  return {
    isValid: errors.length === 0,
    sanitizedValue,
    errors
  }
}

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export const setCSRFToken = (token: string) => {
  sessionStorage.setItem('csrf_token', token)
}

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token')
}

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken()
  return storedToken === token && token.length === 64
}
