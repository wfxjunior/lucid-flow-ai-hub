import { 
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
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
  TrendingUp, Shield, HelpCircle, MessageCircleQuestion, Star, Zap
} from "lucide-react"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  console.log('AppSidebar rendering with activeView:', activeView)
  const isMobile = useIsMobile()
  const { t } = useLanguage()
  console.log('isMobile state:', isMobile)
  
  const handleMenuClick = (view: string) => {
    console.log('Clicked on:', view)
    setActiveView(view)
  }

  // Main Features
  const mainFeatures = [
    { title: "Dashboard", view: "dashboard", icon: Home },
    { title: "AI Voice", view: "ai-voice", icon: Mic },
    { title: "Create Invoice", view: "invoice-creator", icon: FileText },
    { title: "Estimates", view: "estimates", icon: Calculator },
    { title: "Payments", view: "payments", icon: CreditCard },
    { title: "E-Signatures", view: "e-signatures", icon: Signature },
  ]

  // Core Business
  const coreBusinessItems = [
    { title: "Customers", view: "customers", icon: Users },
    { title: "Projects", view: "projects", icon: Briefcase },
    { title: "Pipeline", view: "pipeline", icon: TrendingUp },
    { title: "Smart Schedule", view: "smart-schedule", icon: Calendar },
  ]

  // Financial Tools
  const financialItems = [
    { title: "FeatherBudget", view: "feather-budget", icon: PiggyBank },
    { title: "FeatherTax", view: "feather-tax", icon: FileCheck },
    { title: "EasyCalc", view: "easy-calc", icon: Calculator },
    { title: "Accounting", view: "accounting", icon: DollarSign },
    { title: "Quotes", view: "quotes", icon: FileText },
  ]

  // Operations
  const operationsItems = [
    { title: "Car Rental", view: "car-rental", icon: Truck },
    { title: "Work Orders", view: "work-orders", icon: Wrench },
    { title: "MatTrack", view: "mat-track", icon: Package },
    { title: "Crew Control", view: "crew-control", icon: UserCheck },
    { title: "EarnSync", view: "earnsync", icon: DollarSign },
    { title: "AfterCare", view: "aftercare", icon: Heart },
  ]

  // Documents & Forms
  const documentsItems = [
    { title: "FeatherForms", view: "feather-forms", icon: ClipboardList },
    { title: "Sales Orders", view: "sales-orders", icon: Store },
    { title: "Business Proposals", view: "business-proposals", icon: Building },
    { title: "Bids", view: "bids", icon: Zap },
    { title: "Contracts", view: "contracts", icon: File },
  ]

  // Productivity
  const productivityItems = [
    { title: "Meetings", view: "meetings", icon: Video },
    { title: "Todo List", view: "todo-list", icon: ListTodo },
    { title: "Notes", view: "notes", icon: StickyNote },
    { title: "Appointments", view: "appointments", icon: Calendar },
  ]

  // Communication
  const communicationItems = [
    { title: "Messages", view: "messages", icon: MessageSquare },
    { title: "Email Settings", view: "email-settings", icon: Settings },
  ]

  // Analytics
  const analyticsItems = [
    { title: "Analytics", view: "analytics", icon: BarChart3 },
    { title: "Admin Panel", view: "admin-panel", icon: Shield },
  ]

  // General & Support
  const generalItems = [
    { title: "Careers", view: "careers", icon: Users },
    { title: "Referrals", view: "referrals", icon: Star },
    { title: "Features", view: "features", icon: Grid },
    { title: "FAQ & Help", view: "faq-help", icon: HelpCircle },
    { title: "Feedback", view: "feedback", icon: MessageCircleQuestion },
    { title: "Pricing", view: "pricing", icon: DollarSign },
    { title: "Settings", view: "settings", icon: Settings },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        <SidebarHeader />

        {/* View All Features */}
        <div className="px-4 py-2">
          <AllFeaturesDialog 
            trigger={
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <Grid className="h-4 w-4" />
                View All Features
              </button>
            }
          />
        </div>
        <SidebarSeparator />

        <SidebarMenuSection 
          items={mainFeatures} 
          sectionTitle="Main Features" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={coreBusinessItems} 
          sectionTitle="Core Business" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={financialItems} 
          sectionTitle="Financial Tools" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={operationsItems} 
          sectionTitle="Operations" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={documentsItems} 
          sectionTitle="Documents & Forms" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={productivityItems} 
          sectionTitle="Productivity" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={communicationItems} 
          sectionTitle="Communication" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={analyticsItems} 
          sectionTitle="Analytics" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={generalItems} 
          sectionTitle="General & Support" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />

        {/* Mover Help Center para o fim do sidebar, abaixo da última seção */}
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
