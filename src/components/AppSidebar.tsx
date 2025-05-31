
import { Home, FileText, Users, BarChart3, Calendar, Settings, Signature, PenTool, Briefcase, CheckSquare } from "lucide-react"
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
    <Sidebar className="border-r">
      <SidebarContent className="gap-0">
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Business Tools
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
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
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
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
