
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, FileText, UserCheck, Package, Car, Calendar, Video, Calculator, Zap, MessageSquare, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"

const menu = [
  { title: "Home", icon: Home, path: "/landing" },
  { title: "AI Invoice", icon: FileText, path: "/features-overview#ai-invoice" },
  { title: "Crew Control", icon: UserCheck, path: "/features-overview#crew-control" },
  { title: "MatTrack", icon: Package, path: "/features-overview#mattrack" },
  { title: "Car Rental", icon: Car, path: "/car-rental" },
  { title: "Smart Schedule", icon: Calendar, path: "/features-overview#smart-schedule" },
  { title: "Meetings", icon: Video, path: "/features-overview#meetings" },
  { title: "Estimates", icon: Calculator, path: "/features-overview#estimates" },
  { title: "More", icon: Zap, path: "/features-overview" },
]

export function LandingSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 h-10">
          <span className="text-primary font-extrabold text-xl">FeatherBiz</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    onClick={() => {
                      navigate(item.path)
                      if (onNavigate) { onNavigate() }
                    }}
                    className="gap-2"
                  >
                    <span>
                      <item.icon className="h-4 w-4 mr-1 inline" />
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
