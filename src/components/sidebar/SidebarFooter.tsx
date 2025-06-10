
import { Button } from "@/components/ui/button"
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LogOut } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function SidebarFooter() {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error)
        toast.error('Error signing out')
      } else {
        toast.success('Logged out successfully')
        window.location.href = '/auth'
      }
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Error signing out')
    }
  }

  return (
    <UISidebarFooter className="p-4 border-t">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
          <LanguageSelector />
        </div>
        <ThemeToggle />
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </UISidebarFooter>
  )
}
