
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { HelpCenter } from "@/components/HelpCenter"
import { User, LogOut, Settings } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

interface UserGreetingProps {
  onNavigate?: (view: string) => void
}

export const UserGreeting = ({ onNavigate }: UserGreetingProps = {}) => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error('Error getting user:', error)
          return
        }
        
        if (user?.email) {
          setUserEmail(user.email)
        }
      } catch (error) {
        console.error('Error in getUser:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session)
        if (event === 'SIGNED_OUT' || !session) {
          setUserEmail(null)
          navigate('/auth')
        } else if (session?.user?.email) {
          setUserEmail(session.user.email)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      
      // Clear any existing auth state
      localStorage.clear()
      sessionStorage.clear()
      
      const { error } = await supabase.auth.signOut({ scope: 'global' })
      
      if (error) {
        console.error('Sign out error:', error)
        toast.error('Error signing out. Please try again.')
      } else {
        toast.success('Successfully signed out!')
        // Force redirect to auth page
        window.location.href = '/auth'
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error)
      toast.error('Unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const getUserDisplayName = (email: string) => {
    return email.split('@')[0]
  }

  const handleProfileClick = () => {
    if (onNavigate) {
      onNavigate('settings')
    } else {
      navigate('/')
    }
  }

  const handleSettingsClick = () => {
    if (onNavigate) {
      onNavigate('settings')
    } else {
      navigate('/')
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-10 w-10" />
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
        </div>
        <div className="flex items-center gap-2">
          <HelpCenter variant="outline" size="sm" />
        </div>
      </div>
    )
  }

  if (!userEmail) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-10 w-10" />
          <div className="text-lg sm:text-xl font-semibold">Welcome to FeatherBiz</div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
          <HelpCenter variant="outline" size="sm" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-10 w-10" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-500 text-white text-xs">
                  {getUserInitials(userEmail)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {getUserDisplayName(userEmail)}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="text-sm sm:text-base text-muted-foreground">
          Hello, {getUserDisplayName(userEmail)}!
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <HelpCenter variant="outline" size="sm" />
      </div>
    </div>
  )
}
