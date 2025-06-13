
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserGreeting } from "@/components/UserGreeting"
import { QuickActions } from "@/components/QuickActions"
import { RecentActivity } from "@/components/RecentActivity"
import { StatsCard } from "@/components/StatsCard"
import { CreateInvoice } from "@/components/CreateInvoice"
import { CustomerManagement } from "@/components/CustomerManagement"
import { ProjectsPage } from "@/components/ProjectsPage"
import { PipelineBoard } from "@/components/PipelineBoard"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { EstimatesPage } from "@/components/EstimatesPage"
import { QuotesPage } from "@/components/QuotesPage"
import { AccountingPage } from "@/components/AccountingPage"
import { SalesOrdersPage } from "@/components/SalesOrdersPage"
import { BusinessProposalsPage } from "@/components/BusinessProposalsPage"
import { BidsPage } from "@/components/BidsPage"
import { ContractsPage } from "@/components/ContractsPage"
import { CarRentalPage } from "@/components/CarRentalPage"
import { MatTrackPage } from "@/components/MatTrackPage"
import { CrewControlPage } from "@/components/CrewControlPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { AfterCarePage } from "@/components/AfterCarePage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { MessagesPage } from "@/components/MessagesPage"
import { ResponsiveSmartSchedulePage } from "@/components/ResponsiveSmartSchedulePage"
import { ResponsiveAppointmentsPage } from "@/components/ResponsiveAppointmentsPage"
import { ResponsivePaymentsPage } from "@/components/ResponsivePaymentsPage"
import { ProjectTimelinePage } from "@/components/ProjectTimelinePage"
import { Analytics } from "@/components/Analytics"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { IntegrationsHub } from "@/components/IntegrationsHub"
import { DocumentTracker } from "@/components/DocumentTracker"
import { FileManager } from "@/components/FileManager"
import { SettingsPage } from "@/components/SettingsPage"
import { AIVoice } from "@/components/AIVoice"
import { ESignaturesPage } from "@/components/ESignaturesPage"
import { FeatherFormsPage } from "@/components/FeatherFormsPage"
import { FeatherBudgetPage } from "@/components/feather-budget/FeatherBudgetPage"
import { FeatherTaxPage } from "@/components/FeatherTaxPage"
import { EasyCalcPage } from "@/components/EasyCalcPage"
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react"

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard")

  console.log('Index component rendering with activeView:', activeView)

  const renderActiveView = () => {
    console.log('Rendering view:', activeView)
    
    switch (activeView) {
      case "ai-voice":
        return <AIVoice />
      case "invoice-creator":
        return <CreateInvoice />
      case "e-signatures":
        return <ESignaturesPage />
      case "feather-forms":
        return <FeatherFormsPage />
      case "feather-budget":
        return <FeatherBudgetPage />
      case "feather-tax":
        return <FeatherTaxPage />
      case "easy-calc":
        console.log('Rendering EasyCalc component')
        return <EasyCalcPage />
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
      case "work-orders":
        return <WorkOrdersPage />
      case "mat-track":
        return <MatTrackPage />
      case "crew-control":
        return <CrewControlPage />
      case "earnsync":
        return <EarnSyncPage />
      case "aftercare":
        return <AfterCarePage />
      case "meetings":
        return <MeetingsPage />
      case "todo-list":
        return <TodoListPage />
      case "notes":
        return <NotesPage />
      case "quotes":
        return <QuotesPage />
      case "estimates":
        return <EstimatesPage />
      case "accounting":
        return <AccountingPage />
      case "sales-orders":
        return <SalesOrdersPage />
      case "business-proposals":
        return <BusinessProposalsPage />
      case "bids":
        return <BidsPage />
      case "contracts":
        return <ContractsPage />
      case "messages":
        return <MessagesPage />
      case "schedule":
        return <ResponsiveSmartSchedulePage />
      case "appointments":
        return <ResponsiveAppointmentsPage />
      case "payments":
        return <ResponsivePaymentsPage />
      case "analytics":
        return <Analytics />
      case "analytics-dashboard":
        return <AnalyticsDashboard />
      case "integrations":
        return <IntegrationsHub />
      case "document-tracker":
        return <DocumentTracker />
      case "file-manager":
        return <FileManager />
      case "settings":
        return <SettingsPage />
      default:
        return (
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <UserGreeting />
              <SidebarTrigger />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Customers"
                value="1,234"
                icon={Users}
                change="+12% from last month"
                trend="up"
              />
              <StatsCard
                title="Active Projects"
                value="12"
                icon={FileText}
                change="+5% from last month"
                trend="up"
              />
              <StatsCard
                title="Monthly Revenue"
                value="$12,345"
                icon={DollarSign}
                change="+19% from last month"
                trend="up"
              />
              <StatsCard
                title="Conversion Rate"
                value="87%"
                icon={TrendingUp}
                change="+3% from last month"
                trend="up"
              />
            </div>
            
            <QuickActions onActionClick={setActiveView} />
            <RecentActivity />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider>
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1">
          {renderActiveView()}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Index
