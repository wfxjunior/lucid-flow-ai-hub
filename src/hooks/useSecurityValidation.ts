
import { useState, useCallback } from 'react'
import { validateInput, checkClientRateLimit } from '@/utils/inputValidation'
import { securityEvent } from '@/utils/security'

interface SecurityValidationOptions {
  rateLimit?: {
    action: string
    maxRequests?: number
    windowMs?: number
  }
  dataClassification?: 'public' | 'internal' | 'confidential' | 'restricted'
}

export function useSecurityValidation(options: SecurityValidationOptions = {}) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})
  const [isBlocked, setIsBlocked] = useState(false)

  const validateSecureInput = useCallback((
    name: string,
    value: string,
    type: 'text' | 'email' | 'url' | 'phone' | 'password',
    validationOptions?: { required?: boolean; minLength?: number; maxLength?: number }
  ) => {
    // Check rate limiting first
    if (options.rateLimit) {
      const { action, maxRequests = 10, windowMs = 60000 } = options.rateLimit
      if (!checkClientRateLimit(`${action}_validation`, maxRequests, windowMs)) {
        setIsBlocked(true)
        securityEvent('Validation rate limit exceeded', {
          action,
          field: name,
          timestamp: new Date().toISOString()
        })
        return { isValid: false, sanitizedValue: '', errors: ['Rate limit exceeded'] }
      }
    }

    // Perform validation
    const result = validateInput(value, type, validationOptions)
    
    // Update validation errors
    setValidationErrors(prev => ({
      ...prev,
      [name]: result.errors
    }))

    // Log suspicious validation failures
    if (!result.isValid && result.errors.length > 3) {
      securityEvent('Suspicious validation pattern', {
        field: name,
        errorCount: result.errors.length,
        dataClassification: options.dataClassification,
        timestamp: new Date().toISOString()
      })
    }

    return result
  }, [options])

  const clearValidationErrors = useCallback((fieldName?: string) => {
    if (fieldName) {
      setValidationErrors(prev => ({ ...prev, [fieldName]: [] }))
    } else {
      setValidationErrors({})
    }
  }, [])

  const hasErrors = Object.values(validationErrors).some(errors => errors.length > 0)

  return {
    validateSecureInput,
    validationErrors,
    clearValidationErrors,
    hasErrors,
    isBlocked
  }
}
