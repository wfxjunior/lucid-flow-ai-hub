
import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react'
import { applySecurityHeaders, logSecurityEvent } from '@/utils/securityCore'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'

export function SecurityMonitor() {
  const [securityAlerts, setSecurityAlerts] = useState<Array<{
    id: string
    type: 'warning' | 'error' | 'info'
    message: string
    timestamp: Date
  }>>([])
  
  const { securityMetrics, isAdmin } = useSecurityMonitoring()

  useEffect(() => {
    // Apply enhanced security headers
    applySecurityHeaders()

    // Monitor for security threats
    const monitorThreats = () => {
      const url = window.location.href
      const params = new URLSearchParams(window.location.search)
      
      // Check for XSS attempts in URL parameters
      for (const [key, value] of params.entries()) {
        const dangerousPatterns = [
          /javascript:/i,
          /<script/i,
          /on\w+\s*=/i,
          /vbscript:/i
        ]
        
        if (dangerousPatterns.some(pattern => pattern.test(value))) {
          const alertId = `xss-${Date.now()}`
          setSecurityAlerts(prev => [...prev, {
            id: alertId,
            type: 'error',
            message: `Potential XSS attempt detected in URL parameter: ${key}`,
            timestamp: new Date()
          }])
          
          logSecurityEvent('XSS attempt blocked', { parameter: key, value: value.substring(0, 50) })
          
          // Auto-remove alert after 10 seconds
          setTimeout(() => {
            setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId))
          }, 10000)
        }
      }
    }

    // Run initial check
    monitorThreats()

    // Monitor URL changes for SPAs
    let currentUrl = window.location.href
    const urlCheckInterval = setInterval(() => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href
        monitorThreats()
      }
    }, 1000)

    // Monitor DOM mutations for suspicious changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const innerHTML = element.innerHTML || ''
              
              if (/<script/i.test(innerHTML) || /javascript:/i.test(innerHTML)) {
                const alertId = `dom-${Date.now()}`
                setSecurityAlerts(prev => [...prev, {
                  id: alertId,
                  type: 'warning',
                  message: 'Suspicious DOM modification detected and blocked',
                  timestamp: new Date()
                }])
                
                logSecurityEvent('Suspicious DOM modification', { tagName: element.tagName })
                
                setTimeout(() => {
                  setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId))
                }, 8000)
              }
            }
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearInterval(urlCheckInterval)
      observer.disconnect()
    }
  }, [])

  // Check for high-risk security metrics
  useEffect(() => {
    if (!isAdmin || !securityMetrics) return

    const { suspicious_events_24h, failed_logins_1h, securityScore } = securityMetrics
    
    if (suspicious_events_24h > 10) {
      const alertId = `metrics-suspicious-${Date.now()}`
      setSecurityAlerts(prev => [...prev, {
        id: alertId,
        type: 'error',
        message: `High suspicious activity: ${suspicious_events_24h} events in 24h`,
        timestamp: new Date()
      }])
      
      setTimeout(() => {
        setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId))
      }, 15000)
    }

    if (failed_logins_1h > 5) {
      const alertId = `metrics-logins-${Date.now()}`
      setSecurityAlerts(prev => [...prev, {
        id: alertId,
        type: 'warning',
        message: `Multiple failed logins: ${failed_logins_1h} attempts in 1h`,
        timestamp: new Date()
      }])
      
      setTimeout(() => {
        setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId))
      }, 12000)
    }

    if (securityScore < 70) {
      const alertId = `metrics-score-${Date.now()}`
      setSecurityAlerts(prev => [...prev, {
        id: alertId,
        type: 'error',
        message: `Low security score: ${securityScore}/100 - Review security dashboard`,
        timestamp: new Date()
      }])
      
      setTimeout(() => {
        setSecurityAlerts(prev => prev.filter(alert => alert.id !== alertId))
      }, 20000)
    }
  }, [securityMetrics, isAdmin])

  if (securityAlerts.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {securityAlerts.map((alert) => (
        <Alert 
          key={alert.id}
          variant={alert.type === 'error' ? 'destructive' : 'default'}
          className="border-l-4"
        >
          {alert.type === 'error' ? (
            <AlertTriangle className="h-4 w-4" />
          ) : alert.type === 'warning' ? (
            <Shield className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            <div className="flex justify-between items-start">
              <span className="text-sm">{alert.message}</span>
              <button
                onClick={() => setSecurityAlerts(prev => 
                  prev.filter(a => a.id !== alert.id)
                )}
                className="text-xs opacity-70 hover:opacity-100 ml-2"
              >
                ✕
              </button>
            </div>
            <div className="text-xs opacity-70 mt-1">
              {alert.timestamp.toLocaleTimeString()}
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
