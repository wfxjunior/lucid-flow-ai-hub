
import React from "react"
import { Home, Users, FileText, Calculator, Settings, CreditCard, Building, Wrench, PlusCircle, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/LanguageContext"
import { AuthLinks } from "@/components/navigation/AuthLinks"

interface AppSidebarProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  const { currentLanguage } = useLanguage()

  const menuItems = [
    { 
      id: "dashboard", 
      icon: Home, 
      label: currentLanguage === 'pt' ? "Painel" : "Dashboard" 
    },
    { 
      id: "clients", 
      icon: Users, 
      label: currentLanguage === 'pt' ? "Clientes" : "Clients" 
    },
    { 
      id: "estimates", 
      icon: FileText, 
      label: currentLanguage === 'pt' ? "Orçamentos" : "Estimates" 
    },
    { 
      id: "invoices", 
      icon: Calculator, 
      label: currentLanguage === 'pt' ? "Faturas" : "Invoices" 
    },
    { 
      id: "workorders", 
      icon: Wrench, 
      label: currentLanguage === 'pt' ? "Ordens de Serviço" : "Work Orders" 
    },
    { 
      id: "contracts", 
      icon: Building, 
      label: currentLanguage === 'pt' ? "Contratos" : "Contracts" 
    },
    { 
      id: "featherbudget", 
      icon: PlusCircle, 
      label: currentLanguage === 'pt' ? "Orçamento FeatherBudget" : "FeatherBudget" 
    },
  ]

  const bottomMenuItems = [
    { 
      id: "settings", 
      icon: Settings, 
      label: currentLanguage === 'pt' ? "Configurações" : "Settings" 
    },
    { 
      id: "upgrade", 
      icon: CreditCard, 
      label: currentLanguage === 'pt' ? "Atualizar Plano" : "Upgrade" 
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">FeatherBiz</h2>
          <AuthLinks />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {currentLanguage === 'pt' ? 'Menu Principal' : 'Main Menu'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.id)}
                isActive={activeView === item.id}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
