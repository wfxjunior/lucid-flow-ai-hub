
import React from 'react'
import { DashboardView } from './dashboard/DashboardView'
import { CareersView } from './views/CareersView'
import { CustomersView } from './views/CustomersView'
import { ProjectsView } from './views/ProjectsView'
import { FinanceView } from './views/FinanceView'

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={onNavigate} />
      case 'careers':
        return <CareersView />
      case 'customers':
        return <CustomersView />
      case 'projects':
        return <ProjectsView />
      case 'finance':
        return <FinanceView />
      default:
        return <DashboardView onNavigate={onNavigate} />
    }
  }

  return (
    <div className="stripe-layout-content p-6">
      {renderView()}
    </div>
  )
}
