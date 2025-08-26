
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="px-2 py-1 text-xs">{sectionTitle}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton 
                isActive={activeView === item.view}
                onClick={() => onMenuClick(item.view)}
                className="w-full justify-start h-7 px-2 py-1 text-xs"
                size="sm"
              >
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
