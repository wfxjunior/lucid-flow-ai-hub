
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"

export default function Index() {
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    console.log('Index: Navigating to', view)
    setActiveView(view)
  }

  return (
    <SidebarProvider>
      <div className="w-full h-screen bg-background flex">
        <AppSidebar setActiveView={setActiveView} activeView={activeView} />
        <main className="flex-1 h-full overflow-hidden fb-sidebar-content-gap">
          <MainContent activeView={activeView} onNavigate={handleNavigate} />
        </main>
      </div>
    </SidebarProvider>
  )
}
