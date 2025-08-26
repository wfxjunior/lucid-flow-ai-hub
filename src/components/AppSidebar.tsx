
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Users, Calendar, FileText, CreditCard, Settings, BarChart3, Briefcase, PiggyBank, Calculator, Car, Package, UserCheck, Target, MessageSquare, Mail, Zap, Video, CheckSquare, StickyNote, FileSpreadsheet, Receipt, TrendingUp, Clipboard, DollarSign, PenTool, Clock, Building, Heart, Mic, Signature } from "lucide-react"
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

interface AppSidebarProps {
  activeView: string
}

// Define menu sections with their items
const generalItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, view: "" },
  { title: "Careers", icon: Users, view: "careers" }
]

const coreBusinessItems: MenuItem[] = [
  { title: "Customers", icon: Users, view: "customers" },
  { title: "Projects", icon: Briefcase, view: "projects" },
  { title: "Project Timeline", icon: Calendar, view: "project-schedule" },
  { title: "Invoices", icon: Receipt, view: "invoices" },
  { title: "Estimates", icon: Calculator, view: "estimates" },
  { title: "Smart Schedule", icon: Clock, view: "smart-schedule" }
]

const financialItems: MenuItem[] = [
  { title: "FeatherBudget AI", icon: PiggyBank, view: "financial-tools" },
  { title: "FeatherTax", icon: Calculator, view: "feather-tax" },
  { title: "EasyCalc", icon: Calculator, view: "easy-calc" },
  { title: "Receipts", icon: Receipt, view: "receipts" },
  { title: "Accounting", icon: FileSpreadsheet, view: "accounting" },
  { title: "Quotes", icon: Clipboard, view: "quotes" }
]

const operationsItems: MenuItem[] = [
  { title: "Car Rental", icon: Car, view: "car-rental" },
  { title: "Work Orders", icon: Package, view: "work-orders" },
  { title: "MatTrack", icon: Package, view: "mattrack" },
  { title: "CrewControl", icon: UserCheck, view: "crew-control" },
  { title: "EarnSync", icon: DollarSign, view: "earnsync" },
  { title: "AfterCare", icon: Heart, view: "aftercare" }
]

const documentsItems: MenuItem[] = [
  { title: "FeatherForms", icon: FileText, view: "documents-forms" },
  { title: "Sales Orders", icon: TrendingUp, view: "sales-orders" },
  { title: "Business Proposals", icon: Clipboard, view: "business-proposals" },
  { title: "Bids", icon: DollarSign, view: "bids" },
  { title: "Contracts", icon: PenTool, view: "contracts" }
]

const productivityItems: MenuItem[] = [
  { title: "Meetings", icon: Video, view: "meetings" },
  { title: "Todo List", icon: CheckSquare, view: "tasks" },
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

export function AppSidebar({ activeView }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (view: string) => {
    console.log('Sidebar: Navigating to', view)
    navigate(view === "" ? "/" : `/${view}`)
  }

  return (
    <Sidebar variant="inset" className="w-48 min-w-48">
      <SidebarHeader className="p-1">
        <div className="flex items-center gap-1 px-2 py-1">
          <span className="font-semibold text-foreground text-sm">FeatherBiz</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-1">
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
      
      <SidebarFooter className="p-1">
        <div className="px-2 py-1 text-xs text-muted-foreground">
          FeatherBiz v1.0
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
