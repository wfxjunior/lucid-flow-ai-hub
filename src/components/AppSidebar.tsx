
import { 
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { SidebarHeader } from "@/components/sidebar/SidebarHeader"
import { SidebarMenuSection } from "@/components/sidebar/SidebarMenuSection"
import { SidebarFooter } from "@/components/sidebar/SidebarFooter"
import { useSidebarMenuData } from "@/components/sidebar/SidebarMenuData"
import { 
  coreBusinessTools, 
  financialTools, 
  operationsTools, 
  documentsTools, 
  productivityTools 
} from "@/components/sidebar/businessToolsData"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  console.log('AppSidebar rendering with activeView:', activeView)
  const isMobile = useIsMobile()
  console.log('isMobile state:', isMobile)
  
  const {
    mainFeatures,
    communication,
    analytics,
    integrations,
    systemTools
  } = useSidebarMenuData()
  
  const handleMenuClick = (view: string) => {
    console.log('Clicked on:', view)
    if (view === "admin-panel") {
      window.location.href = "/admin"
    } else if (view === "feedback") {
      window.location.href = "/feedback"
    } else if (view === "faq-help") {
      window.location.href = "/faq"
    } else {
      setActiveView(view)
    }
  }

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
          items={operationsTools} 
          sectionTitle="Operations" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={documentsTools} 
          sectionTitle="Documents & Forms" 
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
          items={communication} 
          sectionTitle="Communication" 
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
          items={integrations} 
          sectionTitle="Integrations" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={systemTools} 
          sectionTitle="System" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  )
}
