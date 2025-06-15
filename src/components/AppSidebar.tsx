
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
import { mainFeatures } from "@/components/sidebar/mainFeaturesData"
import { analytics } from "@/components/sidebar/analyticsData"
import { systemTools } from "@/components/sidebar/systemToolsData"
import { coreBusinessTools, financialTools, operationsTools, documentsTools, productivityTools } from "@/components/sidebar/businessToolsData"
import { 
  Home, Users, Calendar, FileText, ListTodo, MessageSquare, Settings, 
  Store, PiggyBank, Wallet, File, CheckCircle, ClipboardList 
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

  // Seções organizadas corretamente com ícones
  const generalItems = [
    { title: "Careers", view: "careers", icon: Users },
  ]

  const managementItems = [
    { title: "Customers", view: "customers", icon: Users },
    { title: "Projects", view: "projects", icon: Calendar },
    { title: "Appointments", view: "appointments", icon: Calendar },
    { title: "Invoices", view: "invoices", icon: FileText },
    { title: "Todo List", view: "todo-list", icon: ListTodo },
  ]

  const communicationItems = [
    { title: "Messages", view: "messages", icon: MessageSquare },
    { title: "Email Settings", view: "email-settings", icon: Settings },
  ]

  const financeItems = [
    { title: "Products", view: "products", icon: Store },
    { title: "Payments", view: "payments", icon: PiggyBank },
    { title: "Expenses", view: "expenses", icon: Wallet },
    { title: "Contracts", view: "contracts", icon: File },
  ]

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
