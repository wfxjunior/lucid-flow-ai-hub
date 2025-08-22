
import { useState, useCallback } from 'react'
import { SecurityValidation } from '@/utils/securityValidation'
import { securityEvent, secureError } from '@/utils/security'
import { useAuthState } from './useAuthState'

export function useSecureOperations() {
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuthState()

  // Secure operation wrapper with comprehensive validation
  const executeSecureOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName: string,
    options: {
      requireAuth?: boolean
      rateLimit?: { maxRequests: number; windowMinutes: number }
      validateSession?: boolean
    } = {}
  ): Promise<T> => {
    const { requireAuth = true, rateLimit, validateSession = true } = options

    try {
      setIsProcessing(true)

      // Authentication check
      if (requireAuth && !user) {
        throw new Error('Authentication required')
      }

      // Session validation
      if (validateSession && user) {
        const isValidSession = await SecurityValidation.validateSessionIntegrity()
        if (!isValidSession) {
          throw new Error('Invalid or expired session')
        }
      }

      // Rate limiting
      if (rateLimit) {
        const isAllowed = await SecurityValidation.checkOperationRateLimit(
          operationName,
          rateLimit.maxRequests,
          rateLimit.windowMinutes
        )
        if (!isAllowed) {
          throw new Error('Rate limit exceeded. Please try again later.')
        }
      }

      // Log operation start
      securityEvent(`${operationName} started`, { userId: user?.id })

      // Execute the operation
      const result = await operation()

      // Log successful completion
      securityEvent(`${operationName} completed successfully`, { userId: user?.id })

      return result
    } catch (error) {
      // Log security-relevant errors
      secureError(`${operationName} failed`, {
        userId: user?.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    } finally {
      setIsProcessing(false)
    }
  }, [user])

  // Secure file upload operation
  const secureFileUpload = useCallback(async (
    file: File,
    uploadFunction: (file: File) => Promise<string>,
    options: {
      maxSize?: number
      allowedTypes?: string[]
    } = {}
  ): Promise<string> => {
    return executeSecureOperation(
      async () => {
        // Validate file
        const validation = SecurityValidation.validateFileUpload(file, options)
        if (!validation.isValid) {
          throw new Error(`File validation failed: ${validation.errors.join(', ')}`)
        }

        // Execute upload
        const result = await uploadFunction(file)
        
        securityEvent('File uploaded successfully', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          userId: user?.id
        })

        return result
      },
      'file_upload',
      {
        rateLimit: { maxRequests: 10, windowMinutes: 60 }
      }
    )
  }, [executeSecureOperation, user?.id])

  return {
    executeSecureOperation,
    secureFileUpload,
    isProcessing
  }
}
