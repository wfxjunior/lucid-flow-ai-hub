
import { supabase } from '@/integrations/supabase/client'
import { securityEvent, secureError } from './security'

// Enhanced auth cleanup utility
export const cleanupAuthState = () => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token')
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key)
      }
    })
    
    // Remove from sessionStorage if in use
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key)
        }
      })
    }
    
    securityEvent('Auth state cleaned up', { timestamp: new Date().toISOString() })
  } catch (error) {
    secureError('Auth cleanup failed', { error: error instanceof Error ? error.message : 'Unknown error' })
  }
}

// Enhanced secure sign in with validation
export const secureSignIn = async (email: string, password: string) => {
  try {
    // Clean up existing state first
    cleanupAuthState()
    
    // Attempt global sign out to ensure clean state
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (err) {
      // Continue even if this fails
      console.warn('Global signout failed, continuing with signin')
    }
    
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format')
    }
    
    securityEvent('Sign in attempt', { 
      email: email.toLowerCase(),
      timestamp: new Date().toISOString()
    })
    
    // Sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    })
    
    if (error) {
      securityEvent('Sign in failed', { 
        email: email.toLowerCase(),
        error: error.message,
        timestamp: new Date().toISOString()
      })
      throw error
    }
    
    if (data.user) {
      securityEvent('Sign in successful', { 
        userId: data.user.id,
        email: data.user.email,
        timestamp: new Date().toISOString()
      })
      
      // Validate session after signin
      setTimeout(async () => {
        try {
          const { data: sessionData } = await supabase.rpc('validate_session_security')
          if (!sessionData) {
            secureError('Session validation failed after signin', { userId: data.user.id })
            await secureSignOut()
          }
        } catch (error) {
          secureError('Session validation error', { error: error instanceof Error ? error.message : 'Unknown error' })
        }
      }, 1000)
      
      // Force page reload for clean state
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    }
    
    return data
  } catch (error) {
    secureError('Secure sign in failed', { 
      email: email.toLowerCase(),
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    throw error
  }
}

// Enhanced secure sign out
export const secureSignOut = async () => {
  try {
    securityEvent('Sign out attempt', { timestamp: new Date().toISOString() })
    
    // Clean up auth state first
    cleanupAuthState()
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (err) {
      // Continue even if this fails
      console.warn('Global signout failed')
    }
    
    securityEvent('Sign out completed', { timestamp: new Date().toISOString() })
    
    // Force page reload for clean state
    setTimeout(() => {
      window.location.href = '/auth'
    }, 100)
  } catch (error) {
    secureError('Secure sign out failed', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    // Force cleanup and redirect even if signout fails
    cleanupAuthState()
    window.location.href = '/auth'
  }
}

// Session validation utility
export const validateCurrentSession = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return false
    }
    
    // Check if session is expired
    const now = Date.now()
    const expiresAt = session.expires_at ? session.expires_at * 1000 : 0
    
    if (expiresAt <= now) {
      securityEvent('Session expired', { expiresAt, now })
      await secureSignOut()
      return false
    }
    
    // Check session integrity with database
    const { data: isValid } = await supabase.rpc('validate_session_security')
    
    if (!isValid) {
      securityEvent('Session integrity check failed')
      await secureSignOut()
      return false
    }
    
    return true
  } catch (error) {
    secureError('Session validation failed', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return false
  }
}

// Auto session timeout (24 hours)
export const setupSessionTimeout = () => {
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  
  let timeoutId: NodeJS.Timeout
  
  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(async () => {
      securityEvent('Session timeout reached')
      await secureSignOut()
    }, SESSION_TIMEOUT)
  }
  
  // Reset timeout on user activity
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
  
  events.forEach(event => {
    document.addEventListener(event, resetTimeout, { passive: true })
  })
  
  // Initial timeout setup
  resetTimeout()
  
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    events.forEach(event => {
      document.removeEventListener(event, resetTimeout)
    })
  }
}
