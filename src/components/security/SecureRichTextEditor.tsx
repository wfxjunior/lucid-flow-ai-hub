
import React, { useCallback, useMemo } from 'react'
import { validateAndSanitizeInput, validateRichTextContent } from '@/utils/enhancedXssProtection'
import { securityEvent } from '@/utils/security'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface SecureRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  maxLength?: number
}

export function SecureRichTextEditor({
  value,
  onChange,
  placeholder = "Enter your text...",
  className = "",
  maxLength = 10000
}: SecureRichTextEditorProps) {
  const [showSecurityWarning, setShowSecurityWarning] = React.useState(false)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    // Enhanced validation and sanitization
    const validation = validateRichTextContent(newValue)
    
    if (!validation.isValid || validation.warnings.length > 0) {
      setShowSecurityWarning(true)
      securityEvent('Potentially dangerous content blocked in rich text editor', {
        contentLength: newValue.length,
        sanitizedLength: validation.sanitizedContent.length,
        warnings: validation.warnings
      })
      
      // Use sanitized content instead
      onChange(validation.sanitizedContent)
      
      // Hide warning after 5 seconds
      setTimeout(() => setShowSecurityWarning(false), 5000)
    } else {
      setShowSecurityWarning(false)
      onChange(validation.sanitizedContent)
    }
  }, [onChange])

  // Sanitize current value for display
  const currentValidation = useMemo(() => {
    return validateRichTextContent(value)
  }, [value])

  return (
    <div className="space-y-2">
      {showSecurityWarning && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Potentially unsafe content was detected and removed for security reasons.
          </AlertDescription>
        </Alert>
      )}
      
      <Textarea
        value={currentValidation.sanitizedContent}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
      />
      
      <div className="text-xs text-muted-foreground">
        {currentValidation.sanitizedContent.length}/{maxLength} characters
        {currentValidation.warnings.length > 0 && (
          <span className="text-destructive ml-2">
            • Content was sanitized for security
          </span>
        )}
      </div>
    </div>
  )
}
