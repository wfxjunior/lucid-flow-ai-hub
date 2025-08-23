
import React, { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardPage } from "@/components/pages/DashboardPage"
import { CustomersPage } from "@/components/pages/CustomersPage"
import { ProjectsPage } from "@/components/pages/ProjectsPage"
import { CareersPage } from "@/components/pages/CareersPage"
import { ProjectTimelinePage } from "@/components/pages/ProjectTimelinePage"
import { GrowthPage } from "@/components/pages/GrowthPage"
import { AutomationsPage } from "@/components/pages/AutomationsPage"
import { PipelinePage } from "@/components/pages/PipelinePage"
import { SmartSchedulePage } from "@/components/pages/SmartSchedulePage"
import { FinancePage } from "@/components/pages/FinancePage"
import { FeatherBudgetPage } from "@/components/pages/FeatherBudgetPage"
import { FeatherTaxPage } from "@/components/pages/FeatherTaxPage"
import { EasyCalcPage } from "@/components/pages/EasyCalcPage"
import { ReceiptsPage } from "@/components/pages/ReceiptsPage"
import { AccountingPage } from "@/components/pages/AccountingPage"
import { QuotesPage } from "@/components/pages/QuotesPage"
import { CarRentalPage } from "@/components/pages/CarRentalPage"
import { WorkOrdersPage } from "@/components/pages/WorkOrdersPage"
import { MatTrackPage } from "@/components/pages/MatTrackPage"
import { CrewControlPage } from "@/components/pages/CrewControlPage"
import { EarnSyncPage } from "@/components/pages/EarnSyncPage"
import { AfterCarePage } from "@/components/pages/AfterCarePage"
import { FeatherFormsPage } from "@/components/pages/FeatherFormsPage"
import { SalesOrdersPage } from "@/components/pages/SalesOrdersPage"
import { BusinessProposalsPage } from "@/components/pages/BusinessProposalsPage"
import { BidsPage } from "@/components/pages/BidsPage"
import { ContractsPage } from "@/components/pages/ContractsPage"
import { MeetingsPage } from "@/components/pages/MeetingsPage"
import { TodoListPage } from "@/components/pages/TodoListPage"
import { NotesPage } from "@/components/pages/NotesPage"
import { AppointmentsPage } from "@/components/pages/AppointmentsPage"
import { MessagesPage } from "@/components/pages/MessagesPage"
import { EmailCenterPage } from "@/components/pages/EmailCenterPage"
import { AnalyticsPage } from "@/components/pages/AnalyticsPage"
import { SettingsPage } from "@/components/pages/SettingsPage"
import { AdminPanelPage } from "@/components/pages/AdminPanelPage"
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
        return <DashboardPage onNavigate={setActiveView} />
      case "customers":
        return <CustomersPage onNavigate={setActiveView} />
      case "projects":
        return <ProjectsPage onNavigate={setActiveView} />
      case "careers":
        return <CareersPage onNavigate={setActiveView} />
      case "project-timeline":
        return <ProjectTimelinePage onNavigate={setActiveView} />
      case "growth":
        return <GrowthPage onNavigate={setActiveView} />
      case "automations":
        return <AutomationsPage onNavigate={setActiveView} />
      case "pipeline":
        return <PipelinePage onNavigate={setActiveView} />
      case "smart-schedule":
        return <SmartSchedulePage onNavigate={setActiveView} />
      case "finance":
        return <FinancePage onNavigate={setActiveView} />
      case "feather-budget":
        return <FeatherBudgetPage onNavigate={setActiveView} />
      case "feather-tax":
        return <FeatherTaxPage onNavigate={setActiveView} />
      case "easy-calc":
        return <EasyCalcPage onNavigate={setActiveView} />
      case "receipts":
        return <ReceiptsPage onNavigate={setActiveView} />
      case "accounting":
        return <AccountingPage onNavigate={setActiveView} />
      case "quotes":
        return <QuotesPage onNavigate={setActiveView} />
      case "car-rental":
        return <CarRentalPage onNavigate={setActiveView} />
      case "work-orders":
        return <WorkOrdersPage onNavigate={setActiveView} />
      case "mat-track":
        return <MatTrackPage onNavigate={setActiveView} />
      case "crew-control":
        return <CrewControlPage onNavigate={setActiveView} />
      case "earnsync":
        return <EarnSyncPage onNavigate={setActiveView} />
      case "aftercare":
        return <AfterCarePage onNavigate={setActiveView} />
      case "feather-forms":
        return <FeatherFormsPage onNavigate={setActiveView} />
      case "sales-orders":
        return <SalesOrdersPage onNavigate={setActiveView} />
      case "business-proposals":
        return <BusinessProposalsPage onNavigate={setActiveView} />
      case "bids":
        return <BidsPage onNavigate={setActiveView} />
      case "contracts":
        return <ContractsPage onNavigate={setActiveView} />
      case "meetings":
        return <MeetingsPage onNavigate={setActiveView} />
      case "todo-list":
        return <TodoListPage onNavigate={setActiveView} />
      case "notes":
        return <NotesPage onNavigate={setActiveView} />
      case "appointments":
        return <AppointmentsPage onNavigate={setActiveView} />
      case "messages":
        return <MessagesPage onNavigate={setActiveView} />
      case "email-center":
        return <EmailCenterPage onNavigate={setActiveView} />
      case "analytics":
        return <AnalyticsPage onNavigate={setActiveView} />
      case "settings":
        return <SettingsPage onNavigate={setActiveView} />
      case "admin-panel":
        return <AdminPanelPage onNavigate={setActiveView} />
      default:
        return <DashboardPage onNavigate={setActiveView} />
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
