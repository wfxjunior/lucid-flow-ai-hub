
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
  Home, BarChart3, Building, Users, FileText, Calendar, CreditCard, 
  Settings, Mic, Heart, Clock, PenTool, CheckSquare, Package, 
  Clipboard, DollarSign, Calculator, TrendingUp, Receipt, 
  FileSpreadsheet, GitBranch, Car, Warehouse, UserCheck, Target, 
  StickyNote, Video, PiggyBank, Briefcase, GanttChart
} from 'lucide-react';

interface AppSidebarProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  const { currentLanguage } = useLanguage();
  
  const mainFeatures = [
    { title: 'Dashboard', icon: Home, view: 'overview' },
    { title: 'AI Voice', icon: Mic, view: 'ai-voice' },
    { title: 'Analytics', icon: BarChart3, view: 'analytics' },
    { title: 'Business', icon: Building, view: 'business' },
    { title: 'AfterCare', icon: Heart, view: 'aftercare' },
    { title: 'Smart Schedule', icon: Clock, view: 'smart-schedule' }
  ];

  const coreBusinessTools = [
    { title: 'Customers', icon: Users, view: 'customer-management' },
    { title: 'Projects', icon: Briefcase, view: 'projects' },
    { title: 'Project Timeline', icon: GanttChart, view: 'project-timeline' },
    { title: 'Sales Pipeline', icon: GitBranch, view: 'pipeline' },
    { title: 'Work Orders', icon: Package, view: 'work-orders' },
    { title: 'Appointments', icon: Calendar, view: 'appointments' },
    { title: 'Invoices', icon: FileText, view: 'invoices' },
    { title: 'Payments', icon: CreditCard, view: 'payments' },
    { title: 'E-Signatures', icon: PenTool, view: 'e-signatures' }
  ];

  const financialTools = [
    { title: 'FeatherBudget AI', icon: PiggyBank, view: 'feather-budget' },
    { title: 'FeatherTax', icon: Calculator, view: 'feather-tax' },
    { title: 'EasyCalc', icon: Calculator, view: 'easy-calc' },
    { title: 'Accounting', icon: Receipt, view: 'accounting' },
    { title: 'Quotes', icon: FileSpreadsheet, view: 'quotes' },
    { title: 'Estimates', icon: Calculator, view: 'estimates' },
    { title: 'Receipts', icon: Receipt, view: 'receipts' },
    { title: 'EarnSync', icon: Target, view: 'earnsync' }
  ];

  const operationsTools = [
    { title: 'Car Rental', icon: Car, view: 'car-rental' },
    { title: 'MatTrack', icon: Warehouse, view: 'mat-track' },
    { title: 'CrewControl', icon: UserCheck, view: 'crew-control' },
    { title: 'FeatherForms', icon: Clipboard, view: 'feather-forms' },
    { title: 'Sales Orders', icon: TrendingUp, view: 'sales-orders' },
    { title: 'Business Proposals', icon: Clipboard, view: 'business-proposals' },
    { title: 'Bids', icon: DollarSign, view: 'bids' },
    { title: 'Contracts', icon: PenTool, view: 'contracts' }
  ];

  const productivityTools = [
    { title: 'Meetings', icon: Video, view: 'meetings' },
    { title: 'To-Do List', icon: CheckSquare, view: 'todo-list' },
    { title: 'Notes', icon: StickyNote, view: 'notes' }
  ];

  const renderMenuSection = (items: any[], title: string) => (
    <SidebarGroup className="mb-4">
      <SidebarGroupLabel className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
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
                <item.icon className="mr-3 h-4 w-4 text-slate-600" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-slate-200 bg-white w-64">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <h2 className="text-lg font-semibold text-slate-900">FeatherBiz</h2>
        <p className="text-sm text-slate-600">Business Suite</p>
      </SidebarHeader>
      
      <SidebarContent className="p-4 overflow-y-auto">
        {renderMenuSection(mainFeatures, 'Main Features')}
        {renderMenuSection(coreBusinessTools, 'Core Business')}
        {renderMenuSection(financialTools, 'Financial Tools')}
        {renderMenuSection(operationsTools, 'Operations')}
        {renderMenuSection(productivityTools, 'Productivity')}

        <SidebarGroup>
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
                <Settings className="mr-3 h-4 w-4 text-slate-600" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
