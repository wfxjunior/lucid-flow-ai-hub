
import React from 'react'
import { UserGreeting } from '@/components/UserGreeting'
import { DashboardView } from '@/components/views/DashboardView'
import { CustomersView } from '@/components/views/CustomersView'
import { InvoicesView } from '@/components/views/InvoicesView'
import { AppointmentsView } from '@/components/views/AppointmentsView'
import { ProjectsView } from '@/components/views/ProjectsView'
import { WorkOrdersView } from '@/components/views/WorkOrdersView'
import { EstimatesView } from '@/components/views/EstimatesView'
import { PaymentsView } from '@/components/views/PaymentsView'
import { ContractsView } from '@/components/views/ContractsView'
import { DocumentsView } from '@/components/views/DocumentsView'
import { MeetingsView } from '@/components/views/MeetingsView'
import { SettingsView } from '@/components/views/SettingsView'
import { MessagesView } from '@/components/views/MessagesView'
import { EmailCenterView } from '@/components/views/EmailCenterView'
import { AnalyticsView } from '@/components/views/AnalyticsView'
import { AdminPanelView } from '@/components/views/AdminPanelView'
import { CareersView } from '@/components/views/CareersView'
import { ReferralsView } from '@/components/views/ReferralsView'
import { FeaturesView } from '@/components/views/FeaturesView'
import { FAQHelpView } from '@/components/views/FAQHelpView'
import { FeedbackView } from '@/components/views/FeedbackView'
import { PricingView } from '@/components/views/PricingView'
import { AIVoiceView } from '@/components/views/AIVoiceView'
import { ESignaturesView } from '@/components/views/ESignaturesView'
import { ProjectTimelineView } from '@/components/views/ProjectTimelineView'
import { PipelineView } from '@/components/views/PipelineView'
import { SmartScheduleView } from '@/components/views/SmartScheduleView'
import { FeatherBudgetView } from '@/components/views/FeatherBudgetView'
import { FeatherTaxView } from '@/components/views/FeatherTaxView'
import { EasyCalcView } from '@/components/views/EasyCalcView'
import { ReceiptsView } from '@/components/views/ReceiptsView'
import { AccountingView } from '@/components/views/AccountingView'
import { QuotesView } from '@/components/views/QuotesView'
import { CarRentalView } from '@/components/views/CarRentalView'
import { MatTrackView } from '@/components/views/MatTrackView'
import { CrewControlView } from '@/components/views/CrewControlView'
import { EarnSyncView } from '@/components/views/EarnSyncView'
import { AfterCareView } from '@/components/views/AfterCareView'
import { FeatherFormsView } from '@/components/views/FeatherFormsView'
import { SalesOrdersView } from '@/components/views/SalesOrdersView'
import { BusinessProposalsView } from '@/components/views/BusinessProposalsView'
import { BidsView } from '@/components/views/BidsView'
import { TodoListView } from '@/components/views/TodoListView'
import { NotesView } from '@/components/views/NotesView'
import { ToursView } from '@/components/views/ToursView'
import { FinanceView } from '@/components/views/FinanceView'
import { GrowthView } from '@/components/views/GrowthView'
import { AutomationsView } from '@/components/views/AutomationsView'

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />
      case 'ai-voice':
        return <AIVoiceView />
      case 'customers':
        return <CustomersView />
      case 'projects':
        return <ProjectsView />
      case 'project-timeline':
        return <ProjectTimelineView />
      case 'pipeline':
        return <PipelineView />
      case 'smart-schedule':
        return <SmartScheduleView />
      case 'invoices':
        return <InvoicesView />
      case 'estimates':
        return <EstimatesView />
      case 'payments':
        return <PaymentsView />
      case 'e-signatures':
        return <ESignaturesView />
      case 'feather-budget':
        return <FeatherBudgetView />
      case 'feather-tax':
        return <FeatherTaxView />
      case 'easy-calc':
        return <EasyCalcView />
      case 'receipts':
        return <ReceiptsView />
      case 'accounting':
        return <AccountingView />
      case 'quotes':
        return <QuotesView />
      case 'car-rental':
        return <CarRentalView />
      case 'work-orders':
        return <WorkOrdersView />
      case 'mat-track':
        return <MatTrackView />
      case 'crew-control':
        return <CrewControlView />
      case 'earnsync':
        return <EarnSyncView />
      case 'aftercare':
        return <AfterCareView />
      case 'feather-forms':
        return <FeatherFormsView />
      case 'sales-orders':
        return <SalesOrdersView />
      case 'business-proposals':
        return <BusinessProposalsView />
      case 'bids':
        return <BidsView />
      case 'contracts':
        return <ContractsView />
      case 'meetings':
        return <MeetingsView />
      case 'todo-list':
        return <TodoListView />
      case 'notes':
        return <NotesView />
      case 'appointments':
        return <AppointmentsView />
      case 'messages':
        return <MessagesView />
      case 'email-center':
        return <EmailCenterView />
      case 'tours':
        return <ToursView />
      case 'finance':
        return <FinanceView />
      case 'growth':
        return <GrowthView />
      case 'automations':
        return <AutomationsView />
      case 'analytics':
        return <AnalyticsView />
      case 'admin-panel':
        return <AdminPanelView />
      case 'careers':
        return <CareersView />
      case 'referrals':
        return <ReferralsView />
      case 'features':
        return <FeaturesView />
      case 'faq-help':
        return <FAQHelpView />
      case 'feedback':
        return <FeedbackView />
      case 'pricing':
        return <PricingView />
      case 'settings':
        return <SettingsView />
      case 'esignatures':
        return <DocumentsView />
      case 'esignature-templates':
        return <DocumentsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <UserGreeting onNavigate={onNavigate} />
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          {renderView()}
        </div>
      </div>
    </div>
  )
}
