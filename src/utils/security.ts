// Simplified security utilities to prevent interference with normal app flow
export const secureLog = (message: string, data?: any) => {
  console.log(`[SECURITY] ${message}`, data || '')
}

export const secureError = (message: string, data?: any) => {
  console.error(`[SECURITY ERROR] ${message}`, data || '')
}

export const securityEvent = (event: string, metadata?: Record<string, any>) => {
  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...metadata
  }
  
  console.log('[SECURITY EVENT]', eventData)
  
  // Store in localStorage for debugging
  try {
    const events = JSON.parse(localStorage.getItem('security_events') || '[]')
    events.push(eventData)
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100)
    }
    localStorage.setItem('security_events', JSON.stringify(events))
  } catch (error) {
    console.error('Failed to store security event:', error)
  }
}

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return String(input)
  return input.trim().replace(/[<>]/g, '')
}

export const validateInput = (input: string, type: 'email' | 'text' | 'url' = 'text'): boolean => {
  if (!input || typeof input !== 'string') return false
  
  switch (type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())
    case 'url':
      try {
        new URL(input)
        return true
      } catch {
        return false
      }
    case 'text':
    default:
      return input.trim().length > 0
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
