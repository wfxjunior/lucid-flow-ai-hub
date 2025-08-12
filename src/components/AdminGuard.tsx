import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { if (mounted) navigate('/auth'); return }
      const { data, error } = await supabase.rpc('get_current_user_role')
      if (error) { console.error(error); if (mounted) navigate('/auth'); return }
      if (mounted) {
        setAllowed(data === 'admin')
        if (data !== 'admin') navigate('/')
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [navigate])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">Checking permissions…</div>
  )
  if (!allowed) return null
  return <>{children}</>
}
