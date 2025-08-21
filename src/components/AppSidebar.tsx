
import React from "react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { mainFeatures } from "@/components/sidebar/mainFeaturesData"
import { systemTools } from "@/components/sidebar/systemToolsData"
import { UserGreeting } from "@/components/UserGreeting"

interface AppSidebarProps {
  setActiveView: (view: string) => void
  activeView: string
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  console.log('AppSidebar activeView:', activeView)

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-primary">FeatherBiz</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemTools.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <UserGreeting onNavigate={setActiveView} />
      </SidebarFooter>
    </Sidebar>
  )
}
