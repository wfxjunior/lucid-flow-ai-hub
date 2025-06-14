
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuthState } from "@/hooks/useAuthState"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { QuickActions } from "@/components/QuickActions"
import { MainContent } from "@/components/MainContent"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { supabase } from "@/integrations/supabase/client"

export default function Index() {
  const { user, loading } = useAuthState()
  const [activeView, setActiveView] = useState("dashboard")

  const handleMenuClick = (view: string) => {
    console.log('Index: Menu clicked, setting view to:', view)
    setActiveView(view)
  }

  const handleActionClick = (actionId: string) => {
    console.log('Index: Action clicked:', actionId)
    setActiveView(actionId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthContainer />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger />
              <div className="ml-auto flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await supabase.auth.signOut()
                    window.location.reload()
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {activeView === "dashboard" ? (
            <div className="flex-1 overflow-auto p-4">
              <ImprovedDashboard onNavigate={setActiveView} />
            </div>
          ) : (
            <MainContent activeView={activeView} onNavigate={setActiveView} />
          )}
        </main>
      </div>
    </SidebarProvider>
  )
}
