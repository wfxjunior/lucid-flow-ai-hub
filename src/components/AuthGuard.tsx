
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

  // Define public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth',
    '/login', 
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/blog',
    '/dashboard'
  ]

  const isPublicRoute = publicRoutes.includes(location.pathname) || 
                       location.pathname.startsWith('/blog/')

  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      // Only redirect if not on a public route
      navigate('/auth', { 
        state: { from: location.pathname },
        replace: true 
      })
    }
  }, [user, loading, navigate, location, isPublicRoute])

  // Show loading state while checking authentication
  if (loading) {
    return fallback || <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Block access to protected routes if not authenticated
  if (!user) {
    return fallback || null
  }

  return <>{children}</>
}
