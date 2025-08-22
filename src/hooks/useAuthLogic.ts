
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthState } from './useAuthState'
import { securityEvent, secureError } from '@/utils/security'
import { validateEmail } from '@/utils/inputValidation'

export function useAuthLogic() {
  const { user, session, loading } = useAuthState()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true)
    }
  }, [loading])

  const signOut = async () => {
    try {
      securityEvent('Sign out initiated')
      
      // Enhanced secure sign out
      await supabase.auth.signOut({ scope: 'global' })
      
      // Clear any cached data
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        for (const cacheName of cacheNames) {
          if (cacheName.includes('auth') || cacheName.includes('supabase')) {
            await caches.delete(cacheName)
          }
        }
      }
      
      securityEvent('Sign out completed')
    } catch (error) {
      secureError('Sign out error', { error: error instanceof Error ? error.message : 'Unknown error' })
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Enhanced input validation
      if (!validateEmail(email)) {
        throw new Error('Invalid email format')
      }

      if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }

      securityEvent('Sign in attempt', { email })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })

      if (error) {
        securityEvent('Sign in failed', { email, error: error.message })
        throw error
      }

      if (data.user) {
        securityEvent('Sign in successful', { userId: data.user.id, email })
      }

      return data
    } catch (error) {
      secureError('Sign in error', { email, error: error instanceof Error ? error.message : 'Unknown error' })
      throw error
    }
  }

  return {
    user,
    session,
    loading,
    isInitialized,
    signIn,
    signOut
  }
}
