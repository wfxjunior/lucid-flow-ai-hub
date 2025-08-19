
import { useState, useCallback } from 'react';
import { validateFormData, checkClientRateLimit } from '@/utils/inputValidation';
import { securityEvent } from '@/utils/security';

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

interface SecureFormOptions {
  validationRules: Record<string, ValidationRule>;
  rateLimit?: {
    action: string;
    maxRequests?: number;
    windowMs?: number;
  };
  onSubmit: (sanitizedData: Record<string, any>) => Promise<void>;
  onError?: (errors: Record<string, string[]>) => void;
}

export function useSecureForm(options: SecureFormOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: any) => {
    const rule = options.validationRules[name];
    if (!rule) return { isValid: true, sanitizedValue: value, errors: [] };

    return validateFormData({ [name]: value }, { [name]: rule }).results[name];
  }, [options.validationRules]);

  const handleFieldChange = useCallback((name: string, value: any) => {
    const result = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: result.errors
    }));

    return result.sanitizedValue;
  }, [validateField]);

  const handleFieldBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (formData: Record<string, any>) => {
    // Check rate limiting if configured
    if (options.rateLimit) {
      const { action, maxRequests = 5, windowMs = 300000 } = options.rateLimit;
      if (!checkClientRateLimit(action, maxRequests, windowMs)) {
        setErrors({ _form: ['Too many attempts. Please try again later.'] });
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // Validate all form data
      const validation = validateFormData(formData, options.validationRules);
      
      if (!validation.isValid) {
        const fieldErrors: Record<string, string[]> = {};
        Object.entries(validation.results).forEach(([key, result]) => {
          if (!result.isValid) {
            fieldErrors[key] = result.errors;
          }
        });
        
        setErrors(fieldErrors);
        options.onError?.(fieldErrors);
        
        securityEvent('Form validation failed', {
          fields: Object.keys(fieldErrors),
          errorCount: Object.values(fieldErrors).flat().length
        });
        
        return;
      }

      // Clear errors and submit with sanitized data
      setErrors({});
      await options.onSubmit(validation.sanitizedData);
      
      securityEvent('Secure form submitted successfully', {
        fields: Object.keys(formData),
        sanitizedFields: Object.keys(validation.sanitizedData)
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ _form: ['An unexpected error occurred. Please try again.'] });
      
      securityEvent('Form submission error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [options]);

  const getFieldError = useCallback((name: string) => {
    return touched[name] ? errors[name] : undefined;
  }, [errors, touched]);

  const hasErrors = Object.values(errors).some(fieldErrors => fieldErrors.length > 0);

  return {
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    getFieldError,
    isSubmitting,
    hasErrors,
    errors,
    touched
  };
}
