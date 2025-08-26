
// Enhanced security utilities - now using unified core
export { 
  sanitizeInput, 
  validateInput, 
  logSecurityEvent as securityEvent,
  logSecurityEvent as secureLog 
} from './securityCore'

// Add missing validateEmail function
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

export const secureError = (message: string, data?: any) => {
  console.error(`[SECURITY ERROR] ${message}`, data || '')
  
  // Use the unified logging
  const { logSecurityEvent } = require('./securityCore')
  logSecurityEvent('Security Error', { message, data })
}

export const performanceMonitor = {
  start: (label: string) => {
    performance.mark(`${label}-start`)
  },
  end: (label: string) => {
    performance.mark(`${label}-end`)
    performance.measure(label, `${label}-start`, `${label}-end`)
    const measure = performance.getEntriesByName(label)[0]
    console.log(`[PERFORMANCE] ${label}: ${measure.duration.toFixed(2)}ms`)
  }
}

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Re-export for backward compatibility
import { logSecurityEvent } from './securityCore'
export { logSecurityEvent }
