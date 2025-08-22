
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthState } from '@/hooks/useAuthState'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user, loading: authLoading } = useAuthState()
  const { isAdmin, loading: roleLoading } = useUserRole()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/auth')
        return
      }
      
      if (!isAdmin) {
        navigate('/')
        return
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate])

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
          <p className="text-sm text-muted-foreground mt-2">Apenas administradores podem gerenciar o blog.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
