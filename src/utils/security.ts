
export function securityEvent(message: string, details?: any) {
  console.warn(`[SECURITY] ${message}`, details);
  
  // In a production environment, you would send this to your security monitoring service
  // For now, we'll just log it to the console
  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service
    // Example: analytics.track('security_event', { message, details });
  }
}

export function secureError(message: string, details?: any) {
  console.error(`[SECURITY ERROR] ${message}`, details);
  
  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(new Error(message), { extra: details });
  }
}

export function secureLog(message: string, details?: any) {
  console.log(`[SECURITY LOG] ${message}`, details);
}

export function sanitizeInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Debounce utility function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Performance monitoring utilities
export const performanceMonitor = {
  startMark: (name: string) => {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${name}-start`);
    }
  },
  
  endMark: (name: string) => {
    if ('performance' in window && 'mark' in performance && 'measure' in performance) {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measures = performance.getEntriesByName(name, 'measure');
        if (measures.length > 0) {
          const duration = measures[measures.length - 1].duration;
          secureLog(`Performance: ${name} took ${duration.toFixed(2)}ms`);
        }
      } catch (error) {
        secureError('Performance measurement failed', { name, error });
      }
    }
  }
};
