
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

  // Dados principais organizados corretamente
  const generalItems = [
    { title: "Dashboard", view: "dashboard", icon: mainFeatures[0].icon },
    { title: "Careers", view: "careers", icon: mainFeatures[1].icon },
  ]

  const managementItems = [
    { title: "Customers", view: "customers", icon: mainFeatures[0].icon },
    { title: "Projects", view: "projects", icon: mainFeatures[0].icon },
    { title: "Appointments", view: "appointments", icon: mainFeatures[0].icon },
    { title: "Invoices", view: "invoices", icon: mainFeatures[0].icon },
    { title: "Tasks", view: "tasks", icon: mainFeatures[0].icon },
  ]

  const communicationItems = [
    { title: "Messages", view: "messages", icon: mainFeatures[0].icon },
    { title: "Email Settings", view: "email-settings", icon: mainFeatures[0].icon },
  ]

  const financeItems = [
    { title: "Products", view: "products", icon: mainFeatures[0].icon },
    { title: "Payments", view: "payments", icon: mainFeatures[0].icon },
    { title: "Expenses", view: "expenses", icon: mainFeatures[0].icon },
    { title: "Contracts", view: "contracts", icon: mainFeatures[0].icon },
  ]

  const eSignatureItems = [
    { title: "Documents", view: "e-signatures", icon: mainFeatures[0].icon },
    { title: "Templates", view: "esignature-templates", icon: mainFeatures[0].icon },
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
