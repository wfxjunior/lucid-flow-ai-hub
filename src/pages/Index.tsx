
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from "@/components/AppSidebar"
import { MainContent } from "@/components/MainContent"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Index() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    setActiveView(view)
  }

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen bg-background">
        <div className="flex w-full min-h-screen max-w-none">
          <AppSidebar setActiveView={setActiveView} activeView={activeView} />
          <main className="flex-1 min-w-0 max-w-none bg-background overflow-hidden">
            <div className="h-screen overflow-y-auto">
              <MainContent activeView={activeView} onNavigate={handleNavigate} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
