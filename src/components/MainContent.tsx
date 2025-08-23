
import React from 'react'
import { ImprovedDashboard } from './ImprovedDashboard'
import { CareersPage } from './CareersPage'
import { AnalyticsPage } from './analytics/AnalyticsPage'
import { CustomersPage } from './customers/CustomersPage'
import { ProjectsPage } from './projects/ProjectsPage'
import { ProjectTimelinePage } from './projects/ProjectTimelinePage'
import { GrowthPage } from './growth/GrowthPage'
import { AutomationsPage } from './automations/AutomationsPage'
import { PipelinePage } from './pipeline/PipelinePage'
import { SmartSchedulePage } from './schedule/SmartSchedulePage'
import { FinancePage } from './finance/FinancePage'
import { FeatherBudgetPage } from './finance/FeatherBudgetPage'
import { FeatherTaxPage } from './finance/FeatherTaxPage'
import { EasyCalcPage } from './finance/EasyCalcPage'
import { ReceiptsPage } from './finance/ReceiptsPage'
import { AccountingPage } from './finance/AccountingPage'
import { QuotesPage } from './finance/QuotesPage'
import { CarRentalPage } from './CarRentalPage'
import { WorkOrdersPage } from './work-orders/WorkOrdersPage'
import { MatTrackPage } from './operations/MatTrackPage'
import { CrewControlPage } from './operations/CrewControlPage'
import { EarnSyncPage } from './operations/EarnSyncPage'
import { AfterCarePage } from './operations/AfterCarePage'
import { FeatherFormsPage } from './forms/FeatherFormsPage'
import { SalesOrdersPage } from './sales/SalesOrdersPage'
import { BusinessProposalsPage } from './proposals/BusinessProposalsPage'
import { BidsPage } from './bids/BidsPage'
import { ContractsPage } from './contracts/ContractsPage'
import { MeetingsPage } from './meetings/MeetingsPage'
import { TodoListPage } from './productivity/TodoListPage'
import { NotesPage } from './productivity/NotesPage'
import { AppointmentsPage } from './appointments/AppointmentsPage'
import { MessagesPage } from './communication/MessagesPage'
import { EmailCenterPage } from './communication/EmailCenterPage'
import { SettingsPage } from './settings/SettingsPage'
import { AdminPanelPage } from './admin/AdminPanelPage'

interface MainContentProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function MainContent({ activeView, setActiveView }: MainContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <ImprovedDashboard onNavigate={setActiveView} />
      case 'careers':
        return <CareersPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'customers':
        return <CustomersPage />
      case 'projects':
        return <ProjectsPage />
      case 'project-timeline':
        return <ProjectTimelinePage />
      case 'growth':
        return <GrowthPage />
      case 'automations':
        return <AutomationsPage />
      case 'pipeline':
        return <PipelinePage />
      case 'smart-schedule':
        return <SmartSchedulePage />
      case 'finance':
        return <FinancePage />
      case 'feather-budget':
        return <FeatherBudgetPage />
      case 'feather-tax':
        return <FeatherTaxPage />
      case 'easy-calc':
        return <EasyCalcPage />
      case 'receipts':
        return <ReceiptsPage />
      case 'accounting':
        return <AccountingPage />
      case 'quotes':
        return <QuotesPage />
      case 'car-rental':
        return <CarRentalPage />
      case 'work-orders':
        return <WorkOrdersPage />
      case 'mat-track':
        return <MatTrackPage />
      case 'crew-control':
        return <CrewControlPage />
      case 'earnsync':
        return <EarnSyncPage />
      case 'aftercare':
        return <AfterCarePage />
      case 'feather-forms':
        return <FeatherFormsPage />
      case 'sales-orders':
        return <SalesOrdersPage />
      case 'business-proposals':
        return <BusinessProposalsPage />
      case 'bids':
        return <BidsPage />
      case 'contracts':
        return <ContractsPage />
      case 'meetings':
        return <MeetingsPage />
      case 'todo-list':
        return <TodoListPage />
      case 'notes':
        return <NotesPage />
      case 'appointments':
        return <AppointmentsPage />
      case 'messages':
        return <MessagesPage />
      case 'email-center':
        return <EmailCenterPage />
      case 'settings':
        return <SettingsPage />
      case 'admin-panel':
        return <AdminPanelPage />
      default:
        return <ImprovedDashboard onNavigate={setActiveView} />
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-background">
      {renderContent()}
    </div>
  )
}
