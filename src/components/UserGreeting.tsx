
import { Button } from "@/components/ui/button"
import { useAuthState } from "@/hooks/useAuthState"
import { useAuthLogic } from "@/hooks/useAuthLogic"
import { LogOut, User } from "lucide-react"
import { PremiumStatus } from "./PremiumStatus"

export function UserGreeting() {
  const { user } = useAuthState()
  const { signOut } = useAuthLogic()

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <PremiumStatus />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">
            Olá, {user.email?.split('@')[0]}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </div>
  )
}
