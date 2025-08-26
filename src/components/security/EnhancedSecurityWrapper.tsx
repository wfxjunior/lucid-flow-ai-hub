
import React, { useEffect } from 'react'
import { SecurityMonitor } from './SecurityMonitor'
import { EnhancedSecurityHeaders } from './EnhancedSecurityHeaders'

interface EnhancedSecurityWrapperProps {
  children: React.ReactNode
}

export function EnhancedSecurityWrapper({ children }: EnhancedSecurityWrapperProps) {
  useEffect(() => {
    // Log security initialization
    console.log('[SECURITY] Enhanced security wrapper initialized')
    
    // Validate browser security features
    const securityChecks = {
      csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
      https: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
      localStorage: (() => {
        try {
          localStorage.setItem('test', 'test')
          localStorage.removeItem('test')
          return true
        } catch {
          return false
        }
      })()
    }

    console.log('[SECURITY] Security checks:', securityChecks)
    
    if (!securityChecks.https && window.location.hostname !== 'localhost') {
      console.warn('[SECURITY] Application not running on HTTPS in production')
    }
  }, [])

  return (
    <>
      <EnhancedSecurityHeaders />
      <SecurityMonitor />
      {children}
    </>
  )
}
