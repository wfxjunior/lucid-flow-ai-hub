
import React, { useCallback, useMemo, useState } from 'react'
import { validateAndSanitizeInput, validateRichTextContent } from '@/utils/enhancedXssProtection'
import { securityEvent } from '@/utils/security'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Shield } from 'lucide-react'

interface SecureRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  maxLength?: number
  allowBasicFormatting?: boolean
}

// Safe content renderer that doesn't use dangerouslySetInnerHTML
const SafeContentRenderer = ({ content, className }: { content: string; className?: string }) => {
  // Parse and render content safely without dangerouslySetInnerHTML
  const renderSafeContent = (text: string) => {
    // Convert common formatting to React elements
    return text
      .split('\n')
      .map((line, index) => (
        <div key={index} className="mb-1">
          {line || '\u00A0'} {/* Non-breaking space for empty lines */}
        </div>
      ))
  }

  return (
    <div className={className}>
      {renderSafeContent(content)}
    </div>
  )
}

export function SecureRichTextEditor({
  value,
  onChange,
  placeholder = "Enter your text...",
  className = "",
  maxLength = 10000,
  allowBasicFormatting = false
}: SecureRichTextEditorProps) {
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    // Enhanced validation and sanitization
    const validation = validateRichTextContent(newValue)
    
    if (!validation.isValid || validation.warnings.length > 0) {
      setShowSecurityWarning(true)
      setSecurityWarnings(validation.warnings)
      
      securityEvent('Potentially dangerous content blocked in rich text editor', {
        contentLength: newValue.length,
        sanitizedLength: validation.sanitizedContent.length,
        warnings: validation.warnings,
        timestamp: new Date().toISOString()
      })
      
      // Use sanitized content instead
      onChange(validation.sanitizedContent)
      
      // Hide warning after 5 seconds
      setTimeout(() => {
        setShowSecurityWarning(false)
        setSecurityWarnings([])
      }, 5000)
    } else {
      setShowSecurityWarning(false)
      setSecurityWarnings([])
      onChange(validation.sanitizedContent)
    }
  }, [onChange])

  // Sanitize current value for display
  const currentValidation = useMemo(() => {
    return validateRichTextContent(value)
  }, [value])

  return (
    <div className="space-y-3">
      {showSecurityWarning && securityWarnings.length > 0 && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="font-semibold mb-1">Security Alert:</div>
            <ul className="list-disc list-inside space-y-1">
              {securityWarnings.map((warning, index) => (
                <li key={index} className="text-sm">{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="relative">
        <Textarea
          value={currentValidation.sanitizedContent}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${className} font-mono`}
          maxLength={maxLength}
          rows={6}
        />
        
        {currentValidation.warnings.length > 0 && (
          <div className="absolute top-2 right-2" title="Content was sanitized for security">
            <Shield className="h-4 w-4 text-amber-500" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div>
          {currentValidation.sanitizedContent.length}/{maxLength} characters
          {currentValidation.warnings.length > 0 && (
            <span className="text-amber-600 ml-2">
              • Content sanitized for security
            </span>
          )}
        </div>
        
        {allowBasicFormatting && (
          <div className="text-xs text-muted-foreground">
            Basic formatting allowed (bold, italic, lists)
          </div>
        )}
      </div>
    </div>
  )
}
