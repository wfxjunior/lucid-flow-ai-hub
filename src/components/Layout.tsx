
import { useState } from "react"
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
  const isPremiumUser = user?.email === 'juniorxavierusa@gmail.com'
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2 flex-1">
              <img 
                src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                alt="FeatherBiz" 
                className="h-8 w-auto object-contain"
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

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <MainContent activeView={activeView} onNavigate={handleNavigate} />
          </main>
        </SidebarInset>
      </div>
      
      <Toaster />
      {import.meta.env.DEV && <DebugAuth />}
    </SidebarProvider>
  )
}
