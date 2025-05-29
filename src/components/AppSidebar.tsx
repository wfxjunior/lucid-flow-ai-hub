import {
  BarChart3,
  CheckSquare,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  Workflow,
  Mail,
  CreditCard,
  Brain,
  Receipt,
  Calendar,
  DollarSign,
  FolderOpen,
  Signature,
  TrendingUp,
  FileCheck,
  Send,
  Heart,
  Mic,
  Crown
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
} from "@/components/ui/sidebar"
import { LanguageSelector } from "./LanguageSelector"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const mainFeatures = [
  {
    title: "Dashboard",
    id: "dashboard",
    icon: Home,
  },
  {
    title: "AI Voice Assistant",
    id: "ai-voice",
    icon: Mic,
  },
  {
    title: "Create Invoice",
    id: "create-invoice",
    icon: FileText,
  },
  {
    title: "Appointments",
    id: "appointments",
    icon: Calendar,
  },
  {
    title: "Payments",
    id: "payments",
    icon: CreditCard,
  },
  {
    title: "E-Signatures",
    id: "e-signatures",
    icon: Signature,
  },
]

const businessTools = [
  {
    title: "Customers",
    id: "customers",
    icon: Users,
  },
  {
    title: "Projects",
    id: "projects",
    icon: Workflow,
  },
  {
    title: "Quotes",
    id: "quotes",
    icon: Receipt,
  },
  {
    title: "Receipts & Accounting",
    id: "receipts",
    icon: FolderOpen,
  },
  {
    title: "Sales Orders",
    id: "sales-orders",
    icon: TrendingUp,
  },
  {
    title: "Service Orders",
    id: "service-orders",
    icon: FileCheck,
  },
  {
    title: "Business Proposals",
    id: "proposals",
    icon: FileText,
  },
  {
    title: "Bids",
    id: "bids",
    icon: DollarSign,
  },
]

const communication = [
  {
    title: "Email Center",
    id: "email",
    icon: Mail,
  },
  {
    title: "Messages",
    id: "messages",
    icon: MessageSquare,
  },
  {
    title: "Communication Hub",
    id: "communication",
    icon: Send,
  },
]

const analytics = [
  {
    title: "Analytics",
    id: "analytics",
    icon: BarChart3,
  },
  {
    title: "My Family Savings",
    id: "family-savings",
    icon: Heart,
  },
]

const settings = [
  {
    title: "Pricing Plans",
    id: "pricing",
    icon: Crown,
  },
  {
    title: "Settings",
    id: "settings",
    icon: Settings,
  },
]

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Hubsfy
          </h1>
          <p className="text-sm text-muted-foreground">AI-Powered Business Platform</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Business Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communication.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analytics.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t pt-4">
          <LanguageSelector />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
