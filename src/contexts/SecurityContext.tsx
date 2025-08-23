
import React, { createContext, useContext, useEffect, useState } from 'react'
import { setupSessionTimeout, validateCurrentSession } from '@/utils/authSecurity'
import { securityEvent } from '@/utils/security'
import { useAuthState } from '@/hooks/useAuthState'

interface SecurityContextType {
  securityLevel: 'low' | 'medium' | 'high'
  sessionValid: boolean
  lastSecurityCheck: Date | null
  performSecurityCheck: () => Promise<void>
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined)

export function useSecurityContext() {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider')
  }
  return context
}

interface SecurityProviderProps {
  children: React.ReactNode
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const { user } = useAuthState()
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [sessionValid, setSessionValid] = useState(true)
  const [lastSecurityCheck, setLastSecurityCheck] = useState<Date | null>(null)

  const performSecurityCheck = async () => {
    try {
      if (!user) {
        setSessionValid(false)
        setSecurityLevel('low')
        return
      }

      const isValid = await validateCurrentSession()
      setSessionValid(isValid)
      setLastSecurityCheck(new Date())

      if (!isValid) {
        setSecurityLevel('low')
        securityEvent('Security check failed - invalid session')
      } else {
        setSecurityLevel('high')
        securityEvent('Security check passed')
      }
    } catch (error) {
      console.error('Security check failed:', error)
      setSessionValid(false)
      setSecurityLevel('low')
      securityEvent('Security check error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  useEffect(() => {
    if (!user) {
      setSessionValid(false)
      setSecurityLevel('low')
      return
    }

    // Initial security check
    performSecurityCheck()

    // Set up session timeout
    const cleanupTimeout = setupSessionTimeout()

    // Periodic security checks (every 5 minutes)
    const securityCheckInterval = setInterval(performSecurityCheck, 5 * 60 * 1000)

    // Security check on visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performSecurityCheck()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cleanupTimeout()
      clearInterval(securityCheckInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [user])

  const value: SecurityContextType = {
    securityLevel,
    sessionValid,
    lastSecurityCheck,
    performSecurityCheck
  }

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  )
}
