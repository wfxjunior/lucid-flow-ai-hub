import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { HelpCenter } from "@/components/HelpCenter"
import { User, LogOut } from "lucide-react"
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
import { useLanguage } from "@/contexts/LanguageContext"

interface UserGreetingProps {
  onNavigate?: (view: string) => void
}

// Auth cleanup utility
const cleanupAuthState = () => {
  console.log('Cleaning up auth state on sign out')
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token')
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key)
    }
  })
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key)
    }
  })
}

export const UserGreeting = ({ onNavigate }: UserGreetingProps = {}) => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { t } = useLanguage()

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
          console.log('User loaded in UserGreeting:', user.email)
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
        console.log('UserGreeting: Auth state changed:', event, !!session)
        if (event === 'SIGNED_OUT' || !session) {
          setUserEmail(null)
          // Don't automatically redirect here, let the main auth handler do it
        } else if (session?.user?.email) {
          setUserEmail(session.user.email)
        }
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      
      console.log('Starting sign out process')
      
      // Clean up auth state first
      cleanupAuthState()
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' })
      
      if (error) {
        console.error('Sign out error:', error)
        toast.error('Erro ao sair. Tente novamente.')
      } else {
        console.log('Sign out successful')
        toast.success('Logout realizado com sucesso!')
        // Force redirect to auth page with page reload for clean state
        window.location.href = '/auth'
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error)
      toast.error('Erro inesperado ao sair.')
      // Force redirect even on error
      window.location.href = '/auth'
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
          <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-3 w-16 sm:h-4 sm:w-24 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <HelpCenter variant="outline" size="sm" className="h-8 w-8 sm:h-auto sm:w-auto" />
        </div>
      </div>
    )
  }

  if (!userEmail) {
    return (
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <SidebarTrigger className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
          <div className="text-sm sm:text-lg lg:text-xl font-semibold truncate">{t("userGreeting.welcome")}</div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/auth')}
            className="h-8 text-xs sm:h-auto sm:text-sm px-2 sm:px-3"
          >
            {t("userGreeting.signIn")}
          </Button>
          <HelpCenter variant="outline" size="sm" className="h-8 w-8 sm:h-auto sm:w-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between w-full gap-2 sm:gap-4 min-w-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <SidebarTrigger className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 flex-shrink-0">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
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
              <span>{t("userGreeting.profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={isLoading}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoading ? t("userGreeting.signingOut") : t("userGreeting.signOut")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-xs sm:text-sm lg:text-base text-muted-foreground truncate min-w-0">
          {t("userGreeting.hello", { name: getUserDisplayName(userEmail) })}
        </span>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <HelpCenter variant="outline" size="sm" className="h-8 w-8 sm:h-auto sm:w-auto" />
      </div>
    </div>
  )
}
