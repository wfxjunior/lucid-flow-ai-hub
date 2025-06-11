
import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
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
import { SmartSchedulePage } from "@/components/SmartSchedulePage"
import { ReferralsPage } from "@/components/ReferralsPage"
import { IntegrationsHub } from "@/components/IntegrationsHub"
import { FeaturesPage } from "@/components/FeaturesPage"
import { AfterCarePage } from "@/components/AfterCarePage"
import { FeatherFormsPage } from "@/components/FeatherFormsPage"
import { CarRentalPage } from "@/components/CarRentalPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { TodoListPage } from "@/components/TodoListPage"
import { NotesPage } from "@/components/NotesPage"
import { DocumentTracker } from "@/components/DocumentTracker"
import { AuthGuard } from "@/components/AuthGuard"

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard")

  // Debug logs para rastrear mudanças de estado
  useEffect(() => {
    console.log('Dashboard activeView changed to:', activeView)
  }, [activeView])

  const handleNavigate = (view: string) => {
    console.log('Navigation requested:', view)
    if (view && typeof view === 'string') {
      setActiveView(view)
    } else {
      console.warn('Invalid navigation view:', view)
      setActiveView("dashboard")
    }
  }

  const renderContent = () => {
    console.log('Rendering content for view:', activeView)
    
    try {
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
        case "feather-forms":
          return <FeatherFormsPage />
        case "projects":
          return <ProjectsPage />
        case "pipeline":
          return <PipelineBoard />
        case "referrals":
          return <ReferralsPage />
        case "integrations":
          return <IntegrationsHub />
        case "features":
          return <FeaturesPage />
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
        case "appointments":
          return <AppointmentsPage />
        case "smart-schedule":
          return <SmartSchedulePage />
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
        default:
          console.warn('Unknown view, defaulting to dashboard:', activeView)
          return <ImprovedDashboard onNavigate={handleNavigate} />
      }
    } catch (error) {
      console.error('Error rendering content for view:', activeView, error)
      return <ImprovedDashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar activeView={activeView} setActiveView={setActiveView} />
            <SidebarInset className="flex-1">
              {/* Header - Improved mobile responsiveness */}
              <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                  <div className="flex justify-between items-center h-14 sm:h-16">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <SidebarTrigger />
                      <div className="flex flex-col">
                        <h1 className="text-lg sm:text-2xl font-bold text-blue-600">FeatherBiz</h1>
                        <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                          Organize. Send. Grow. All-in-one
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <UserGreeting />
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content - Improved mobile padding */}
              <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                  {renderContent()}
                </div>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </AuthGuard>
  )
}

export default Index
