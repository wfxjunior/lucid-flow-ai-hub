
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useAuthState: Setting up auth state listener')
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session)
        
        // Update state synchronously
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle specific events
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing state')
          setUser(null)
          setSession(null)
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully')
        } else if (event === 'SIGNED_IN') {
          console.log('User signed in successfully')
        }
      }
    )

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }
        
        console.log('Initial session check:', !!session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('Error in session check:', error)
        setLoading(false)
      }
    }

    checkSession()

    return () => {
      console.log('Cleaning up auth listener')
      subscription.unsubscribe()
    }
  }, [])

  return { user, session, loading }
}
