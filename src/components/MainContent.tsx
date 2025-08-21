
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
import { AIVoiceView } from '@/components/views/AIVoiceView'
import {
  AnalyticsView,
  AdminPanelView,
  CareersView,
  ReferralsView,
  FeaturesView,
  FAQHelpView,
  FeedbackView,
  PricingView,
  ESignaturesView,
  ProjectTimelineView,
  PipelineView,
  SmartScheduleView,
  FeatherBudgetView,
  FeatherTaxView,
  EasyCalcView,
  ReceiptsView,
  AccountingView,
  QuotesView,
  CarRentalView,
  MatTrackView,
  CrewControlView,
  EarnSyncView,
  AfterCareView,
  FeatherFormsView,
  SalesOrdersView,
  BusinessProposalsView,
  BidsView,
  TodoListView,
  NotesView,
  ToursView,
  FinanceView,
  GrowthView,
  AutomationsView
} from '@/components/views/AllOtherViews'

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
