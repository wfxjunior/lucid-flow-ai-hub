import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuthState } from './useAuthState'

export function useUserRole() {
  const { user } = useAuthState()
  const [role, setRole] = useState<string>('user')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setRole('user')
      setLoading(false)
      return
    }

    const fetchUserRole = async () => {
      try {
        // Use security definer function to safely get user role
        const { data, error } = await supabase
          .rpc('get_current_user_role')

        if (error) {
          console.error('Error fetching user role:', error)
          setRole('user')
        } else {
          setRole(data || 'user')
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
        setRole('user')
      } finally {
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [user])

  const isAdmin = role === 'admin'
  const isModerator = role === 'moderator'

  return { role, isAdmin, isModerator, loading }
}