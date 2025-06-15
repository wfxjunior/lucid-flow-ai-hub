
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
import { analytics } from "@/components/sidebar/analyticsData"
import { systemTools } from "@/components/sidebar/systemToolsData"
import { coreBusinessTools, financialTools, operationsTools, documentsTools, productivityTools } from "@/components/sidebar/businessToolsData"
import { 
  Home, Users, Calendar, FileText, ListTodo, MessageSquare, Settings, 
  Store, PiggyBank, Wallet, File, CheckCircle, ClipboardList, Mic, CreditCard, Signature, Calculator
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

  // Main Features (including Estimates moved here)
  const mainFeatures = [
    { title: "Dashboard", view: "dashboard", icon: Home },
    { title: "AI Voice", view: "ai-voice", icon: Mic },
    { title: "Create Invoice", view: "invoice-creator", icon: FileText },
    { title: "Estimates", view: "estimates", icon: Calculator },
    { title: "Payments", view: "payments", icon: CreditCard },
    { title: "E-Signatures", view: "e-signatures", icon: Signature },
  ]

  // General Items
  const generalItems = [
    { title: "Careers", view: "careers", icon: Users },
  ]

  // Management Items (removed duplicate Appointments)
  const managementItems = [
    { title: "Customers", view: "customers", icon: Users },
    { title: "Projects", view: "projects", icon: Calendar },
    { title: "Appointments", view: "appointments", icon: Calendar },
    { title: "Invoices", view: "invoices", icon: FileText },
    { title: "Todo List", view: "todo-list", icon: ListTodo },
  ]

  // Communication Items
  const communicationItems = [
    { title: "Messages", view: "messages", icon: MessageSquare },
    { title: "Email Settings", view: "email-settings", icon: Settings },
  ]

  // Finance Items
  const financeItems = [
    { title: "Products", view: "products", icon: Store },
    { title: "Expenses", view: "expenses", icon: Wallet },
    { title: "Contracts", view: "contracts", icon: File },
  ]

  // E-Signature Items
  const eSignatureItems = [
    { title: "Documents", view: "e-signatures", icon: CheckCircle },
    { title: "Templates", view: "esignature-templates", icon: ClipboardList },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        <SidebarHeader />

        <SidebarMenuSection 
          items={mainFeatures} 
          sectionTitle="Main Features" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={coreBusinessTools} 
          sectionTitle="Core Business" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={financialTools} 
          sectionTitle="Financial Tools" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={generalItems} 
          sectionTitle="General" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={managementItems} 
          sectionTitle="Management" 
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
          items={financeItems} 
          sectionTitle="Finance" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={eSignatureItems} 
          sectionTitle="E-Signatures" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={operationsTools} 
          sectionTitle="Operations" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={documentsTools} 
          sectionTitle="Documents" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />

        <SidebarMenuSection 
          items={productivityTools} 
          sectionTitle="Productivity" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={analytics} 
          sectionTitle="Analytics" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={systemTools} 
          sectionTitle="System Tools" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  )
}
