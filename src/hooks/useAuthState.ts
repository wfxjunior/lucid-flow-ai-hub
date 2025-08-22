
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('useAuthState: Setting up auth state listener');
    let isMounted = true;
    let sessionCheckTimeout: NodeJS.Timeout;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, !!session);
        
        if (!isMounted) return;
        
        // Update state synchronously
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle specific events
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing state');
          setUser(null);
          setSession(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_IN') {
          console.log('User signed in successfully');
        }
      }
    );

    // THEN check for existing session with debouncing
    const checkSession = async () => {
      if (!isMounted) return;
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (isMounted) setLoading(false);
          return;
        }
        
        console.log('Initial session check:', !!session);
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in session check:', error);
        if (isMounted) setLoading(false);
      }
    };

    // Debounced session check to prevent multiple rapid calls
    sessionCheckTimeout = setTimeout(checkSession, 200);

    return () => {
      console.log('Cleaning up auth listener');
      isMounted = false;
      if (sessionCheckTimeout) clearTimeout(sessionCheckTimeout);
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading }
}
