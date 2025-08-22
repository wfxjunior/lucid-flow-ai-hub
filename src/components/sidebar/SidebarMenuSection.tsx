
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
      <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2">
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
                  w-full justify-start px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 
                  ${activeView === item.view 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
