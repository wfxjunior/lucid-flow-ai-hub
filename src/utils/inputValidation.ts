
// Legacy file - Import from securityCore instead
export { sanitizeInput, validateInput } from './securityCore'

// Keep existing function for backward compatibility
export const sanitizeText = (text: string): string => {
  return sanitizeInput(text, { allowHtml: false, stripScripts: true })
}

// Add missing validation functions for backward compatibility
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!password || typeof password !== 'string') {
    errors.push('Password is required')
    return { isValid: false, errors }
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return null
}
