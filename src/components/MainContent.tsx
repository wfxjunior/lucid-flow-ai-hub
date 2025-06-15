
import { MessagesPage } from "@/components/MessagesPage"
import { EmailSettingsPage } from "@/components/EmailSettingsPage"
import { CareersPage } from "@/components/CareersPage"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { PaymentsPage } from "@/components/PaymentsPage"
import { ESignaturesPage } from "@/components/ESignaturesPage"
import { FeatherBudgetPage } from "@/components/FeatherBudgetPage"
import { SmartSchedulePage } from "@/components/SmartSchedulePage"
import { ResponsiveSmartSchedulePage } from "@/components/ResponsiveSmartSchedulePage"
import { CustomerManagement } from "@/components/CustomerManagement"
import { ProjectsPage } from "@/components/ProjectsPage"
import { ProjectTimelinePage } from "@/components/ProjectTimelinePage"
import { PipelineBoard } from "@/components/PipelineBoard"
import { FeatherTaxPage } from "@/components/FeatherTaxPage"
import { EasyCalcPage } from "@/components/EasyCalcPage"
import { AccountingPage } from "@/components/AccountingPage"
import { QuotesPage } from "@/components/QuotesPage"
import { EstimatesPage } from "@/components/EstimatesPage"
import { CarRentalPage } from "@/components/CarRentalPage"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { MatTrackPage } from "@/components/MatTrackPage"
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
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { ResponsivePaymentsPage } from "@/components/ResponsivePaymentsPage"
import { ReferralsPage } from "@/components/ReferralsPage"

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={onNavigate} />
      case "ai-voice":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">AI Voice Assistant</h1>
          <p>Voice assistant coming soon...</p>
        </div>
      case "invoice-creator":
        return <InvoiceCreator />
      case "estimates":
        return <EstimatesPage />
      case "payments":
        return <ResponsivePaymentsPage />
      case "e-signatures":
        return <ESignaturesPage />
      
      // Core Business Tools
      case "customer-management":
        return <CustomerManagement />
      case "projects":
        return <ProjectsPage />
      case "project-timeline":
        return <ProjectTimelinePage />
      case "pipeline":
        return <PipelineBoard />
      case "smart-schedule":
        return <SmartSchedulePage />
      
      // Financial Tools
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
      
      // Operations Tools
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
      
      // Documents & Forms
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
      
      // Productivity Tools
      case "meetings":
        return <MeetingsPage />
      case "todo-list":
        return <TodoListPage />
      case "notes":
        return <NotesPage />
      
      // General Pages
      case "careers":
        return <CareersPage />
      case "customers":
        return <CustomerManagement />
      case "appointments":
        return <AppointmentsPage />
      case "invoices":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Invoices</h1>
          <p>Invoice management coming soon...</p>
        </div>
      case "tasks":
        return <TodoListPage />
      case "messages":
        return <MessagesPage />
      case "email-settings":
        return <EmailSettingsPage />
      case "products":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <p>Product catalog coming soon...</p>
        </div>
      case "expenses":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Expenses</h1>
          <p>Expense management coming soon...</p>
        </div>
      case "esignature-templates":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">E-Signature Templates</h1>
          <p>Document templates coming soon...</p>
        </div>
      case "analytics":
        return <AnalyticsDashboard />
      case "admin-panel":
        return <AdminDashboard />
      case "referrals":
        return <ReferralsPage />
      case "features":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Features</h1>
          <p>Feature requests coming soon...</p>
        </div>
      case "faq-help":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">FAQ & Help</h1>
          <p>Help center coming soon...</p>
        </div>
      case "feedback":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Feedback</h1>
          <p>Feedback system coming soon...</p>
        </div>
      case "pricing":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Pricing Plans</h1>
          <p>Pricing plans coming soon...</p>
        </div>
      case "settings":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p>Settings page coming soon...</p>
        </div>
      default:
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
          <p>A página "{activeView}" não foi encontrada.</p>
        </div>
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-6">
      {renderContent()}
    </div>
  )
}
