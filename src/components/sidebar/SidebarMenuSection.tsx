
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MenuItem } from "./SidebarMenuData"

interface SidebarMenuSectionProps {
  items: MenuItem[]
  sectionTitle: string
  activeView: string
  onMenuClick: (view: string) => void
}

export function SidebarMenuSection({ items, sectionTitle, activeView, onMenuClick }: SidebarMenuSectionProps) {
  return (
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="px-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
        {sectionTitle}
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.view}>
              <SidebarMenuButton 
                onClick={() => onMenuClick(item.view)}
                isActive={activeView === item.view}
                className="w-full flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 cursor-pointer"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
