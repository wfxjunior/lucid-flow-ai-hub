import DOMPurify from 'dompurify'
import React from 'react'

let sanitizerHooksAdded = false
function ensureDomPurifyHooks() {
  if (sanitizerHooksAdded) return
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    const el = node as Element
    if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
      const href = el.getAttribute('href') || ''
      const allowed = /^(https?:|mailto:|tel:)/i.test(href)
      if (!allowed) {
        el.removeAttribute('href')
      }
      if (el.getAttribute('target')) {
        el.setAttribute('rel', 'noopener noreferrer')
      }
    }
  })
  sanitizerHooksAdded = true
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  ensureDomPurifyHooks()
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?):|mailto:|tel)/i,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'style', 'onfocus', 'onblur'],
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: false
  })
}

/**
 * Sanitizes text content for PDF generation
 * @param text - The text string to sanitize
 * @returns Sanitized text string
 */
export function sanitizeTextForPdf(text: string): string {
  // Remove any HTML tags and decode entities
  const withoutTags = text.replace(/<[^>]*>/g, '')
  // Decode common HTML entities
  return withoutTags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim()
}

/**
 * Safe component for rendering sanitized HTML
 */
interface SafeHtmlProps {
  html: string
  className?: string
  style?: React.CSSProperties
}

export function SafeHtml({ html, className = '', style }: SafeHtmlProps) {
  const sanitizedHtml = sanitizeHtml(html)
  
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}