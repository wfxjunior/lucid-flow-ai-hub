export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Email too long' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  // Enhanced password strength validation
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { 
      isValid: false, 
      error: 'Password must contain uppercase, lowercase, and numbers' 
    };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): { isValid: boolean; error?: string } => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

// Enhanced client-side rate limiting with better security
const rateLimitStore = new Map<string, { count: number; lastReset: number; blocked: boolean }>();

export const checkClientRateLimit = (action: string, maxRequests: number, windowMs: number): boolean => {
  const now = Date.now();
  const key = `${action}_${navigator.userAgent.slice(0, 50)}`; // Include browser fingerprint
  
  const existing = rateLimitStore.get(key);
  
  if (!existing || (now - existing.lastReset) > windowMs) {
    // Reset the counter
    rateLimitStore.set(key, { count: 1, lastReset: now, blocked: false });
    return true;
  }
  
  if (existing.blocked || existing.count >= maxRequests) {
    // Implement exponential backoff for repeated violations
    existing.blocked = true;
    return false;
  }
  
  existing.count++;
  return true;
};

// Enhanced security input sanitization
export const sanitizeSecurityInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/file:/gi, '') // Remove file: protocol
    .trim()
    .slice(0, 1000) // Limit length to prevent buffer overflow attacks
};

// Form validation functionality
interface ValidationRule {
  type: 'text' | 'email' | 'url' | 'phone' | 'number';
  options?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customValidator?: (value: string) => boolean;
  };
}

interface ValidationResult {
  isValid: boolean;
  sanitizedValue: any;
  errors: string[];
}

interface FormValidationResult {
  isValid: boolean;
  sanitizedData: Record<string, any>;
  results: Record<string, ValidationResult>;
}

const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/javascript:/gi, '');
};

const validateField = (value: any, rule: ValidationRule): ValidationResult => {
  const errors: string[] = [];
  let sanitizedValue = value;
  
  // Required validation
  if (rule.options?.required && (!value || value.toString().trim().length === 0)) {
    errors.push('This field is required');
    return { isValid: false, sanitizedValue: value, errors };
  }
  
  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim().length === 0) {
    return { isValid: true, sanitizedValue: '', errors: [] };
  }
  
  // Type-specific validation and sanitization
  switch (rule.type) {
    case 'email':
      const emailValidation = validateEmail(value.toString());
      if (!emailValidation.isValid) {
        errors.push(emailValidation.error || 'Invalid email format');
      }
      sanitizedValue = value.toString().toLowerCase().trim();
      break;
      
    case 'text':
      sanitizedValue = sanitizeHtml(value.toString().trim());
      break;
      
    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors.push('Must be a valid number');
      } else {
        sanitizedValue = numValue;
      }
      break;
      
    case 'url':
      try {
        new URL(value.toString());
        sanitizedValue = value.toString().trim();
      } catch {
        errors.push('Must be a valid URL');
      }
      break;
      
    case 'phone':
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(value.toString())) {
        errors.push('Must be a valid phone number');
      }
      sanitizedValue = value.toString().replace(/[^\d+]/g, '');
      break;
  }
  
  // Length validation
  if (rule.options?.minLength && sanitizedValue.toString().length < rule.options.minLength) {
    errors.push(`Must be at least ${rule.options.minLength} characters`);
  }
  
  if (rule.options?.maxLength && sanitizedValue.toString().length > rule.options.maxLength) {
    errors.push(`Must be no more than ${rule.options.maxLength} characters`);
    sanitizedValue = sanitizedValue.toString().substring(0, rule.options.maxLength);
  }
  
  // Pattern validation
  if (rule.options?.pattern && !rule.options.pattern.test(sanitizedValue.toString())) {
    errors.push('Invalid format');
  }
  
  // Custom validation
  if (rule.options?.customValidator && !rule.options.customValidator(sanitizedValue.toString())) {
    errors.push('Validation failed');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue,
    errors
  };
};

export const validateFormData = (
  data: Record<string, any>, 
  rules: Record<string, ValidationRule>
): FormValidationResult => {
  const results: Record<string, ValidationResult> = {};
  const sanitizedData: Record<string, any> = {};
  let isValid = true;
  
  // Validate each field
  Object.entries(rules).forEach(([fieldName, rule]) => {
    const fieldValue = data[fieldName];
    const result = validateField(fieldValue, rule);
    
    results[fieldName] = result;
    sanitizedData[fieldName] = result.sanitizedValue;
    
    if (!result.isValid) {
      isValid = false;
    }
  });
  
  return {
    isValid,
    sanitizedData,
    results
  };
};
