
import { useState } from "react"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { SmartSchedulePage } from "@/components/SmartSchedulePage"
import { CustomerManagement } from "@/components/CustomerManagement"
import { ProjectsPage } from "@/components/ProjectsPage"
import { ProjectTimelinePage } from "@/components/ProjectTimelinePage"
import { PipelineBoard } from "@/components/PipelineBoard"
import { CarRentalPage } from "@/components/CarRentalPage"
import { MatTrackPage } from "@/components/MatTrackPage"
import { CrewControlPage } from "@/components/CrewControlPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { AfterCarePage } from "@/components/AfterCarePage"
import { FeatherFormsPage } from "@/components/FeatherFormsPage"
import { FeatherBudgetPage } from "@/components/FeatherBudgetPage"
import { FeatherTaxPage } from "@/components/FeatherTaxPage"
import { EasyCalcPage } from "@/components/EasyCalcPage"
import { AccountingPage } from "@/components/AccountingPage"
import { QuotesPage } from "@/components/QuotesPage"
import { EstimatesPage } from "@/components/EstimatesPage"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { SalesOrdersPage } from "@/components/SalesOrdersPage"
import { BusinessProposalsPage } from "@/components/BusinessProposalsPage"
import { BidsPage } from "@/components/BidsPage"
import { ContractsPage } from "@/components/ContractsPage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { AppointmentsPage } from "@/components/AppointmentsPage"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { PaymentsPage } from "@/components/PaymentsPage"
import { ESignaturesPage } from "@/components/ESignaturesPage"
import { AIVoiceAssistant } from "@/components/AIVoiceAssistant"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { EmailCenterPage } from "@/components/EmailCenterPage"
import { MessagesPage } from "@/components/MessagesPage"
import { IntegrationsHub } from "@/components/IntegrationsHub"
import { FAQPage } from "@/components/FAQPage"
import { SettingsPage } from "@/components/SettingsPage"
import { PricingPlans } from "@/components/PricingPlans"
import { ReferralsPage } from "@/components/ReferralsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { FeedbackPage } from "@/components/FeedbackPage"

interface MainContentProps {
  activeView: string
  onNavigate?: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const handleNavigate = (view: string) => {
    console.log('MainContent: Navigating to:', view)
    if (onNavigate) {
      onNavigate(view)
    }
  }

  const renderView = () => {
    console.log('MainContent: Rendering view:', activeView)
    
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={handleNavigate} />
      case "smart-schedule":
        return <SmartSchedulePage />
      case "customer-management":
        return <CustomerManagement />
      case "projects":
        return <ProjectsPage />
      case "project-timeline":
        return <ProjectTimelinePage />
      case "pipeline":
        return <PipelineBoard />
      case "car-rental":
        return <CarRentalPage />
      case "mat-track":
        return <MatTrackPage />
      case "crew-control":
        return <CrewControlPage />
      case "earnsync":
        return <EarnSyncPage />
      case "aftercare":
        return <AfterCarePage />
      case "feather-forms":
        return <FeatherFormsPage />
      case "feather-budget":
        return <FeatherBudgetPage />
      case "feather-tax":
        return <FeatherTaxPage />
      case "easy-calc":
        return <EasyCalcPage />
      case "accounting":
        return <AccountingPage />
      case "quotes":
        return <QuotesPage />
      case "estimates":
        return <EstimatesPage />
      case "work-orders":
        return <WorkOrdersPage />
      case "sales-orders":
        return <SalesOrdersPage />
      case "business-proposals":
        return <BusinessProposalsPage />
      case "bids":
        return <BidsPage />
      case "contracts":
        return <ContractsPage />
      case "meetings":
        return <MeetingsPage />
      case "todo-list":
        return <TodoListPage />
      case "notes":
        return <NotesPage />
      case "appointments":
        return <AppointmentsPage />
      case "invoice-creator":
        return <InvoiceCreator />
      case "payments":
        return <PaymentsPage />
      case "e-signatures":
        return <ESignaturesPage />
      case "ai-voice":
        return <AIVoiceAssistant />
      case "analytics":
        return <AnalyticsDashboard />
      case "email-center":
        return <EmailCenterPage />
      case "messages":
        return <MessagesPage />
      case "integrations":
        return <IntegrationsHub />
      case "faq-help":
        return <FAQPage />
      case "settings":
        return <SettingsPage />
      case "pricing":
        return <PricingPlans />
      case "referrals":
        return <ReferralsPage />
      case "features":
        return <FeaturesPage />
      case "feedback":
        return <FeedbackPage />
      default:
        console.log('MainContent: Unknown view, rendering dashboard')
        return <ImprovedDashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      {renderView()}
    </div>
  )
}
