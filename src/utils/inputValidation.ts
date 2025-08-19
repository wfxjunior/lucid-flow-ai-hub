
import { sanitizeText, sanitizeEmail, sanitizeUrl, sanitizePhoneNumber } from './htmlSanitizer';

interface ValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
}

interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => boolean;
}

// Simple email validation function for compatibility
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

export const validateInput = (
  value: string,
  type: 'text' | 'email' | 'url' | 'phone' | 'number',
  options: ValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];
  let sanitizedValue = '';

  // Basic sanitization based on type
  switch (type) {
    case 'email':
      sanitizedValue = sanitizeEmail(value);
      if (value && !sanitizedValue) {
        errors.push('Invalid email format');
      }
      break;
    case 'url':
      sanitizedValue = sanitizeUrl(value);
      if (value && !sanitizedValue) {
        errors.push('Invalid URL format');
      }
      break;
    case 'phone':
      sanitizedValue = sanitizePhoneNumber(value);
      if (value && !sanitizedValue) {
        errors.push('Invalid phone number format');
      }
      break;
    case 'number':
      const numValue = parseFloat(value);
      if (value && (isNaN(numValue) || !isFinite(numValue))) {
        errors.push('Invalid number format');
        sanitizedValue = '';
      } else {
        sanitizedValue = numValue.toString();
      }
      break;
    default:
      sanitizedValue = sanitizeText(value);
  }

  // Required validation
  if (options.required && !sanitizedValue.trim()) {
    errors.push('This field is required');
  }

  // Length validation
  if (sanitizedValue && options.minLength && sanitizedValue.length < options.minLength) {
    errors.push(`Minimum length is ${options.minLength} characters`);
  }

  if (sanitizedValue && options.maxLength && sanitizedValue.length > options.maxLength) {
    errors.push(`Maximum length is ${options.maxLength} characters`);
    sanitizedValue = sanitizedValue.slice(0, options.maxLength);
  }

  // Pattern validation
  if (sanitizedValue && options.pattern && !options.pattern.test(sanitizedValue)) {
    errors.push('Invalid format');
  }

  // Custom validation
  if (sanitizedValue && options.customValidator && !options.customValidator(sanitizedValue)) {
    errors.push('Invalid value');
  }

  // Log suspicious input attempts
  if (errors.length > 0 && (value.includes('<script') || value.includes('javascript:') || value.includes('on'))) {
    console.warn('Suspicious input detected:', {
      originalValue: value.slice(0, 100),
      sanitizedValue: sanitizedValue.slice(0, 100),
      type,
      errors
    });
  }

  return {
    isValid: errors.length === 0,
    sanitizedValue,
    errors
  };
};

export const validateFormData = (formData: Record<string, any>, validationRules: Record<string, { type: 'text' | 'email' | 'url' | 'phone' | 'number'; options?: ValidationOptions }>) => {
  const results: Record<string, ValidationResult> = {};
  const sanitizedData: Record<string, any> = {};
  let hasErrors = false;

  Object.entries(formData).forEach(([key, value]) => {
    const rule = validationRules[key];
    if (rule) {
      const result = validateInput(String(value || ''), rule.type, rule.options);
      results[key] = result;
      sanitizedData[key] = result.sanitizedValue;
      
      if (!result.isValid) {
        hasErrors = true;
      }
    } else {
      // Default sanitization for unknown fields
      sanitizedData[key] = sanitizeText(String(value || ''));
    }
  });

  return {
    isValid: !hasErrors,
    results,
    sanitizedData
  };
};

// Rate limiting for client-side actions
const actionCounts = new Map<string, { count: number; timestamp: number }>();

export const checkClientRateLimit = (action: string, maxRequests = 10, windowMs = 300000): boolean => {
  const now = Date.now();
  const key = `${action}_${Math.floor(now / windowMs)}`;
  
  const current = actionCounts.get(key) || { count: 0, timestamp: now };
  
  if (current.count >= maxRequests) {
    console.warn('Client rate limit exceeded', { action, count: current.count });
    return false;
  }
  
  actionCounts.set(key, { count: current.count + 1, timestamp: now });
  
  // Cleanup old entries
  Array.from(actionCounts.entries()).forEach(([k, v]) => {
    if (now - v.timestamp > windowMs) {
      actionCounts.delete(k);
    }
  });
  
  return true;
};
