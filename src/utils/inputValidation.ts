
// Simple input validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
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
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return null
}
