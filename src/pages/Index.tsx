
import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"

export default function Index() {
  const [activeView, setActiveView] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1 min-h-screen">
          <MainContent activeView={activeView} setActiveView={setActiveView} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
