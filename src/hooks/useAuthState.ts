
import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useAuthState: Initializing auth state')
    let mounted = true

    const initializeAuth = async () => {
      try {
        console.log('useAuthState: Getting current session')
        const { data: { session: currentSession }, error } = await supabase.auth.getSession()
        
        if (mounted) {
          if (error) {
            console.error('useAuthState: Error getting session:', error)
            setSession(null)
            setUser(null)
          } else {
            console.log('useAuthState: Current session:', currentSession?.user?.email || 'No user')
            setSession(currentSession)
            setUser(currentSession?.user ?? null)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('useAuthState: Auth initialization error:', error)
        if (mounted) {
          setSession(null)
          setUser(null)
          setLoading(false)
        }
      }
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('useAuthState: Auth state changed:', event, session?.user?.email || 'No user')
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_OUT') {
          setSession(null)
          setUser(null)
        }
      }
    })

    initializeAuth()

    return () => {
      console.log('useAuthState: Cleaning up')
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    session,
    loading
  }
}
