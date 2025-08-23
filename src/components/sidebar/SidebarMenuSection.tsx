
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
    <SidebarGroup className="mb-6">
      <SidebarGroupLabel className="fb-text-xs font-medium text-muted-foreground px-3 py-2 uppercase tracking-wider">
        {sectionTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton
                onClick={() => onMenuClick(item.view)}
                isActive={activeView === item.view}
                className={`
                  w-full justify-start px-3 py-2 fb-text-sm font-medium rounded-lg 
                  transition-all duration-200 hover:bg-accent hover:text-accent-foreground 
                  ${activeView === item.view 
                    ? 'fb-sidebar-active font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {item.icon && <item.icon className="fb-icon-sm mr-3 stroke-current" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
