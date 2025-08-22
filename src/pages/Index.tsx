
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Index() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar setActiveView={setActiveView} activeView={activeView} />
        <SidebarInset className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <MainContent activeView={activeView} onNavigate={handleNavigate} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
