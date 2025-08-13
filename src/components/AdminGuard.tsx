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
    
    const checkAdminAccess = async () => {
      try {
        // First check if user is authenticated
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.warn('AdminGuard: No authenticated user found')
          if (mounted) {
            navigate('/auth')
            setLoading(false)
          }
          return
        }

        // Check user role using the security-hardened function
        const { data: role, error: roleError } = await supabase.rpc('get_current_user_role')
        
        if (roleError) {
          console.error('AdminGuard: Error checking user role:', roleError)
          if (mounted) {
            navigate('/')
            setLoading(false)
          }
          return
        }

        // Security check: Only 'admin' role is allowed
        const isAdminUser = role === 'admin'
        
        if (!isAdminUser) {
          console.warn('AdminGuard: Access denied - user is not admin:', { userId: user.id, role })
          if (mounted) {
            navigate('/')
            setLoading(false)
          }
          return
        }

        // User is verified admin
        if (mounted) {
          setAllowed(true)
          setLoading(false)
        }
        
      } catch (error) {
        console.error('AdminGuard: Unexpected error:', error)
        if (mounted) {
          navigate('/auth')
          setLoading(false)
        }
      }
    }

    checkAdminAccess()
    
    return () => { 
      mounted = false 
    }
  }, [navigate])

  // Security: Show loading while checking permissions
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Verificando permissões administrativas...</p>
        </div>
      </div>
    )
  }
  
  // Security: Only render children if explicitly allowed
  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Acesso Negado</h2>
          <p className="text-red-600 mb-4">Você não tem permissão para acessar esta área administrativa.</p>
          <p className="text-red-600 text-sm">Entre em contato com um administrador para obter acesso.</p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}
