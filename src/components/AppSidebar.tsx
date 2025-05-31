
import { Home, FileText, Users, BarChart3, Calendar, Settings, Clock, CreditCard, Receipt, Signature, PenTool, Briefcase, CheckSquare } from "lucide-react"
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

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    view: "dashboard"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    view: "analytics"
  },
  {
    title: "Customer Management",
    icon: Users,
    view: "customer-management"
  },
  {
    title: "Invoice Creator",
    icon: FileText,
    view: "invoice-creator"
  },
  {
    title: "Projects",
    icon: Briefcase,
    view: "projects"
  },
  {
    title: "To-Do List",
    icon: CheckSquare,
    view: "todo-list"
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments"
  },
  {
    title: "E-Signatures",
    icon: Signature,
    view: "e-signatures"
  },
  {
    title: "Contracts",
    icon: PenTool,
    view: "contracts"
  },
  {
    title: "Settings",
    icon: Settings,
    view: "settings"
  }
]

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  console.log('AppSidebar rendering with activeView:', activeView)
  console.log('MenuItems:', menuItems)
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Business Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                console.log('Rendering menu item:', item.title)
                return (
                  <SidebarMenuItem key={item.view}>
                    <SidebarMenuButton 
                      onClick={() => {
                        console.log('Clicked on:', item.view)
                        setActiveView(item.view)
                      }}
                      isActive={activeView === item.view}
                      className="cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
