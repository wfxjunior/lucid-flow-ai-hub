
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MainContent } from "@/components/MainContent"
import { UserGreeting } from "@/components/UserGreeting"
import { DebugAuth } from "@/components/DebugAuth"
import { PremiumStatus } from "@/components/PremiumStatus"
import { useAuthState } from "@/hooks/useAuthState"

export function Layout() {
  const { user } = useAuthState()
  const location = useLocation()
  const isPremiumUser = user?.email === 'juniorxavierusa@gmail.com'
  
  // Determine current view from URL path
  const currentPath = location.pathname.replace('/', '') || 'dashboard'

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background" data-theme="stripe-dashboard">
        <AppSidebar activeView={currentPath} />
        <SidebarInset className="flex-1">
          {/* Header - Only show on dashboard view, other views have their own headers */}
          {currentPath === 'dashboard' && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex items-center gap-2 flex-1">
                <img 
                  src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                  alt="FeatherBiz" 
                  className="h-8 w-8 object-contain"
                />
                <h1 className="text-xl font-bold text-primary">FeatherBiz</h1>
                
                {/* Status Premium para usuário específico */}
                {isPremiumUser && (
                  <div className="ml-4 md:hidden">
                    <PremiumStatus />
                  </div>
                )}
              </div>
              
              <UserGreeting />
            </header>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <MainContent />
          </main>
        </SidebarInset>
      </div>
      
      <Toaster />
      {import.meta.env.DEV && <DebugAuth />}
    </SidebarProvider>
  )
}
