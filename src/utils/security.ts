// Performance and Security Utilities

// Secure console logging - only in development
export const secureLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

export const secureWarn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args)
  }
}

export const secureError = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.error(...args)
  }
  // In production, you might want to send to error tracking service
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Email validation with stricter security
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

// Phone validation
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// URL validation
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Memory usage optimization
export const cleanupMemory = () => {
  if ('gc' in window && typeof window.gc === 'function') {
    window.gc()
  }
}

// Secure localStorage wrapper
export const secureStorage = {
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      secureWarn('localStorage not available:', e)
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      secureWarn('localStorage not available:', e)
      return null
    }
  },
  
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      secureWarn('localStorage not available:', e)
    }
  }
}

// Performance monitoring
export const performanceMonitor = {
  startMark: (name: string) => {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${name}-start`)
    }
  },
  
  endMark: (name: string) => {
    if ('performance' in window && 'mark' in performance && 'measure' in performance) {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      if (import.meta.env.DEV) {
        const measure = performance.getEntriesByName(name)[0]
        if (measure) {
          console.log(`${name} took ${measure.duration.toFixed(2)}ms`)
        }
      }
    }
  }
}