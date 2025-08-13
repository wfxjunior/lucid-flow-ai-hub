import { sanitizeHtml, sanitizeTextForPdf } from './htmlSanitizer'

/**
 * Validation utility functions for user inputs
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitizedData?: any
}

/**
 * Validates and sanitizes text fields
 */
export function validateAndSanitizeText(text: string, fieldName: string, maxLength = 1000): ValidationResult {
  const errors: string[] = []
  
  if (!text || text.trim().length === 0) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }
  
  if (text.length > maxLength) {
    errors.push(`${fieldName} must be less than ${maxLength} characters`)
  }
  
  const sanitizedText = sanitizeHtml(text)
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: sanitizedText
  }
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  
  if (!email || email.trim().length === 0) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: email.trim().toLowerCase()
  }
}

/**
 * Validates numeric fields
 */
export function validateNumeric(value: any, fieldName: string, min?: number, max?: number): ValidationResult {
  const errors: string[] = []
  
  const numValue = parseFloat(value)
  
  if (isNaN(numValue)) {
    errors.push(`${fieldName} must be a valid number`)
    return { isValid: false, errors }
  }
  
  if (min !== undefined && numValue < min) {
    errors.push(`${fieldName} must be at least ${min}`)
  }
  
  if (max !== undefined && numValue > max) {
    errors.push(`${fieldName} must be at most ${max}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: numValue
  }
}

/**
 * Validates and sanitizes business data objects
 */
export function validateBusinessData(data: any, type: 'client' | 'contract' | 'workorder' | 'estimate'): ValidationResult {
  const errors: string[] = []
  const sanitizedData: any = {}
  
  // Common validations
  if (data.title) {
    const titleValidation = validateAndSanitizeText(data.title, 'Title', 200)
    if (!titleValidation.isValid) {
      errors.push(...titleValidation.errors)
    } else {
      sanitizedData.title = titleValidation.sanitizedData
    }
  }
  
  if (data.description) {
    const descValidation = validateAndSanitizeText(data.description, 'Description', 5000)
    if (!descValidation.isValid) {
      errors.push(...descValidation.errors)
    } else {
      sanitizedData.description = descValidation.sanitizedData
    }
  }
  
  // Type-specific validations
  switch (type) {
    case 'client':
      if (data.name) {
        const nameValidation = validateAndSanitizeText(data.name, 'Name', 100)
        if (!nameValidation.isValid) {
          errors.push(...nameValidation.errors)
        } else {
          sanitizedData.name = nameValidation.sanitizedData
        }
      }
      
      if (data.email) {
        const emailValidation = validateEmail(data.email)
        if (!emailValidation.isValid) {
          errors.push(...emailValidation.errors)
        } else {
          sanitizedData.email = emailValidation.sanitizedData
        }
      }
      break
      
    case 'estimate':
    case 'workorder':
      if (data.amount) {
        const amountValidation = validateNumeric(data.amount, 'Amount', 0, 1000000)
        if (!amountValidation.isValid) {
          errors.push(...amountValidation.errors)
        } else {
          sanitizedData.amount = amountValidation.sanitizedData
        }
      }
      break
  }
  
  // Copy other safe fields
  const safeFields = ['status', 'priority', 'client_id', 'estimate_id', 'project_id']
  safeFields.forEach(field => {
    if (data[field] !== undefined) {
      sanitizedData[field] = data[field]
    }
  })
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  }
}

/**
 * Rate limiting check for client-side operations
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkClientRateLimit(action: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const key = `${action}_${Math.floor(now / windowMs)}`
  
  const current = rateLimitStore.get(key) || { count: 0, resetTime: now + windowMs }
  
  if (now > current.resetTime) {
    rateLimitStore.delete(key)
    return true
  }
  
  if (current.count >= maxRequests) {
    return false
  }
  
  current.count++
  rateLimitStore.set(key, current)
  return true
}