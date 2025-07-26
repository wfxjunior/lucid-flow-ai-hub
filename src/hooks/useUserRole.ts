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
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user role:', error)
          setRole('user')
        } else {
          setRole(data?.role || 'user')
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