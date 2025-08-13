import { supabase } from '@/integrations/supabase/client'

/**
 * Enhanced authentication security utilities
 */

/**
 * Comprehensive auth state cleanup
 */
export const cleanupAuthState = () => {
  try {
    // Clear all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key)
      }
    })
    
    // Clear from sessionStorage if in use
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key)
        }
      })
    }
    
    console.log('Auth state cleaned up successfully')
  } catch (error) {
    console.error('Error cleaning up auth state:', error)
  }
}

/**
 * Secure sign out with comprehensive cleanup
 */
export const secureSignOut = async () => {
  try {
    // Clean up auth state first
    cleanupAuthState()
    
    // Attempt global sign out (ignore errors)
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (error) {
      console.warn('Sign out warning:', error)
    }
    
    // Force page reload for clean state
    window.location.href = '/auth'
  } catch (error) {
    console.error('Error during secure sign out:', error)
    // Force reload even on error
    window.location.href = '/auth'
  }
}

/**
 * Enhanced sign in with cleanup
 */
export const secureSignIn = async (email: string, password: string) => {
  try {
    // Clean up existing state first
    cleanupAuthState()
    
    // Attempt global sign out to clear any existing sessions
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (error) {
      // Continue even if this fails
    }
    
    // Sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    })
    
    if (error) throw error
    
    if (data.user) {
      // Small delay to ensure session is established
      setTimeout(() => {
        window.location.href = '/'
      }, 100)
    }
    
    return data
  } catch (error) {
    throw error
  }
}

/**
 * Session validation utility
 */
export const validateSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session validation error:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Error validating session:', error)
    return null
  }
}

/**
 * Enhanced user data fetcher with security checks
 */
export const fetchSecureUserData = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('User fetch error:', error)
      return null
    }
    
    if (!user) {
      console.log('No authenticated user found')
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

/**
 * Security event logger (client-side)
 */
export const logSecurityEvent = (event: string, details?: any) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  }
  
  console.log('Security Event:', logEntry)
  
  // In production, you might want to send this to a logging service
  // or store it locally for debugging
}

/**
 * Detects potential session hijacking
 */
export const detectSuspiciousActivity = () => {
  const currentFingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled
  }
  
  const storedFingerprint = localStorage.getItem('device_fingerprint')
  
  if (storedFingerprint) {
    const stored = JSON.parse(storedFingerprint)
    
    // Check for significant changes that might indicate session hijacking
    if (stored.userAgent !== currentFingerprint.userAgent ||
        stored.platform !== currentFingerprint.platform) {
      logSecurityEvent('suspicious_device_change', {
        stored,
        current: currentFingerprint
      })
      return true
    }
  } else {
    // Store fingerprint for future checks
    localStorage.setItem('device_fingerprint', JSON.stringify(currentFingerprint))
  }
  
  return false
}