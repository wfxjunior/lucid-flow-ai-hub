
import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"

export default function Index() {
  const [activeView, setActiveView] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1 min-h-screen overflow-hidden">
          <div className="flex h-full flex-col">
            {/* Mobile header with sidebar trigger */}
            <div className="flex h-12 items-center px-4 border-b md:hidden">
              <SidebarTrigger className="h-6 w-6" />
              <span className="ml-2 font-semibold text-foreground">FeatherBiz</span>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 overflow-auto">
              <MainContent activeView={activeView} setActiveView={setActiveView} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
