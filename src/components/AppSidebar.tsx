
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
  const { language } = useLanguage()

  const menuItems = [
    { 
      id: "dashboard", 
      icon: Home, 
      label: language === 'pt' ? "Painel" : "Dashboard" 
    },
    { 
      id: "clients", 
      icon: Users, 
      label: language === 'pt' ? "Clientes" : "Clients" 
    },
    { 
      id: "estimates", 
      icon: FileText, 
      label: language === 'pt' ? "Orçamentos" : "Estimates" 
    },
    { 
      id: "invoices", 
      icon: Calculator, 
      label: language === 'pt' ? "Faturas" : "Invoices" 
    },
    { 
      id: "workorders", 
      icon: Wrench, 
      label: language === 'pt' ? "Ordens de Serviço" : "Work Orders" 
    },
    { 
      id: "contracts", 
      icon: Building, 
      label: language === 'pt' ? "Contratos" : "Contracts" 
    },
    { 
      id: "featherbudget", 
      icon: PlusCircle, 
      label: language === 'pt' ? "Orçamento FeatherBudget" : "FeatherBudget" 
    },
  ]

  const bottomMenuItems = [
    { 
      id: "settings", 
      icon: Settings, 
      label: language === 'pt' ? "Configurações" : "Settings" 
    },
    { 
      id: "upgrade", 
      icon: CreditCard, 
      label: language === 'pt' ? "Atualizar Plano" : "Upgrade" 
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
            {language === 'pt' ? 'Menu Principal' : 'Main Menu'}
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
