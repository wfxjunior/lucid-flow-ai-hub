
import React from "react"
import { Home, Users, Calendar, FileText, CreditCard, Settings, BarChart3, Briefcase, PiggyBank, Calculator, Car, Package, UserCheck, Target, MessageSquare, Mail, Zap, Video, CheckSquare, StickyNote, FileSpreadsheet, Receipt, TrendingUp, Clipboard, DollarSign, PenTool, Clock, Heart, Mic, Signature } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarMenuSection } from "./sidebar/SidebarMenuSection"
import { MenuItem } from "./sidebar/types"
import { FeatherBizLogo } from "./FeatherBizLogo"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

// Define menu sections with their items
const generalItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, view: "dashboard" },
  { title: "Careers", icon: Users, view: "careers" }
]

const coreBusinessItems: MenuItem[] = [
  { title: "Customers", icon: Users, view: "customers" },
  { title: "Projects", icon: Briefcase, view: "projects" },
  { title: "Project Timeline", icon: Calendar, view: "project-timeline" },
  { title: "Growth", icon: TrendingUp, view: "growth" },
  { title: "Automations", icon: Zap, view: "automations" },
  { title: "Pipeline", icon: Target, view: "pipeline" },
  { title: "Smart Schedule", icon: Clock, view: "smart-schedule" }
]

const financialItems: MenuItem[] = [
  { title: "Finance", icon: PiggyBank, view: "finance" },
  { title: "FeatherBudget AI", icon: PiggyBank, view: "feather-budget" },
  { title: "FeatherTax", icon: Calculator, view: "feather-tax" },
  { title: "EasyCalc", icon: Calculator, view: "easy-calc" },
  { title: "Receipts", icon: Receipt, view: "receipts" },
  { title: "Accounting", icon: FileSpreadsheet, view: "accounting" },
  { title: "Quotes", icon: Clipboard, view: "quotes" }
]

const operationsItems: MenuItem[] = [
  { title: "Car Rental", icon: Car, view: "car-rental" },
  { title: "Work Orders", icon: Package, view: "work-orders" },
  { title: "MatTrack", icon: Package, view: "mat-track" },
  { title: "CrewControl", icon: UserCheck, view: "crew-control" },
  { title: "EarnSync", icon: DollarSign, view: "earnsync" },
  { title: "AfterCare", icon: Heart, view: "aftercare" }
]

const documentsItems: MenuItem[] = [
  { title: "FeatherForms", icon: FileText, view: "feather-forms" },
  { title: "Sales Orders", icon: TrendingUp, view: "sales-orders" },
  { title: "Business Proposals", icon: Clipboard, view: "business-proposals" },
  { title: "Bids", icon: DollarSign, view: "bids" },
  { title: "Contracts", icon: PenTool, view: "contracts" }
]

const productivityItems: MenuItem[] = [
  { title: "Meetings", icon: Video, view: "meetings" },
  { title: "Todo List", icon: CheckSquare, view: "todo-list" },
  { title: "Notes", icon: StickyNote, view: "notes" },
  { title: "Appointments", icon: Calendar, view: "appointments" }
]

const communicationItems: MenuItem[] = [
  { title: "Messages", icon: MessageSquare, view: "messages" },
  { title: "Email Center", icon: Mail, view: "email-center" }
]

const analyticsItems: MenuItem[] = [
  { title: "Analytics", icon: BarChart3, view: "analytics" }
]

const systemItems: MenuItem[] = [
  { title: "Settings", icon: Settings, view: "settings" },
  { title: "Admin Panel", icon: Settings, view: "admin-panel" }
]

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const handleMenuClick = (view: string) => {
    console.log('Sidebar: Navigating to', view)
    setActiveView(view)
  }

  return (
    <Sidebar variant="inset" className="fb-sidebar border-r border-border h-screen">
      <SidebarHeader className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <FeatherBizLogo />
          <span className="fb-text-lg font-semibold text-foreground">FeatherBiz</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4 flex-1 overflow-y-auto">
        <SidebarMenuSection 
          items={generalItems} 
          sectionTitle="General" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={coreBusinessItems} 
          sectionTitle="Core Business" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={financialItems} 
          sectionTitle="Financial Tools" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={operationsItems} 
          sectionTitle="Operations" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={documentsItems} 
          sectionTitle="Documents & Forms" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={productivityItems} 
          sectionTitle="Productivity" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={communicationItems} 
          sectionTitle="Communication" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={analyticsItems} 
          sectionTitle="Analytics" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
        
        <SidebarMenuSection 
          items={systemItems} 
          sectionTitle="System Tools" 
          activeView={activeView}
          onMenuClick={handleMenuClick}
        />
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-3 border-t border-border mt-auto">
        <div className="fb-text-xs text-muted-foreground">
          FeatherBiz v1.0
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
