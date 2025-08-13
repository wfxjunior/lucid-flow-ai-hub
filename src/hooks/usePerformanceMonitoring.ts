import { useEffect, useCallback } from 'react'
import { performanceMonitor, secureLog } from '@/utils/security'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage?: number
}

export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    performanceMonitor.startMark(`${componentName}-mount`)
    
    return () => {
      performanceMonitor.endMark(`${componentName}-mount`)
    }
  }, [componentName])

  const trackUserAction = useCallback((actionName: string) => {
    performanceMonitor.startMark(`${componentName}-${actionName}`)
    
    return () => {
      performanceMonitor.endMark(`${componentName}-${actionName}`)
    }
  }, [componentName])

  const getMetrics = useCallback((): PerformanceMetrics | null => {
    if ('performance' in window && 'memory' in (performance as any)) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      }
    }
    return null
  }, [])

  const logPerformanceWarning = useCallback((message: string, threshold: number, actual: number) => {
    if (actual > threshold) {
      secureLog(`Performance Warning in ${componentName}: ${message}`, {
        threshold,
        actual,
        component: componentName
      })
    }
  }, [componentName])

  return {
    trackUserAction,
    getMetrics,
    logPerformanceWarning
  }
}