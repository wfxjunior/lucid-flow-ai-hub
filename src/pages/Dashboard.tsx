
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState("overview")

  const handleNavigate = (view: string) => {
    setActiveView(view)
    console.log('Dashboard: Navigating to view:', view)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-white">
        <AppSidebar setActiveView={setActiveView} activeView={activeView} />
        <SidebarInset className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <DashboardContent activeView={activeView} onNavigate={handleNavigate} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
