
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
  Brain
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

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Tasks & Notes",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Workflow,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Communication",
    url: "/communication",
    icon: MessageSquare,
  },
  {
    title: "Email Campaigns",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Invoicing",
    url: "/invoicing",
    icon: CreditCard,
  },
  {
    title: "AI Assistant",
    url: "/ai",
    icon: Brain,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
]

const secondaryItems = [
  {
    title: "Documents",
    url: "/documents",
    icon: FileText,
  },
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
            SaaSPro
          </h1>
          <p className="text-sm text-muted-foreground">AI-Powered Platform</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
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
