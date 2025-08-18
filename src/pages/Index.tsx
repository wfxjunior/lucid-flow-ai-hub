
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
      <div className="flex h-screen w-full">
        <AppSidebar setActiveView={setActiveView} activeView={activeView} />
        <main className="flex-1 overflow-auto">
          <MainContent activeView={activeView} onNavigate={handleNavigate} />
        </main>
      </div>
    </SidebarProvider>
  )
}
