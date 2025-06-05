
import { 
  Home, FileText, Users, BarChart3, Calendar, Settings, Signature, PenTool, Briefcase, CheckSquare,
  Mic, CreditCard, MessageSquare, Mail, Send, Calculator, TrendingUp, Receipt, 
  FileSpreadsheet, Package, Clipboard, DollarSign, HelpCircle, Crown, Moon, Globe, Lightbulb, Video, Shield, Warehouse, UserCheck, Target, StickyNote
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
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

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
    title: "MatTrack",
    icon: Warehouse,
    view: "mat-track"
  },
  {
    title: "CrewControl",
    icon: UserCheck,
    view: "crew-control"
  },
  {
    title: "EarnSync",
    icon: Target,
    view: "earnsync"
  },
  {
    title: "Meetings",
    icon: Video,
    view: "meetings"
  },
  {
    title: "To-Do List",
    icon: CheckSquare,
    view: "todo-list"
  },
  {
    title: "Notes",
    icon: StickyNote,
    view: "notes"
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
    title: "Accounting",
    icon: Receipt,
    view: "accounting"
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
    title: "Admin Panel",
    icon: Shield,
    view: "admin-panel"
  },
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
  const isMobile = useIsMobile()
  
  console.log('isMobile state:', isMobile) // Debug log to check mobile detection
  
  const handleMenuClick = (view: string) => {
    console.log('Clicked on:', view)
    if (view === "admin-panel") {
      // Navigate to the dedicated admin page
      window.location.href = "/admin"
    } else {
      setActiveView(view)
    }
  }
  
  const renderMenuSection = (items: typeof mainFeatures, sectionTitle: string) => (
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {sectionTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton 
                onClick={() => handleMenuClick(item.view)}
                isActive={activeView === item.view}
                className="w-full flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 cursor-pointer"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
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
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-600">FeatherBiz</h2>
            <p className="text-sm text-gray-500">AI-Powered Business Platform</p>
          </div>
          {/* Always show button on screens smaller than md (768px) */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleMenuClick("dashboard")}
              className="flex items-center gap-1 text-sm"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
          </div>
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
            <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
            <LanguageSelector />
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
