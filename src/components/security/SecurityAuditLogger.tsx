
import { useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthState } from '@/hooks/useAuthState'
import { securityEvent } from '@/utils/security'

interface SecurityAuditLoggerProps {
  children: React.ReactNode
}

export function SecurityAuditLogger({ children }: SecurityAuditLoggerProps) {
  const { user } = useAuthState()

  useEffect(() => {
    if (!user) return

    // Log page access for security monitoring
    const logPageAccess = () => {
      const path = window.location.pathname
      const sensitiveRoutes = ['/clients', '/meetings', '/forms', '/support', '/company']
      
      if (sensitiveRoutes.some(route => path.includes(route))) {
        securityEvent('Sensitive page access', {
          userId: user.id,
          path,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      }
    }

    // Log initial access
    logPageAccess()

    // Log navigation changes
    const handleNavigation = () => {
      setTimeout(logPageAccess, 100)
    }

    window.addEventListener('popstate', handleNavigation)
    
    // Monitor for suspicious activity patterns
    let actionCount = 0
    const resetCount = () => { actionCount = 0 }
    const monitorActions = () => {
      actionCount++
      if (actionCount > 50) { // Suspicious activity threshold
        securityEvent('Suspicious activity detected', {
          userId: user.id,
          actionCount,
          timeWindow: '1 minute',
          timestamp: new Date().toISOString()
        })
        actionCount = 0
      }
    }

    // Reset counter every minute
    const interval = setInterval(resetCount, 60000)
    
    // Monitor clicks for suspicious patterns
    document.addEventListener('click', monitorActions)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      document.removeEventListener('click', monitorActions)
      clearInterval(interval)
    }
  }, [user])

  return <>{children}</>
}
