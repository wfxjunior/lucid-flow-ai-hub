
import React from 'react'
import { DashboardView } from '@/components/views/DashboardView'
import { AllOtherViews } from '@/components/views/AllOtherViews'

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  console.log('MainContent rendering with activeView:', activeView)

  if (activeView === "dashboard") {
    return <DashboardView />
  }

  return <AllOtherViews activeView={activeView} onNavigate={onNavigate} />
}
