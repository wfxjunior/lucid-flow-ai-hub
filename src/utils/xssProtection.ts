
// XSS Protection Utilities

import DOMPurify from 'dompurify'
import { securityEvent } from './security'

// Enhanced XSS protection configuration
const XSS_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'
  ],
  ALLOWED_ATTR: ['class', 'id'],
  FORBID_TAGS: ['script', 'object', 'embed', 'applet', 'iframe'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
}

// Sanitize HTML content with enhanced protection
export const sanitizeHtml = (html: string, allowBasicFormatting = false): string => {
  if (!html) return ''

  const config = allowBasicFormatting ? {
    ALLOWED_TAGS: XSS_CONFIG.ALLOWED_TAGS,
    ALLOWED_ATTR: XSS_CONFIG.ALLOWED_ATTR,
    FORBID_TAGS: XSS_CONFIG.FORBID_TAGS,
    FORBID_ATTR: XSS_CONFIG.FORBID_ATTR
  } : {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  }

  let sanitized = DOMPurify.sanitize(html, config)

  // Additional protection against obfuscated scripts
  const dangerousPatterns = [
    /javascript:/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /data:image\/svg\+xml/gi,
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /on\w+\s*=/gi
  ]

  dangerousPatterns.forEach(pattern => {
    if (pattern.test(sanitized)) {
      securityEvent('XSS attempt detected and blocked', {
        originalContent: html.substring(0, 100),
        pattern: pattern.toString()
      })
      sanitized = sanitized.replace(pattern, '')
    }
  })

  return sanitized
}

// Validate rich text content before rendering
export const validateRichTextContent = (content: string): { isValid: boolean; sanitizedContent: string } => {
  const sanitizedContent = sanitizeHtml(content, true)
  
  // Check if content was significantly modified (potential XSS)
  const originalLength = content.length
  const sanitizedLength = sanitizedContent.length
  const modificationRatio = originalLength > 0 ? (originalLength - sanitizedLength) / originalLength : 0

  if (modificationRatio > 0.1) { // More than 10% of content was removed
    securityEvent('Suspicious content modification detected', {
      originalLength,
      sanitizedLength,
      modificationRatio
    })
  }

  return {
    isValid: modificationRatio < 0.5, // Block if more than 50% was removed
    sanitizedContent
  }
}

// Safe attribute handling for dynamic content
export const getSafeAttributes = (attributes: Record<string, any>): Record<string, any> => {
  const safeAttributes: Record<string, any> = {}
  const allowedAttributes = ['class', 'id', 'data-testid', 'aria-label', 'title']
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (allowedAttributes.includes(key) && typeof value === 'string') {
      safeAttributes[key] = DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
    }
  })

  return safeAttributes
}

// URL validation and sanitization
export const sanitizeUrl = (url: string): string => {
  if (!url) return ''

  try {
    const urlObj = new URL(url)
    
    // Only allow safe protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
    if (!allowedProtocols.includes(urlObj.protocol)) {
      securityEvent('Dangerous URL protocol blocked', { url, protocol: urlObj.protocol })
      return ''
    }

    return urlObj.toString()
  } catch {
    securityEvent('Invalid URL blocked', { url })
    return ''
  }
}
