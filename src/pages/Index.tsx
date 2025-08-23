
import React, { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { CustomerManagement } from "@/components/CustomerManagement"
import { ProjectsPage } from "@/components/ProjectsPage"
import { CareersPage } from "@/components/CareersPage"
import { ProjectTimelinePage } from "@/components/pages/ProjectTimelinePage"
import { GrowthPage } from "@/components/pages/GrowthPage"
import { AutomationsPage } from "@/components/pages/AutomationsPage"
import { PipelineBoard } from "@/components/PipelineBoard"
import { SmartSchedulePage } from "@/components/SmartSchedulePage"
import { FinancePage } from "@/components/pages/FinancePage"
import { FeatherBudgetPage } from "@/components/FeatherBudgetPage"
import { FeatherTaxPage } from "@/components/FeatherTaxPage"
import { EasyCalcPage } from "@/components/EasyCalcPage"
import { ReceiptsPage } from "@/components/ReceiptsPage"
import { AccountingPage } from "@/components/AccountingPage"
import { QuotesPage } from "@/components/QuotesPage"
import { CarRentalPage } from "@/components/CarRentalPage"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { ResponsiveMatTrackPage } from "@/components/ResponsiveMatTrackPage"
import { CrewControlPage } from "@/components/CrewControlPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { AfterCarePage } from "@/components/AfterCarePage"
import { FeatherFormsPage } from "@/components/FeatherFormsPage"
import { SalesOrdersPage } from "@/components/SalesOrdersPage"
import { BusinessProposalsPage } from "@/components/BusinessProposalsPage"
import { BidsPage } from "@/components/BidsPage"
import { ContractsPage } from "@/components/ContractsPage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { AppointmentsPage } from "@/components/AppointmentsPage"
import { MessagesPage } from "@/components/MessagesPage"
import { EmailCenterPage } from "@/components/EmailCenterPage"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { SettingsPage } from "@/components/SettingsPage"
import { AdminDashboard } from "@/components/AdminDashboard"
import { useSearchParams } from "react-router-dom"
import { TourProvider } from "@/features/featherbot/TourProvider"
import { initFeatherBotClientAPI } from "@/features/featherbot/clientApi"

export default function Index() {
  const [searchParams] = useSearchParams()
  const viewFromUrl = searchParams.get("view") || "dashboard"
  const [activeView, setActiveView] = useState(viewFromUrl)

  useEffect(() => {
    initFeatherBotClientAPI()
  }, [])

  useEffect(() => {
    const newView = searchParams.get("view") || "dashboard"
    setActiveView(newView)
  }, [searchParams])

  const renderPage = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={setActiveView} />
      case "customers":
        return <CustomerManagement />
      case "projects":
        return <ProjectsPage />
      case "careers":
        return <CareersPage />
      case "project-timeline":
        return <ProjectTimelinePage onNavigate={setActiveView} />
      case "growth":
        return <GrowthPage onNavigate={setActiveView} />
      case "automations":
        return <AutomationsPage onNavigate={setActiveView} />
      case "pipeline":
        return <PipelineBoard />
      case "smart-schedule":
        return <SmartSchedulePage />
      case "finance":
        return <FinancePage onNavigate={setActiveView} />
      case "feather-budget":
        return <FeatherBudgetPage />
      case "feather-tax":
        return <FeatherTaxPage />
      case "easy-calc":
        return <EasyCalcPage />
      case "receipts":
        return <ReceiptsPage />
      case "accounting":
        return <AccountingPage />
      case "quotes":
        return <QuotesPage />
      case "car-rental":
        return <CarRentalPage />
      case "work-orders":
        return <WorkOrdersPage />
      case "mat-track":
        return <ResponsiveMatTrackPage onNavigate={setActiveView} />
      case "crew-control":
        return <CrewControlPage />
      case "earnsync":
        return <EarnSyncPage />
      case "aftercare":
        return <AfterCarePage />
      case "feather-forms":
        return <FeatherFormsPage />
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
      case "messages":
        return <MessagesPage />
      case "email-center":
        return <EmailCenterPage />
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return <SettingsPage />
      case "admin-panel":
        return <AdminDashboard />
      default:
        return <ImprovedDashboard onNavigate={setActiveView} />
    }
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
          <main className="flex-1 overflow-hidden">
            {renderPage()}
          </main>
        </div>
      </SidebarProvider>
      <TourProvider />
    </>
  )
}
