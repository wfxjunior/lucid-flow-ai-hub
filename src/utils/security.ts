
export function securityEvent(message: string, details?: any) {
  console.warn(`[SECURITY] ${message}`, details);
  
  // In a production environment, you would send this to your security monitoring service
  // For now, we'll just log it to the console
  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service
    // Example: analytics.track('security_event', { message, details });
  }
}

export function sanitizeInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
