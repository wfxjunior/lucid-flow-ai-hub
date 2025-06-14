
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
import { sidebarMenuData } from "@/components/sidebar/SidebarMenuData"
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
  const { t } = useLanguage()
  console.log('isMobile state:', isMobile)
  
  // Extract the categories from sidebarMenuData and convert them to the expected format
  const generalSection = sidebarMenuData.find(section => section.title === "General")
  const managementSection = sidebarMenuData.find(section => section.title === "Management")
  const communicationSection = sidebarMenuData.find(section => section.title === "Communication")
  const financeSection = sidebarMenuData.find(section => section.title === "Finance")
  const eSignatureSection = sidebarMenuData.find(section => section.title === "E-Signatures")
  
  const handleMenuClick = (view: string) => {
    console.log('Clicked on:', view)
    setActiveView(view)
  }

  // Convert SidebarMenuItem to MenuItem format
  const convertToMenuItems = (items: any[]) => {
    return items?.map(item => ({
      ...item,
      view: item.url?.replace('/', '') || item.title.toLowerCase().replace(/\s+/g, '-')
    })) || []
  }

  return (
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        <SidebarHeader />

        {generalSection && (
          <SidebarMenuSection 
            items={convertToMenuItems(generalSection.items)} 
            sectionTitle={generalSection.title} 
            activeView={activeView}
            onMenuClick={handleMenuClick}
          />
        )}
        
        <SidebarSeparator />
        
        {managementSection && (
          <SidebarMenuSection 
            items={convertToMenuItems(managementSection.items)} 
            sectionTitle={managementSection.title} 
            activeView={activeView}
            onMenuClick={handleMenuClick}
          />
        )}
        
        <SidebarSeparator />
        
        {communicationSection && (
          <SidebarMenuSection 
            items={convertToMenuItems(communicationSection.items)} 
            sectionTitle={communicationSection.title} 
            activeView={activeView}
            onMenuClick={handleMenuClick}
          />
        )}
        
        <SidebarSeparator />
        
        {financeSection && (
          <SidebarMenuSection 
            items={convertToMenuItems(financeSection.items)} 
            sectionTitle={financeSection.title} 
            activeView={activeView}
            onMenuClick={handleMenuClick}
          />
        )}
        
        <SidebarSeparator />
        
        {eSignatureSection && (
          <SidebarMenuSection 
            items={convertToMenuItems(eSignatureSection.items)} 
            sectionTitle={eSignatureSection.title} 
            activeView={activeView}
            onMenuClick={handleMenuClick}
          />
        )}
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={coreBusinessTools} 
          sectionTitle={t("sidebar.coreBusiness")} 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={financialTools} 
          sectionTitle={t("sidebar.financialTools")} 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={operationsTools} 
          sectionTitle={t("sidebar.operations")} 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={documentsTools} 
          sectionTitle={t("sidebar.documentsAndForms")} 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarSeparator />
        
        <SidebarMenuSection 
          items={productivityTools} 
          sectionTitle={t("sidebar.productivity")} 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
      </SidebarContent>
      
      <SidebarFooter />
    </Sidebar>
  )
}
