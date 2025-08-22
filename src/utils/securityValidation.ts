
import { supabase } from '@/integrations/supabase/client'
import { securityEvent, secureError } from './security'

// Enhanced security validation utilities
export class SecurityValidation {
  // Rate limiting for sensitive operations
  static async checkOperationRateLimit(operation: string, maxRequests = 5, windowMinutes = 15): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('security-middleware', {
        body: {
          action: operation,
          maxRequests,
          windowMinutes
        }
      })

      if (error) {
        securityEvent('Rate limit check failed', { operation, error: error.message })
        return false
      }

      return data?.allowed === true
    } catch (error) {
      secureError('Rate limit validation error', { operation, error: error instanceof Error ? error.message : 'Unknown error' })
      return false
    }
  }

  // Validate session integrity
  static async validateSessionIntegrity(): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('validate_session_security')
      
      if (error) {
        securityEvent('Session validation failed', { error: error.message })
        return false
      }

      return data === true
    } catch (error) {
      secureError('Session integrity check failed', { error: error instanceof Error ? error.message : 'Unknown error' })
      return false
    }
  }

  // Enhanced input sanitization
  static sanitizeUserInput(input: string, options: { 
    maxLength?: number
    allowHtml?: boolean
    stripScripts?: boolean 
  } = {}): string {
    if (!input || typeof input !== 'string') return ''

    const { maxLength = 1000, allowHtml = false, stripScripts = true } = options

    let sanitized = input.trim()
    
    // Length validation
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength)
    }

    // Remove scripts if not allowed
    if (stripScripts) {
      sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    }

    // Remove HTML if not allowed
    if (!allowHtml) {
      sanitized = sanitized.replace(/<[^>]*>/g, '')
    }

    // Log suspicious input patterns
    if (input.includes('<script') || input.includes('javascript:') || input.includes('onload=')) {
      securityEvent('Suspicious input detected', { 
        input: input.substring(0, 100), 
        sanitized: sanitized.substring(0, 100) 
      })
    }

    return sanitized
  }

  // Validate file uploads
  static validateFileUpload(file: File, options: {
    maxSize?: number
    allowedTypes?: string[]
    scanForMalware?: boolean
  } = {}): { isValid: boolean; errors: string[] } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [], scanForMalware = true } = options
    const errors: string[] = []

    // Size validation
    if (file.size > maxSize) {
      errors.push(`File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`)
    }

    // Type validation
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`)
    }

    // Basic malware scanning (filename patterns)
    const suspiciousPatterns = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.dll']
    const fileName = file.name.toLowerCase()
    
    if (suspiciousPatterns.some(pattern => fileName.includes(pattern))) {
      errors.push('File type appears to be potentially dangerous')
      securityEvent('Suspicious file upload attempt', { fileName, fileType: file.type, fileSize: file.size })
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Enhanced email validation with security checks
  static validateEmailSecurity(email: string): { isValid: boolean; errors: string[]; sanitizedEmail: string } {
    const errors: string[] = []
    
    if (!email || typeof email !== 'string') {
      errors.push('Email is required')
      return { isValid: false, errors, sanitizedEmail: '' }
    }

    const sanitizedEmail = email.toLowerCase().trim()
    
    // Basic format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(sanitizedEmail)) {
      errors.push('Invalid email format')
    }

    // Check for suspicious patterns
    const suspiciousPatterns = ['<script', 'javascript:', 'data:', 'vbscript:']
    if (suspiciousPatterns.some(pattern => sanitizedEmail.includes(pattern))) {
      errors.push('Email contains suspicious content')
      securityEvent('Suspicious email pattern detected', { email: sanitizedEmail })
    }

    // Length validation
    if (sanitizedEmail.length > 320) { // RFC 5321 limit
      errors.push('Email address too long')
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedEmail
    }
  }
}
