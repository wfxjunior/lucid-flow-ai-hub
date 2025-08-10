
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useAuthState } from "@/hooks/useAuthState"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { UserGreeting } from "@/components/UserGreeting"
import { FeatherBot } from "@/components/FeatherBot"
import { useFeatherBotAccess } from "@/hooks/useFeatherBotAccess"
import { useIsMobile } from "@/hooks/use-mobile"
import { supabase } from "@/integrations/supabase/client"
import { initFeatherBotClientAPI } from "@/features/featherbot/clientApi"
import { TourProvider } from "@/features/featherbot/TourProvider"

export default function Index() {
  const { user, loading } = useAuthState()
  const { hasAccess } = useFeatherBotAccess()
  const [activeView, setActiveView] = useState("dashboard")

  // Init FeatherBot client API once
  useEffect(() => {
    initFeatherBotClientAPI()
  }, [])

  // Handle URL parameters for navigation (e.g., from Stripe redirects) with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleUrlNavigation = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const view = urlParams.get('view');
      if (view) {
        console.log('Index: URL parameter detected, setting view to:', view);
        
        // Debounce to prevent rapid navigation changes
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setActiveView(view);
          // Clean up the URL
          window.history.replaceState({}, '', window.location.pathname);
        }, 200);
      }
    };

    handleUrlNavigation();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Global hotkey: Shift + ? to explain current section
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isShiftQuestion = e.shiftKey && (e.key === '?' || (e.key === '/' && e.shiftKey));
      if (isShiftQuestion) {
        const detail = {
          prompt: 'What is this?',
          source: 'hotkey-shift-question'
        };
        window.dispatchEvent(new CustomEvent('featherbot:explain', { detail }));
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Handle voice navigation events with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleVoiceNavigation = (event: CustomEvent) => {
      const { view } = event.detail;
      console.log('Index: Voice navigation detected, setting view to:', view);
      
      // Debounce navigation to prevent rapid changes
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setActiveView(view);
      }, 100);
    };

    window.addEventListener('voice-navigation', handleVoiceNavigation as EventListener);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('voice-navigation', handleVoiceNavigation as EventListener);
    };
  }, []);

  const handleMenuClick = useCallback((view: string) => {
    console.log('Index: Menu clicked, setting view to:', view);
    if (view !== activeView) {
      setActiveView(view);
    }
  }, [activeView]);

  const handleActionClick = useCallback((actionId: string) => {
    console.log('Index: Action clicked:', actionId);
    if (actionId !== activeView) {
      setActiveView(actionId);
    }
  }, [activeView]);

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
      <div className="min-h-screen flex w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1">
          {/* Header - Mobile responsive */}
          <header className="flex h-12 sm:h-16 shrink-0 items-center gap-2 border-b px-2 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              {/* Quick action: Explain this */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const detail = {
                    prompt: 'Explain this page',
                    source: 'header-quick-action'
                  }
                  window.dispatchEvent(new CustomEvent('featherbot:explain', { detail }))
                }}
              >
                Explain this
              </Button>
              <UserGreeting onNavigate={setActiveView} />
            </div>
          </header>

          {/* Main content area - Mobile responsive */}
          <div className="flex flex-1 flex-col gap-2 sm:gap-4 p-2 sm:p-4">
            {activeView === "dashboard" ? (
              <ImprovedDashboard onNavigate={setActiveView} />
            ) : (
              <MainContent activeView={activeView} onNavigate={setActiveView} />
            )}
          </div>

          {/* ✅ ACTIVE CHATBOT: Mobile responsive positioning */}
          <FeatherBot isVisible={hasAccess} />
          {/* Guided Tours Overlay */}
          <TourProvider />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
