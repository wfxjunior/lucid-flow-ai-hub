
import { useState } from 'react'
import { validateAndSanitizeInput } from '@/utils/enhancedXssProtection'
import { securityEvent } from '@/utils/security'

interface ValidationRule {
  type: 'text' | 'email' | 'url' | 'phone' | 'name'
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

    // Enhanced validation and sanitization
    const validation = validateAndSanitizeInput(value, rule.type)
    
    if (!validation.isValid) {
      fieldErrors.push(...validation.errors)
    }

    // Use sanitized value for further validation
    const sanitizedValue = validation.sanitized

    // Required validation
    if (rule.options?.required && !sanitizedValue.trim()) {
      fieldErrors.push(`${name} is required`)
      return fieldErrors
    }

    // Skip other validations if field is empty and not required
    if (!sanitizedValue.trim() && !rule.options?.required) {
      return fieldErrors
    }

    // Length validations
    if (rule.options?.minLength && sanitizedValue.length < rule.options.minLength) {
      fieldErrors.push(`${name} must be at least ${rule.options.minLength} characters`)
    }

    if (rule.options?.maxLength && sanitizedValue.length > rule.options.maxLength) {
      fieldErrors.push(`${name} must be no more than ${rule.options.maxLength} characters`)
    }

    // Pattern validation
    if (rule.options?.pattern && !rule.options.pattern.test(sanitizedValue)) {
      fieldErrors.push(`${name} format is invalid`)
    }

    // Custom validation
    if (rule.options?.customValidator && !rule.options.customValidator(sanitizedValue)) {
      fieldErrors.push(`${name} is invalid`)
    }

    return fieldErrors
  }

  const handleSubmit = async (data: Record<string, any>) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const newErrors: Record<string, string[]> = {}
    const sanitizedData: Record<string, any> = {}

    try {
      // Validate and sanitize all fields
      for (const [name, value] of Object.entries(data)) {
        const fieldErrors = validateField(name, String(value))
        if (fieldErrors.length > 0) {
          newErrors[name] = fieldErrors
        }

        // Get sanitized value
        const rule = validationRules[name]
        if (rule) {
          const validation = validateAndSanitizeInput(String(value), rule.type)
          sanitizedData[name] = validation.sanitized
        } else {
          sanitizedData[name] = value
        }
      }

      // Check for validation errors
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setHasErrors(true)
        return
      }

      // Log security event
      securityEvent('secure_form_submission', {
        action: rateLimit?.action || 'form_submit',
        timestamp: new Date().toISOString()
      })

      // Submit sanitized data
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
