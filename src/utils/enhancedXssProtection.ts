
import DOMPurify from 'dompurify'

// Enhanced XSS protection with stricter sanitization
export const sanitizeHtmlStrict = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'blockquote'],
    ALLOWED_ATTR: ['class'],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false
  })
}

// Sanitize JSON-LD structured data
export const sanitizeJsonLd = (data: any): any => {
  if (typeof data === 'string') {
    // Remove any script tags or dangerous content
    return data.replace(/<script[^>]*>.*?<\/script>/gi, '')
               .replace(/javascript:/gi, '')
               .replace(/on\w+\s*=/gi, '')
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeJsonLd)
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      // Skip potentially dangerous keys
      if (key.toLowerCase().includes('script') || key.toLowerCase().includes('eval')) {
        continue
      }
      sanitized[key] = sanitizeJsonLd(value)
    }
    return sanitized
  }
  
  return data
}

// Validate and sanitize user input with enhanced security
export const validateAndSanitizeInput = (
  input: string, 
  type: 'text' | 'email' | 'url' | 'phone' | 'name' = 'text'
): { isValid: boolean; sanitized: string; errors: string[] } => {
  const errors: string[] = []
  let sanitized = input.trim()

  // Basic XSS prevention
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '')
                      .replace(/javascript:/gi, '')
                      .replace(/on\w+\s*=/gi, '')
                      .replace(/data:/gi, '')
                      .replace(/vbscript:/gi, '')

  // Type-specific validation
  switch (type) {
    case 'email':
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(sanitized)) {
        errors.push('Invalid email format')
      }
      // Check for suspicious email patterns
      if (sanitized.includes('..') || sanitized.includes('--')) {
        errors.push('Email contains suspicious patterns')
      }
      break
    
    case 'url':
      try {
        const url = new URL(sanitized)
        if (!['http:', 'https:'].includes(url.protocol)) {
          errors.push('Only HTTP and HTTPS URLs are allowed')
        }
      } catch {
        errors.push('Invalid URL format')
      }
      break
    
    case 'phone':
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
      sanitized = sanitized.replace(/[^\d\s\-\(\)\+]/g, '')
      if (!phoneRegex.test(sanitized)) {
        errors.push('Invalid phone number format')
      }
      break
    
    case 'name':
      // Remove numbers and special characters for names
      sanitized = sanitized.replace(/[0-9<>{}[\]\\\/]/g, '')
      if (sanitized.length < 1) {
        errors.push('Name cannot be empty')
      }
      break
    
    case 'text':
    default:
      // General text sanitization
      if (sanitized.length > 10000) {
        errors.push('Text is too long')
        sanitized = sanitized.substring(0, 10000)
      }
      break
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  }
}

// Enhanced content validation for rich text
export const validateRichTextContent = (content: string): {
  isValid: boolean
  sanitizedContent: string
  warnings: string[]
} => {
  const warnings: string[] = []
  let sanitized = content

  // Check for potentially dangerous content
  const dangerousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /data:text\/html/gi
  ]

  dangerousPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      warnings.push('Potentially dangerous content detected and removed')
    }
  })

  // Sanitize the content
  sanitized = sanitizeHtmlStrict(content)

  return {
    isValid: warnings.length === 0,
    sanitizedContent: sanitized,
    warnings
  }
}
