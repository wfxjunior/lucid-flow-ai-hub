
import { useState, useCallback } from 'react'
import { sanitizeInput, validateInput, logSecurityEvent } from '@/utils/securityCore'

interface UseSecureInputOptions {
  type?: 'email' | 'url' | 'phone' | 'text'
  maxLength?: number
  allowHtml?: boolean
  required?: boolean
}

export function useSecureInput(initialValue = '', options: UseSecureInputOptions = {}) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  const {
    type = 'text',
    maxLength = 10000,
    allowHtml = false,
    required = false
  } = options

  const handleChange = useCallback((inputValue: string) => {
    setIsDirty(true)
    
    // Sanitize input
    const sanitized = sanitizeInput(inputValue, {
      allowHtml,
      maxLength,
      stripScripts: true
    })

    // Log if input was modified during sanitization
    if (sanitized !== inputValue && inputValue.length > 0) {
      logSecurityEvent('Input sanitized', {
        originalLength: inputValue.length,
        sanitizedLength: sanitized.length,
        type
      })
    }

    setValue(sanitized)

    // Validate input
    if (required && !sanitized) {
      setError('This field is required')
    } else if (sanitized && !validateInput(sanitized, type)) {
      setError(`Invalid ${type} format`)
    } else {
      setError(null)
    }
  }, [type, maxLength, allowHtml, required])

  const reset = useCallback(() => {
    setValue(initialValue)
    setError(null)
    setIsDirty(false)
  }, [initialValue])

  const isValid = !error && (!required || value.length > 0)

  return {
    value,
    error,
    isDirty,
    isValid,
    handleChange,
    reset,
    sanitizedValue: value // Already sanitized
  }
}
