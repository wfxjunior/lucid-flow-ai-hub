
import { useState } from 'react'
import { 
  validateEmailSecurity, 
  validatePhoneSecurity, 
  validateTextSecurity, 
  validateUrlSecurity,
  ValidationResult 
} from '@/utils/enhancedInputValidation'
import { securityEvent } from '@/utils/security'

interface ValidationRule {
  type: 'text' | 'email' | 'url' | 'phone' | 'name'
  options?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    customValidator?: (value: string) => boolean
    allowHtml?: boolean
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
  const [warnings, setWarnings] = useState<Record<string, string[]>>({})
  const [hasErrors, setHasErrors] = useState(false)

  const validateField = (name: string, value: string): ValidationResult => {
    const rule = validationRules[name]
    if (!rule) {
      return { isValid: true, sanitized: value, errors: [], warnings: [] }
    }

    let result: ValidationResult

    // Enhanced validation based on field type
    switch (rule.type) {
      case 'email':
        result = validateEmailSecurity(value)
        break
      
      case 'phone':
        result = validatePhoneSecurity(value)
        break
      
      case 'url':
        result = validateUrlSecurity(value)
        break
      
      case 'name':
        result = validateTextSecurity(value, {
          required: rule.options?.required,
          minLength: rule.options?.minLength || 1,
          maxLength: rule.options?.maxLength || 100,
          allowHtml: false,
          fieldName: name
        })
        // Additional name-specific validation
        if (result.isValid && result.sanitized) {
          // Remove numbers and special characters for names
          const cleanName = result.sanitized.replace(/[0-9<>{}[\]\\\/]/g, '')
          if (cleanName !== result.sanitized) {
            result.warnings.push('Numbers and special characters removed from name')
            result.sanitized = cleanName
          }
        }
        break
      
      case 'text':
      default:
        result = validateTextSecurity(value, {
          required: rule.options?.required,
          minLength: rule.options?.minLength,
          maxLength: rule.options?.maxLength || 10000,
          allowHtml: rule.options?.allowHtml || false,
          fieldName: name
        })
        break
    }

    // Additional pattern validation if specified
    if (result.isValid && rule.options?.pattern && !rule.options.pattern.test(result.sanitized)) {
      result.errors.push(`${name} format is invalid`)
      result.isValid = false
    }

    // Custom validation if specified
    if (result.isValid && rule.options?.customValidator && !rule.options.customValidator(result.sanitized)) {
      result.errors.push(`${name} is invalid`)
      result.isValid = false
    }

    return result
  }

  const handleSubmit = async (data: Record<string, any>) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const newErrors: Record<string, string[]> = {}
    const newWarnings: Record<string, string[]> = {}
    const sanitizedData: Record<string, any> = {}

    try {
      // Validate and sanitize all fields
      let hasValidationErrors = false
      
      for (const [name, value] of Object.entries(data)) {
        const result = validateField(name, String(value || ''))
        
        if (result.errors.length > 0) {
          newErrors[name] = result.errors
          hasValidationErrors = true
        }
        
        if (result.warnings.length > 0) {
          newWarnings[name] = result.warnings
        }

        sanitizedData[name] = result.sanitized
      }

      // Set errors and warnings
      setErrors(newErrors)
      setWarnings(newWarnings)
      setHasErrors(hasValidationErrors)

      // Check for validation errors
      if (hasValidationErrors) {
        securityEvent('Form validation failed', {
          action: rateLimit?.action || 'form_submit',
          errorCount: Object.keys(newErrors).length,
          warningCount: Object.keys(newWarnings).length,
          timestamp: new Date().toISOString()
        })
        return
      }

      // Log successful validation
      securityEvent('Secure form submission', {
        action: rateLimit?.action || 'form_submit',
        fieldCount: Object.keys(sanitizedData).length,
        warningCount: Object.keys(newWarnings).length,
        timestamp: new Date().toISOString()
      })

      // Submit sanitized data
      await onSubmit(sanitizedData)
      
      // Clear errors and warnings on success
      setErrors({})
      setWarnings({})
      setHasErrors(false)

    } catch (error) {
      console.error('Secure form submission error:', error)
      setErrors({
        _form: [error instanceof Error ? error.message : 'Submission failed']
      })
      setHasErrors(true)
      
      securityEvent('Form submission failed', {
        action: rateLimit?.action || 'form_submit',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldErrors = (fieldName: string): string[] => {
    return errors[fieldName] || []
  }

  const getFieldWarnings = (fieldName: string): string[] => {
    return warnings[fieldName] || []
  }

  const hasFieldErrors = (fieldName: string): boolean => {
    return (errors[fieldName] || []).length > 0
  }

  const hasFieldWarnings = (fieldName: string): boolean => {
    return (warnings[fieldName] || []).length > 0
  }

  return {
    handleSubmit,
    isSubmitting,
    errors,
    warnings,
    hasErrors,
    getFieldErrors,
    getFieldWarnings,
    hasFieldErrors,
    hasFieldWarnings,
    validateField
  }
}
