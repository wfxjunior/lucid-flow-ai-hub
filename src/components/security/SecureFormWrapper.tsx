
import React from 'react'
import { useSecureForm } from '@/hooks/useSecureForm'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface SecureFormWrapperProps {
  children: React.ReactNode
  validationRules: Record<string, {
    type: 'text' | 'email' | 'url' | 'phone' | 'name'
    options?: {
      required?: boolean
      minLength?: number
      maxLength?: number
      pattern?: RegExp
      customValidator?: (value: string) => boolean
    }
  }>
  onSubmit: (sanitizedData: Record<string, any>) => Promise<void>
  rateLimit?: {
    action: string
    maxRequests?: number
    windowMs?: number
  }
  className?: string
}

export function SecureFormWrapper({
  children,
  validationRules,
  onSubmit,
  rateLimit,
  className
}: SecureFormWrapperProps) {
  const {
    handleSubmit,
    isSubmitting,
    hasErrors,
    errors
  } = useSecureForm({
    validationRules,
    onSubmit,
    rateLimit
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    handleSubmit(data)
  }

  return (
    <form onSubmit={handleFormSubmit} className={className}>
      {errors._form && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {errors._form.join(', ')}
          </AlertDescription>
        </Alert>
      )}
      
      {children}
      
      {hasErrors && Object.keys(errors).length > 1 && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please correct the errors above before submitting.
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}
