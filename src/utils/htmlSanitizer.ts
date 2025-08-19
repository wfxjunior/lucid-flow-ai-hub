
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

interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: string[];
  stripTags?: boolean;
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string, options: SanitizeOptions = {}): string {
  ensureDomPurifyHooks()
  
  const {
    allowedTags = [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div'
    ],
    allowedAttributes = ['href', 'target', 'rel', 'class'],
    stripTags = false
  } = options;

  if (stripTags) {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
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

export const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .trim()
    .slice(0, 10000); // Limit length to prevent buffer overflow attacks
};

export const sanitizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:', 'mailto:'].includes(urlObj.protocol)) {
      return '';
    }
    return urlObj.toString();
  } catch {
    return '';
  }
};

export const sanitizeEmail = (email: string): string => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const sanitized = sanitizeText(email);
  return emailRegex.test(sanitized) && sanitized.length <= 254 ? sanitized : '';
};

export const sanitizePhoneNumber = (phone: string): string => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  const sanitized = phone.replace(/[^\d\s\-\(\)\+]/g, '');
  return phoneRegex.test(sanitized) ? sanitized : '';
};

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
  
  return React.createElement('div', {
    className,
    style,
    dangerouslySetInnerHTML: { __html: sanitizedHtml }
  })
}
