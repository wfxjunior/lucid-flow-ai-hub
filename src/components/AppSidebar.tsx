import { 
  Home, FileText, Users, BarChart3, Calendar, Settings, Signature, PenTool, Briefcase, CheckSquare,
  Mic, CreditCard, MessageSquare, Mail, Send, Calculator, TrendingUp, Receipt, 
  FileSpreadsheet, Package, Clipboard, DollarSign, HelpCircle, Crown, Moon, Globe, Lightbulb
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ThemeToggle } from "@/components/ThemeToggle"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const mainFeatures = [
  {
    title: "Dashboard",
    icon: Home,
    view: "dashboard"
  },
  {
    title: "AI Voice Assistant",
    icon: Mic,
    view: "ai-voice"
  },
  {
    title: "Create Invoice",
    icon: FileText,
    view: "invoice-creator"
  },
  {
    title: "Features",
    icon: Lightbulb,
    view: "features"
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments"
  },
  {
    title: "Payments",
    icon: CreditCard,
    view: "payments"
  },
  {
    title: "E-Signatures",
    icon: Signature,
    view: "e-signatures"
  }
]

const businessTools = [
  {
    title: "Customers",
    icon: Users,
    view: "customer-management"
  },
  {
    title: "Projects",
    icon: Briefcase,
    view: "projects"
  },
  {
    title: "Work Orders",
    icon: Package,
    view: "work-orders"
  },
  {
    title: "To-Do List",
    icon: CheckSquare,
    view: "todo-list"
  },
  {
    title: "Quotes",
    icon: FileSpreadsheet,
    view: "quotes"
  },
  {
    title: "Estimates",
    icon: Calculator,
    view: "estimates"
  },
  {
    title: "Receipts & Accounting",
    icon: Receipt,
    view: "receipts"
  },
  {
    title: "Sales Orders",
    icon: TrendingUp,
    view: "sales-orders"
  },
  {
    title: "Service Orders",
    icon: Package,
    view: "service-orders"
  },
  {
    title: "Business Proposals",
    icon: Clipboard,
    view: "business-proposals"
  },
  {
    title: "Bids",
    icon: DollarSign,
    view: "bids"
  }
]

const communication = [
  {
    title: "Email Center",
    icon: Mail,
    view: "email-center"
  },
  {
    title: "Messages",
    icon: MessageSquare,
    view: "messages"
  },
  {
    title: "Communication Hub",
    icon: Send,
    view: "communication-hub"
  }
]

const analytics = [
  {
    title: "Analytics",
    icon: BarChart3,
    view: "analytics"
  }
]

const systemTools = [
  {
    title: "Features",
    icon: Lightbulb,
    view: "features"
  },
  {
    title: "FAQ & Help",
    icon: HelpCircle,
    view: "faq-help"
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    view: "feedback"
  },
  {
    title: "Pricing Plans",
    icon: Crown,
    view: "pricing"
  },
  {
    title: "Settings",
    icon: Settings,
    view: "settings"
  },
  {
    title: "Contracts",
    icon: PenTool,
    view: "contracts"
  }
]

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  console.log('AppSidebar rendering with activeView:', activeView)
  
  const renderMenuSection = (items: typeof mainFeatures, sectionTitle: string) => (
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {sectionTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton 
                onClick={() => {
                  console.log('Clicked on:', item.view)
                  setActiveView(item.view)
                }}
                isActive={activeView === item.view}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 cursor-pointer"
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )

  return (
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-blue-600">FeatherBiz</h2>
          <p className="text-xs text-gray-500">AI-Powered Business Platform</p>
        </div>

        {/* Main Features */}
        {renderMenuSection(mainFeatures, "Main Features")}
        
        <SidebarSeparator />
        
        {/* Business Tools */}
        {renderMenuSection(businessTools, "Business Tools")}
        
        <SidebarSeparator />
        
        {/* Communication */}
        {renderMenuSection(communication, "Communication")}
        
        <SidebarSeparator />
        
        {/* Analytics */}
        {renderMenuSection(analytics, "Analytics")}
        
        <SidebarSeparator />
        
        {/* System */}
        {renderMenuSection(systemTools, "System")}
      </SidebarContent>
      
      {/* Footer with Language Selector and Theme Toggle */}
      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Language</p>
            <LanguageSelector />
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
