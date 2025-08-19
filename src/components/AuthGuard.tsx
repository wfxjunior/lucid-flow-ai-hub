
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate, useLocation } from 'react-router-dom'
import { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/pricing', '/contact', '/about', '/blog', '/payment-success', '/payment-canceled', '/health', '/_debug/routes']
  
  const isPublicRoute = publicRoutes.includes(location.pathname) || 
                       location.pathname.startsWith('/blog/') ||
                       location.pathname.startsWith('/assets/') ||
                       location.pathname.startsWith('/_static/')

  useEffect(() => {
    // Skip auth check for public routes
    if (isPublicRoute) {
      setLoading(false)
      return
    }

    // Check current auth state with better error handling
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error && error.message !== 'Auth session missing!') {
          console.error('Auth check error:', error)
        }
        
        setUser(user)
        
        if (!user) {
          navigate('/') // Redirect to landing page instead of /auth
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session)
        
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
          if (!isPublicRoute) {
            navigate('/')
          }
        } else if (session?.user) {
          setUser(session.user)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate, location.pathname, isPublicRoute])

  // For public routes, always render children
  if (isPublicRoute) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
