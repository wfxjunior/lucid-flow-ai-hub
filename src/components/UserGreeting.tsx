import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { User as SupabaseUser } from "@supabase/supabase-js"

export function UserGreeting() {
  const navigate = useNavigate()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const cleanupAuthState = () => {
    // Clear any existing auth state
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key)
      }
    })
  }

  const handleLogout = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState()
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' })
      } catch (err) {
        console.error('Error during signout:', err)
        // Continue even if this fails
      }
      
      toast.success("Logout realizado com sucesso")
      
      // Force page refresh to ensure clean state
      window.location.href = "/auth"
    } catch (error: any) {
      console.error('Logout error:', error)
      toast.error("Erro ao fazer logout")
    }
  }

  if (loading) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
    )
  }

  if (!user) {
    return (
      <Button onClick={() => navigate('/auth')} variant="outline">
        Sign In
      </Button>
    )
  }

  const getInitials = () => {
    const metadata = user.user_metadata
    const firstName = metadata?.first_name || user.email?.charAt(0) || 'U'
    const lastName = metadata?.last_name || ''
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getDisplayName = () => {
    const metadata = user.user_metadata
    if (metadata?.first_name || metadata?.last_name) {
      return `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim()
    }
    return user.email?.split('@')[0] || 'User'
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-gray-700">
          {getGreeting()}, {getDisplayName()}!
        </p>
        <p className="text-xs text-gray-500">Welcome back</p>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">Hello, {getDisplayName()}!</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {user.user_metadata?.country && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.user_metadata.country}
              </p>
            )}
          </div>
          <DropdownMenuItem onClick={() => navigate('/dashboard?view=settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
