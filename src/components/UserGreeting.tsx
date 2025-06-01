
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

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success("Logged out successfully")
      navigate("/auth")
    } catch (error: any) {
      toast.error("Error logging out")
    }
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

  return (
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
          <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
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
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
