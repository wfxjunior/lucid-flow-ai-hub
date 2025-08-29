
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthState } from '@/hooks/useAuthState'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuthState()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to auth page, preserving the intended destination
      navigate('/auth', { 
        state: { from: location.pathname },
        replace: true 
      })
    }
  }, [user, loading, navigate, location])

  // Show loading state while checking authentication
  if (loading) {
    return fallback || <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  // Show fallback or redirect if not authenticated
  if (!user) {
    return fallback || null
  }

  return <>{children}</>
}
