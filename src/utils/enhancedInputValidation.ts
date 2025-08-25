
// Enhanced Input Validation (Security Fix #5)
import { sanitizeInput, validateInput } from './security'

export interface ValidationRule {
  type: 'email' | 'url' | 'phone' | 'text' | 'number' | 'html'
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  allowedTags?: string[]
  customValidator?: (value: string) => { isValid: boolean; error?: string }
}

export interface ValidationResult {
  isValid: boolean
  sanitizedValue: string
  errors: string[]
}

export const enhancedValidateInput = (
  value: string, 
  rules: ValidationRule
): ValidationResult => {
  const errors: string[] = []
  let sanitizedValue = value

  // Required check
  if (rules.required && (!value || value.trim().length === 0)) {
    errors.push('This field is required')
    return { isValid: false, sanitizedValue: '', errors }
  }

  // Skip further validation if empty and not required
  if (!value || value.trim().length === 0) {
    return { isValid: true, sanitizedValue: '', errors }
  }

  // Basic sanitization first
  sanitizedValue = sanitizeInput(value)

  // Length validation
  if (rules.minLength && sanitizedValue.length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength} characters`)
  }

  if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
    sanitizedValue = sanitizedValue.substring(0, rules.maxLength)
    errors.push(`Maximum length is ${rules.maxLength} characters`)
  }

  // Type-specific validation
  switch (rules.type) {
    case 'email':
      if (!validateInput(sanitizedValue, 'email')) {
        errors.push('Invalid email format')
      }
      break

    case 'url':
      if (!validateInput(sanitizedValue, 'url')) {
        errors.push('Invalid URL format')
      }
      break

    case 'phone':
      const phonePattern = /^[\+]?[1-9][\d]{0,15}$/
      if (!phonePattern.test(sanitizedValue.replace(/[\s\-\(\)]/g, ''))) {
        errors.push('Invalid phone number format')
      }
      break

    case 'number':
      if (isNaN(Number(sanitizedValue))) {
        errors.push('Must be a valid number')
      }
      break

    case 'html':
      // Enhanced HTML sanitization
      sanitizedValue = sanitizeHtmlContent(sanitizedValue, rules.allowedTags)
      break

    case 'text':
    default:
      // Additional text sanitization
      sanitizedValue = sanitizedValue.replace(/[<>]/g, '')
      break
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
    errors.push('Invalid format')
  }

  // Custom validation
  if (rules.customValidator) {
    const customResult = rules.customValidator(sanitizedValue)
    if (!customResult.isValid && customResult.error) {
      errors.push(customResult.error)
    }
  }

  // Security checks for suspicious patterns
  const suspiciousPatterns = [
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /<script/gi,
    /on\w+=/gi
  ]

  if (suspiciousPatterns.some(pattern => pattern.test(value))) {
    errors.push('Potentially unsafe content detected')
    // Further sanitize
    sanitizedValue = sanitizedValue.replace(/javascript:|data:|vbscript:/gi, '')
  }

  return {
    isValid: errors.length === 0,
    sanitizedValue,
    errors
  }
}

const sanitizeHtmlContent = (html: string, allowedTags: string[] = []): string => {
  const defaultAllowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']
  const allowed = allowedTags.length > 0 ? allowedTags : defaultAllowedTags
  
  // Remove all tags except allowed ones
  const tagPattern = new RegExp(`<(?!/?(?:${allowed.join('|')})\\b)[^>]*>`, 'gi')
  let sanitized = html.replace(tagPattern, '')
  
  // Remove all attributes from allowed tags (for security)
  allowed.forEach(tag => {
    const attrPattern = new RegExp(`<(${tag})\\s+[^>]*>`, 'gi')
    sanitized = sanitized.replace(attrPattern, `<$1>`)
  })
  
  return sanitized
}

// Batch validation for forms
export const validateFormData = (
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): { isValid: boolean; sanitizedData: Record<string, string>; errors: Record<string, string[]> } => {
  const sanitizedData: Record<string, string> = {}
  const errors: Record<string, string[]> = {}
  let isValid = true

  Object.entries(formData).forEach(([key, value]) => {
    if (validationRules[key]) {
      const result = enhancedValidateInput(value, validationRules[key])
      sanitizedData[key] = result.sanitizedValue
      
      if (!result.isValid) {
        errors[key] = result.errors
        isValid = false
      }
    } else {
      sanitizedData[key] = sanitizeInput(value)
    }
  })

  return { isValid, sanitizedData, errors }
}
