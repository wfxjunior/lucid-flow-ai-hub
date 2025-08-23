
import { useState } from 'react'
import { sanitizeInput } from '@/utils/inputValidation'
import { securityEvent } from '@/utils/security'

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

interface UseSecureFormProps {
  validationRules: Record<string, ValidationRule>
  onSubmit: (data: Record<string, any>) => Promise<void>
  rateLimit?: {
    action: string
    maxRequests?: number
    windowMs?: number
  }
}

export function useSecureForm({
  validationRules,
  onSubmit,
  rateLimit
}: UseSecureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [hasErrors, setHasErrors] = useState(false)

  const validateField = (name: string, value: string): string[] => {
    const rule = validationRules[name]
    if (!rule) return []

    const fieldErrors: string[] = []

    // Required validation
    if (rule.options?.required && !value.trim()) {
      fieldErrors.push(`${name} is required`)
      return fieldErrors
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rule.options?.required) {
      return fieldErrors
    }

    // Length validations
    if (rule.options?.minLength && value.length < rule.options.minLength) {
      fieldErrors.push(`${name} must be at least ${rule.options.minLength} characters`)
    }

    if (rule.options?.maxLength && value.length > rule.options.maxLength) {
      fieldErrors.push(`${name} must be no more than ${rule.options.maxLength} characters`)
    }

    // Type-specific validations
    switch (rule.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          fieldErrors.push(`${name} must be a valid email address`)
        }
        break
      case 'url':
        try {
          new URL(value)
        } catch {
          fieldErrors.push(`${name} must be a valid URL`)
        }
        break
      case 'phone':
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
        if (!phoneRegex.test(value)) {
          fieldErrors.push(`${name} must be a valid phone number`)
        }
        break
      case 'number':
        if (isNaN(Number(value))) {
          fieldErrors.push(`${name} must be a valid number`)
        }
        break
    }

    // Pattern validation
    if (rule.options?.pattern && !rule.options.pattern.test(value)) {
      fieldErrors.push(`${name} format is invalid`)
    }

    // Custom validation
    if (rule.options?.customValidator && !rule.options.customValidator(value)) {
      fieldErrors.push(`${name} is invalid`)
    }

    return fieldErrors
  }

  const handleSubmit = async (data: Record<string, any>) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const newErrors: Record<string, string[]> = {}

    try {
      // Validate all fields
      for (const [name, value] of Object.entries(data)) {
        const fieldErrors = validateField(name, String(value))
        if (fieldErrors.length > 0) {
          newErrors[name] = fieldErrors
        }
      }

      // Check for validation errors
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setHasErrors(true)
        return
      }

      // Sanitize data
      const sanitizedData: Record<string, any> = {}
      for (const [name, value] of Object.entries(data)) {
        sanitizedData[name] = typeof value === 'string' ? sanitizeInput(value) : value
      }

      // Log security event
      securityEvent('form_submission', {
        action: rateLimit?.action || 'form_submit',
        timestamp: new Date().toISOString()
      })

      // Submit data
      await onSubmit(sanitizedData)
      
      // Clear errors on success
      setErrors({})
      setHasErrors(false)

    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        _form: [error instanceof Error ? error.message : 'Submission failed']
      })
      setHasErrors(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    errors,
    hasErrors
  }
}
