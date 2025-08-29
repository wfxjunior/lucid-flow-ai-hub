import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserRole } from '@/hooks/useUserRole'
import { useAuthState } from '@/hooks/useAuthState'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user } = useAuthState()
  const { isAdmin, loading } = useUserRole()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      // Redirect unauthorized users to home page
      navigate('/', { replace: true })
    }
  }, [user, isAdmin, loading, navigate])

  // Show loading state while checking permissions
  if (loading) {
    return fallback || <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  // Block access if not admin
  if (!user || !isAdmin) {
    return fallback || null
  }

  return <>{children}</>
}