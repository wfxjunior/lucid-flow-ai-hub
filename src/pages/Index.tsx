import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { DocumentTracker } from "@/components/DocumentTracker"
import { CarRentalPage } from "@/components/CarRentalPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { UserGreeting } from "@/components/UserGreeting"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { EstimatesPage } from "@/components/EstimatesPage"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { QuotesPage } from "@/components/QuotesPage"
import { ContractsPage } from "@/components/ContractsPage"
import { AccountingPage } from "@/components/AccountingPage"
import { CustomerManagement } from "@/components/CustomerManagement"
import { ProjectsPage } from "@/components/ProjectsPage"
import { PipelineBoard } from "@/components/PipelineBoard"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { MatTrackPage } from "@/components/MatTrackPage"
import { CrewControlPage } from "@/components/CrewControlPage"
import { AppointmentsPage } from "@/components/AppointmentsPage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { ESignaturesPage } from "@/components/ESignaturesPage"
import { AIVoice } from "@/components/AIVoice"
import { Analytics } from "@/components/Analytics"
import { PaymentsPage } from "@/components/PaymentsPage"
import { SalesOrdersPage } from "@/components/SalesOrdersPage"
import { ServiceOrdersPage } from "@/components/ServiceOrdersPage"
import { BusinessProposalsPage } from "@/components/BusinessProposalsPage"
import { BidsPage } from "@/components/BidsPage"
import { MessagesPage } from "@/components/MessagesPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { AfterCarePage } from "@/components/AfterCarePage"
import Feedback from "@/pages/Feedback"

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view: string) => {
    console.log('Navigation requested:', view)
    setActiveView(view)
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={handleNavigate} />
      case "estimates":
        return <EstimatesPage />
      case "invoice-creator":
        return <InvoiceCreator />
      case "quotes":
        return <QuotesPage />
      case "contracts":
        return <ContractsPage />
      case "accounting":
        return <AccountingPage />
      case "customer-management":
        return <CustomerManagement />
      case "projects":
        return <ProjectsPage />
      case "pipeline":
        return <PipelineBoard />
      case "aftercare":
        return <AfterCarePage />
      case "smartschedule":
        return <SmartSchedulePage />
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
      case "appointments":
        return <AppointmentsPage />
      case "meetings":
        return <MeetingsPage />
      case "e-signatures":
        return <ESignaturesPage />
      case "todo-list":
        return <TodoListPage />
      case "notes":
        return <NotesPage />
      case "ai-voice":
        return <AIVoice />
      case "analytics":
        return <Analytics />
      case "payments":
        return <PaymentsPage />
      case "sales-orders":
        return <SalesOrdersPage />
      case "service-orders":
        return <ServiceOrdersPage />
      case "business-proposals":
        return <BusinessProposalsPage />
      case "bids":
        return <BidsPage />
      case "messages":
        return <MessagesPage />
      case "documents":
        return <DocumentTracker />
      case "features":
        return <FeaturesPage />
      case "feedback":
        return <Feedback />
      default:
        return <ImprovedDashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
          <SidebarInset className="flex-1">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-2xl font-bold text-blue-600">FeatherBiz</h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <UserGreeting />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Index
