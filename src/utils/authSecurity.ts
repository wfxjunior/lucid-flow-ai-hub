
import { supabase } from '@/integrations/supabase/client'
import { securityEvent, secureError } from './security'
import { validateEmail } from './security'

// Enhanced authentication security utilities
export const cleanupAuthState = async () => {
  try {
    // Clear all Supabase auth keys
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.startsWith('supabase.auth.') || 
      key.includes('sb-') ||
      key.includes('session') ||
      key.includes('token')
    )
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key) // Also clear from session storage
    })

    // Clear any cached auth data
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      for (const cacheName of cacheNames) {
        if (cacheName.includes('auth') || cacheName.includes('supabase')) {
          await caches.delete(cacheName)
        }
      }
    }

    securityEvent('Auth state cleaned up')
  } catch (error) {
    secureError('Failed to cleanup auth state', { error })
  }
}

export const secureSignIn = async (email: string, password: string) => {
  try {
    // Validate input
    if (!validateEmail(email)) {
      throw new Error('Invalid email format')
    }

    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    // Clean up any existing auth state first
    await cleanupAuthState()

    // Attempt global sign out first
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (err) {
      // Continue even if this fails
      console.log('Global signout failed, continuing...', err)
    }

    // Sign in with enhanced security
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    })

    if (error) {
      securityEvent('Sign in failed', { 
        email, 
        error: error.message,
        timestamp: new Date().toISOString()
      })
      
      // Map common auth errors to user-friendly messages
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials.')
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please check your email and click the confirmation link before signing in.')
      } else if (error.message.includes('Too many requests')) {
        throw new Error('Too many sign-in attempts. Please try again in a few minutes.')
      } else {
        throw new Error('Sign in failed. Please try again.')
      }
    }

    if (data.user) {
      securityEvent('Secure sign in successful', { 
        userId: data.user.id,
        email,
        timestamp: new Date().toISOString()
      })

      // Force page reload for clean state
      setTimeout(() => {
        window.location.href = '/'
      }, 100)
    }

    return data
  } catch (error) {
    secureError('Secure sign in error', { 
      email, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    throw error
  }
}

export const secureSignOut = async () => {
  try {
    securityEvent('Secure sign out initiated')
    
    // Clean up auth state first
    await cleanupAuthState()
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' })
    } catch (err) {
      // Continue even if this fails
      console.log('Global signout failed, continuing...', err)
    }
    
    securityEvent('Secure sign out completed')
    
    // Force redirect after cleanup
    setTimeout(() => {
      window.location.href = '/auth'
    }, 100)
  } catch (error) {
    secureError('Secure sign out error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    
    // Force redirect even on error
    setTimeout(() => {
      window.location.href = '/auth'
    }, 100)
  }
}

export const logSecurityEvent = (event: string, metadata?: Record<string, any>) => {
  securityEvent(`Auth: ${event}`, {
    ...metadata,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    url: window.location.href
  })
}

// Session validation with enhanced security
export const validateSessionSecurity = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      securityEvent('Session validation error', { error: error.message })
      return false
    }

    if (!session?.user) {
      return true // No session is valid
    }

    // Check session expiration
    const expiresAt = new Date(session.expires_at || 0).getTime()
    if (expiresAt < Date.now()) {
      securityEvent('Expired session detected', { 
        expiresAt: session.expires_at,
        userId: session.user.id 
      })
      await secureSignOut()
      return false
    }

    // Validate with server-side check
    const { data: isValid } = await supabase.rpc('validate_user_session')
    
    if (!isValid) {
      securityEvent('Invalid session detected by server', { 
        userId: session.user.id 
      })
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
