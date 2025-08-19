
import DOMPurify from 'dompurify';

/**
 * HTML Sanitization Utilities
 * Prevents XSS attacks by sanitizing user-generated content
 */

interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: string[];
  stripTags?: boolean;
}

export const sanitizeHtml = (html: string, options: SanitizeOptions = {}): string => {
  const {
    allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3'],
    allowedAttributes = ['class'],
    stripTags = false
  } = options;

  if (stripTags) {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    ALLOW_DATA_ATTR: false,
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
    USE_PROFILES: { html: true }
  });
};

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
