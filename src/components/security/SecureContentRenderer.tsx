
import React from 'react'
import { sanitizeHtmlStrict, validateRichTextContent } from '@/utils/enhancedXssProtection'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface SecureContentRendererProps {
  content: string
  className?: string
  allowedTags?: string[]
  showWarnings?: boolean
}

export function SecureContentRenderer({ 
  content, 
  className = "", 
  allowedTags,
  showWarnings = false
}: SecureContentRendererProps) {
  const validation = validateRichTextContent(content)
  const sanitizedContent = sanitizeHtmlStrict(validation.sanitizedContent)

  return (
    <div className="space-y-2">
      {showWarnings && validation.warnings.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {validation.warnings.join(', ')}
          </AlertDescription>
        </Alert>
      )}
      
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  )
}
