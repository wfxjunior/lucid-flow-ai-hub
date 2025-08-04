
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
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"
import { useUserRole } from "@/hooks/useUserRole"
import { ReceiptsPage } from "@/components/ReceiptsPage"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { InvoicesPage } from "@/components/InvoicesPage"
import { ResponsivePaymentsPage } from "@/components/ResponsivePaymentsPage"
import { ReferralsPage } from "@/components/ReferralsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { FAQPage } from "@/components/FAQPage"
import { FeedbackPage } from "@/components/FeedbackPage"
import { PricingPlans } from "@/components/PricingPlans"
import { SettingsPage } from "@/components/SettingsPage"
import { AIVoiceAssistant } from "@/components/AIVoiceAssistant"

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const { isAdmin, loading } = useUserRole()
  
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={onNavigate} />
      case "ai-voice":
        return <AIVoiceAssistant />
      case "invoice-creator":
        return <InvoiceCreator />
      case "estimates":
        return <EstimatesPage />
      case "payments":
        return <ResponsivePaymentsPage />
      case "e-signatures":
        return <ESignaturesPage />
      
      // Core Business Tools
      case "customers":
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
      case "receipts":
        return <ReceiptsPage />
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
        return <ResponsiveMatTrackPage onNavigate={onNavigate} />
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
      case "appointments":
        return <AppointmentsPage />
      
      // Communication
      case "messages":
        return <MessagesPage />
      case "email-settings":
        return <EmailSettingsPage />
      
      // Analytics
      case "analytics":
        return <AnalyticsDashboard />
      case "admin-panel":
        if (loading) {
          return <div className="p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-center mt-4">Verificando permissões...</p>
          </div>
        }
        if (!isAdmin) {
          return <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Acesso Negado</h2>
              <p className="text-red-600">Você não tem permissão para acessar o painel administrativo.</p>
              <p className="text-red-600 text-sm mt-2">Entre em contato com um administrador para obter acesso.</p>
            </div>
          </div>
        }
        return <AdminDashboard />
      
      // General & Support
      case "careers":
        return <CareersPage />
      case "referrals":
        return <ReferralsPage />
      case "features":
        return <FeaturesPage />
      case "faq-help":
        return <FAQPage />
      case "feedback":
        return <FeedbackPage />
      case "pricing":
        return <PricingPlans />
      case "settings":
        return <SettingsPage />
      
      // Legacy routes for compatibility
      case "invoices":
        return <InvoicesPage />
      case "products":
        return <AccountingPage />
      case "expenses":
        return <AccountingPage />
      case "esignature-templates":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">E-Signature Templates</h1>
          <p>Document templates coming soon...</p>
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
