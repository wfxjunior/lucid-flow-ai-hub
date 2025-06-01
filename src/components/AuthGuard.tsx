
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { User, Session } from "@supabase/supabase-js"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Check for existing session first
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          if (mounted) {
            setIsLoading(false)
            navigate('/auth')
          }
          return
        }

        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setIsLoading(false)
          
          if (!session) {
            navigate('/auth')
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setIsLoading(false)
          navigate('/auth')
        }
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setIsLoading(false)
          
          if (event === 'SIGNED_OUT' || !session) {
            navigate('/auth')
          }
        }
      }
    )

    // Initialize auth
    initializeAuth()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || !session) {
    return null // Will redirect to auth page
  }

  return <>{children}</>
}
