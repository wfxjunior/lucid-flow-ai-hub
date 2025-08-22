// Performance and Security Utilities

// Centralized Security Logging System
interface SecurityLogEvent {
  level: 'info' | 'warn' | 'error' | 'security'
  message: string
  metadata?: Record<string, any>
  timestamp?: Date
}

class SecurityLogger {
  private static instance: SecurityLogger
  private isDevelopment = import.meta.env.DEV

  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger()
    }
    return SecurityLogger.instance
  }

  private logToConsole(event: SecurityLogEvent) {
    if (!this.isDevelopment) return

    const timestamp = (event.timestamp || new Date()).toISOString()
    const logData = event.metadata ? [event.message, event.metadata] : [event.message]

    switch (event.level) {
      case 'error':
      case 'security':
        console.error(`[${timestamp}] ${event.level.toUpperCase()}:`, ...logData)
        break
      case 'warn':
        console.warn(`[${timestamp}] WARN:`, ...logData)
        break
      default:
        console.log(`[${timestamp}] INFO:`, ...logData)
    }
  }

  private logToProduction(event: SecurityLogEvent) {
    if (this.isDevelopment) return

    // In production, send to monitoring service
    // This prevents console pollution while maintaining security monitoring
    try {
      // Could integrate with services like Sentry, LogRocket, etc.
      // For now, only log security events to prevent data exposure
      if (event.level === 'security' || event.level === 'error') {
        // Log to external service - placeholder for future implementation
        console.error('SECURITY_EVENT:', {
          level: event.level,
          message: event.message,
          timestamp: event.timestamp || new Date()
        })
      }
    } catch (error) {
      // Silently fail in production to prevent cascading errors
    }
  }

  log(event: SecurityLogEvent) {
    this.logToConsole(event)
    this.logToProduction(event)
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log({ level: 'info', message, metadata })
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log({ level: 'warn', message, metadata })
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log({ level: 'error', message, metadata })
  }

  security(message: string, metadata?: Record<string, any>) {
    this.log({ level: 'security', message, metadata })
  }
}

const logger = SecurityLogger.getInstance()

// Secure console logging - only in development, production-safe
export const secureLog = (message: string, ...args: any[]) => {
  logger.info(message, args.length > 0 ? { details: args } : undefined)
}

export const secureWarn = (message: string, ...args: any[]) => {
  logger.warn(message, args.length > 0 ? { details: args } : undefined)
}

export const secureError = (message: string, ...args: any[]) => {
  logger.error(message, args.length > 0 ? { details: args } : undefined)
}

export const securityEvent = (message: string, metadata?: Record<string, any>) => {
  logger.security(message, metadata)
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