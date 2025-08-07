
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useAuthState } from "@/hooks/useAuthState"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { UserGreeting } from "@/components/UserGreeting"
import { FeatherBot } from "@/components/FeatherBot"
import { useFeatherBotAccess } from "@/hooks/useFeatherBotAccess"
import { useIsMobile } from "@/hooks/use-mobile"
import { supabase } from "@/integrations/supabase/client"

export default function Index() {
  const { user, loading } = useAuthState()
  const { hasAccess } = useFeatherBotAccess()
  const isMobile = useIsMobile()
  const [activeView, setActiveView] = useState("dashboard")

  // Handle URL parameters for navigation (e.g., from Stripe redirects)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const view = urlParams.get('view')
    if (view) {
      console.log('Index: URL parameter detected, setting view to:', view)
      setActiveView(view)
      // Clean up the URL
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Handle voice navigation events
  useEffect(() => {
    const handleVoiceNavigation = (event: CustomEvent) => {
      const { view } = event.detail
      console.log('Index: Voice navigation detected, setting view to:', view)
      setActiveView(view)
    }

    window.addEventListener('voice-navigation', handleVoiceNavigation as EventListener)
    
    return () => {
      window.removeEventListener('voice-navigation', handleVoiceNavigation as EventListener)
    }
  }, [])

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
        
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header - Always visible */}
          <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-12 sm:h-14 lg:h-16 items-center px-2 sm:px-4 gap-2">
              <SidebarTrigger className="md:hidden" />
              {isMobile && (
                <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
                  {activeView === 'dashboard' ? 'Dashboard' : 
                   activeView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h1>
              )}
              <div className="flex-1">
                <UserGreeting onNavigate={setActiveView} />
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            {activeView === "dashboard" ? (
              <div className="p-2 sm:p-4 lg:p-6">
                <ImprovedDashboard onNavigate={setActiveView} />
              </div>
            ) : (
              <div className="min-h-full">
                <MainContent activeView={activeView} onNavigate={setActiveView} />
              </div>
            )}
          </div>
        </main>

        {/* ✅ ACTIVE CHATBOT: Black FeatherBot - Only visible for Pro users or users with featherGoldAccess */}
        <FeatherBot isVisible={hasAccess} />
      </div>
    </SidebarProvider>
  )
}
