import { 
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUserRole } from "@/hooks/useUserRole"
import { useLanguage } from "@/contexts/LanguageContext"
import { SidebarHeader } from "@/components/sidebar/SidebarHeader"
import { SidebarMenuSection } from "@/components/sidebar/SidebarMenuSection"
import { SidebarFooter } from "@/components/sidebar/SidebarFooter"
import { AllFeaturesDialog } from "@/components/AllFeaturesDialog"
import { HelpCenter } from "@/components/HelpCenter"
import { 
  Home, Users, Calendar, FileText, ListTodo, MessageSquare, Settings, 
  Store, PiggyBank, Wallet, File, CheckCircle, ClipboardList, Mic, CreditCard, 
  Signature, Calculator, BarChart3, Grid, Truck, Wrench, Package, UserCheck,
  DollarSign, Heart, FileCheck, Building, Briefcase, StickyNote, Video,
  TrendingUp, Shield, HelpCircle, MessageCircleQuestion, Star, Zap, Receipt, Mail
} from "lucide-react"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { t } = useLanguage()
  const { isAdmin } = useUserRole()
  
  const handleMenuClick = (view: string) => {
    setActiveView(view)
  }

  // Main Features
  const mainFeatures = [
    { title: t("sidebar.mainFeatures.dashboard", "Dashboard"), view: "dashboard", icon: Home },
    { title: t("sidebar.mainFeatures.aiVoice", "AI Voice"), view: "ai-voice", icon: Mic },
    { title: t("sidebar.mainFeatures.invoices", "Invoices"), view: "invoices", icon: FileText },
    { title: t("sidebar.mainFeatures.estimates", "Estimates"), view: "estimates", icon: Calculator },
    { title: t("sidebar.mainFeatures.payments", "Payments"), view: "payments" },
    { title: t("sidebar.mainFeatures.esignatures", "E-Signatures"), view: "e-signatures", icon: Signature },
  ]

  // Core Business
  const coreBusinessItems = [
    { title: t("sidebar.coreBusiness.customers", "Customers"), view: "customers", icon: Users },
    { title: t("sidebar.coreBusiness.projects", "Projects"), view: "projects", icon: Briefcase },
    // Use ListTodo for Project Timeline
    { title: t("sidebar.coreBusiness.projectTimeline", "Project Timeline"), view: "project-timeline", icon: ListTodo },
    { title: t("sidebar.coreBusiness.pipeline", "Pipeline"), view: "pipeline", icon: TrendingUp },
    { title: t("sidebar.coreBusiness.smartSchedule", "Smart Schedule"), view: "smart-schedule", icon: Calendar },
  ]

  // Financial Tools
  const financialItems = [
    { title: t("sidebar.financialTools.featherBudget", "FeatherBudget"), view: "feather-budget", icon: PiggyBank },
    { title: t("sidebar.financialTools.featherTax", "FeatherTax"), view: "feather-tax", icon: FileCheck },
    { title: t("sidebar.financialTools.easyCalc", "EasyCalc"), view: "easy-calc", icon: Calculator },
    { title: t("sidebar.financialTools.receipts", "Receipts"), view: "receipts", icon: Receipt },
    { title: t("sidebar.financialTools.accounting", "Accounting"), view: "accounting", icon: DollarSign },
    { title: t("sidebar.financialTools.quotes", "Quotes"), view: "quotes", icon: FileText },
  ]

  // Operations
  const operationsItems = [
    { title: t("sidebar.operations.carRental", "Car Rental"), view: "car-rental", icon: Truck },
    { title: t("sidebar.operations.workOrders", "Work Orders"), view: "work-orders", icon: Wrench },
    { title: t("sidebar.operations.matTrack", "MatTrack"), view: "mat-track", icon: Package },
    { title: t("sidebar.operations.crewControl", "Crew Control"), view: "crew-control", icon: UserCheck },
    { title: t("sidebar.operations.earnsync", "EarnSync"), view: "earnsync", icon: DollarSign },
    { title: t("sidebar.operations.aftercare", "AfterCare"), view: "aftercare", icon: Heart },
  ]

  // Documents & Forms
  const documentsItems = [
    { title: t("sidebar.documents.featherForms", "FeatherForms"), view: "feather-forms", icon: ClipboardList },
    { title: t("sidebar.documents.salesOrders", "Sales Orders"), view: "sales-orders", icon: Store },
    { title: t("sidebar.documents.businessProposals", "Business Proposals"), view: "business-proposals", icon: Building },
    { title: t("sidebar.documents.bids", "Bids"), view: "bids", icon: Zap },
    { title: t("sidebar.documents.contracts", "Contracts"), view: "contracts", icon: File },
  ]

  // Productivity
  const productivityItems = [
    { title: t("sidebar.productivity.meetings", "Meetings"), view: "meetings", icon: Video },
    { title: t("sidebar.productivity.todoList", "Todo List"), view: "todo-list", icon: ListTodo },
    { title: t("sidebar.productivity.notes", "Notes"), view: "notes", icon: StickyNote },
    { title: t("sidebar.productivity.appointments", "Appointments"), view: "appointments", icon: Calendar },
  ]

  // Communication
  const communicationItems = [
    { title: t("sidebar.communication.messages", "Messages"), view: "messages", icon: MessageSquare },
    { title: t("sidebar.communication.emailCenter", "Email Center"), view: "email-center", icon: Mail },
  ]

  // Analytics - Only show Admin Panel to admin users
  const analyticsItems = [
    { title: t("sidebar.analytics.analytics", "Analytics"), view: "analytics", icon: BarChart3 },
    ...(isAdmin ? [{ title: t("sidebar.analytics.adminPanel", "Admin Panel"), view: "admin-panel", icon: Shield }] : [])
  ]

  // General & Support
  const generalItems = [
    { title: t("sidebar.general.careers", "Careers"), view: "careers", icon: Users },
    { title: t("sidebar.general.referrals", "Referrals"), view: "referrals", icon: Star },
    { title: t("sidebar.general.features", "Features"), view: "features", icon: Grid },
    { title: t("sidebar.general.faqHelp", "FAQ & Help"), view: "faq-help", icon: HelpCircle },
    { title: t("sidebar.general.feedback", "Feedback"), view: "feedback", icon: MessageCircleQuestion },
    { title: t("sidebar.general.pricing", "Pricing"), view: "pricing", icon: DollarSign },
    { title: t("sidebar.general.settings", "Settings"), view: "settings", icon: Settings },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        <SidebarHeader />
        <div className="px-4 py-2">
          <AllFeaturesDialog 
            trigger={
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <Grid className="h-4 w-4" />
                {t("sidebar.allFeatures", "View All Features")}
              </button>
            }
          />
        </div>
        <SidebarSeparator />
        <SidebarMenuSection 
          items={mainFeatures} 
          sectionTitle={t("sidebarSections.mainFeatures", "Main Features")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={coreBusinessItems} 
          sectionTitle={t("sidebarSections.coreBusiness", "Core Business")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={financialItems} 
          sectionTitle={t("sidebarSections.financialTools", "Financial Tools")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={operationsItems} 
          sectionTitle={t("sidebarSections.operations", "Operations")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={documentsItems} 
          sectionTitle={t("sidebarSections.documentsAndForms", "Documents & Forms")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={productivityItems} 
          sectionTitle={t("sidebarSections.productivity", "Productivity")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={communicationItems} 
          sectionTitle={t("sidebarSections.communication", "Communication")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={analyticsItems} 
          sectionTitle={t("sidebarSections.analytics", "Analytics")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <SidebarSeparator />
        <SidebarMenuSection 
          items={generalItems} 
          sectionTitle={t("sidebarSections.generalSupport", "General & Support")}
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        <div className="px-4 pt-3 pb-4">
          <HelpCenter 
            variant="outline"
            size="default"
            className="w-full justify-start mb-1"
          />
        </div>
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  )
}
