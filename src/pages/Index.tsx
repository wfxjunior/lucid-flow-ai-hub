
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
        <div className="grid w-full min-h-screen max-w-none lg:grid-cols-[var(--sidebar-w)_1fr] lg:gap-[var(--shell-gap)] xl:gap-[var(--shell-gap)]">
          <AppSidebar setActiveView={setActiveView} activeView={activeView} />
          <main className="min-w-0 bg-background overflow-hidden lg:pr-0" 
                style={{ maxWidth: 'var(--content-max)', width: '100%', marginInline: 'auto', paddingInline: 'var(--content-px)' }}>
            <div className="h-screen overflow-y-auto">
              <MainContent activeView={activeView} onNavigate={handleNavigate} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
