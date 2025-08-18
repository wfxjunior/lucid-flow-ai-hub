
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { MenuItem } from "./types"

interface SidebarMenuSectionProps {
  items: MenuItem[]
  sectionTitle: string
  activeView: string
  onMenuClick: (view: string) => void
}

export function SidebarMenuSection({ 
  items, 
  sectionTitle, 
  activeView, 
  onMenuClick 
}: SidebarMenuSectionProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
        {sectionTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton
                onClick={() => onMenuClick(item.view)}
                isActive={activeView === item.view}
                className="w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:font-semibold data-[active=true]:border-l-2 data-[active=true]:border-primary"
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5 stroke-[1.5]" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
