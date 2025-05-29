
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
  Mic
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

const mainFeatures = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "AI Voice Assistant",
    url: "/ai-voice",
    icon: Mic,
  },
  {
    title: "Create Invoice",
    url: "/create-invoice",
    icon: FileText,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "E-Signatures",
    url: "/e-signatures",
    icon: Signature,
  },
]

const businessTools = [
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Workflow,
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: Receipt,
  },
  {
    title: "Receipts & Accounting",
    url: "/receipts",
    icon: FolderOpen,
  },
  {
    title: "Sales Orders",
    url: "/sales-orders",
    icon: TrendingUp,
  },
  {
    title: "Service Orders",
    url: "/service-orders",
    icon: FileCheck,
  },
  {
    title: "Business Proposals",
    url: "/proposals",
    icon: FileText,
  },
  {
    title: "Bids",
    url: "/bids",
    icon: DollarSign,
  },
]

const communication = [
  {
    title: "Email Center",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Communication Hub",
    url: "/communication",
    icon: Send,
  },
]

const analytics = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "My Family Savings",
    url: "/family-savings",
    icon: Heart,
  },
]

const settings = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
