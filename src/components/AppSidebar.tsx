
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { 
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  CreditCard,
  Settings,
  Building
} from 'lucide-react';

interface AppSidebarProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  const { currentLanguage } = useLanguage();
  
  const navigationItems = [
    {
      title: 'Overview',
      icon: Home,
      view: 'overview'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      view: 'analytics'
    },
    {
      title: 'Business',
      icon: Building,
      view: 'business'
    }
  ];

  const managementItems = [
    {
      title: 'Customers',
      icon: Users,
      view: 'customers'
    },
    {
      title: 'Invoices',
      icon: FileText,
      view: 'invoices'
    },
    {
      title: 'Appointments',
      icon: Calendar,
      view: 'appointments'
    },
    {
      title: 'Payments',
      icon: CreditCard,
      view: 'payments'
    }
  ];

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">FeatherBiz</h2>
        <p className="text-sm text-slate-600">Dashboard</p>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeView === item.view
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-slate-600" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                    className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeView === item.view
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-slate-600" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('settings')}
                isActive={activeView === 'settings'}
                className={`w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeView === 'settings'
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="mr-3 h-5 w-5 text-slate-600" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
