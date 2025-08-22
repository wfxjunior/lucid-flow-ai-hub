
import React from "react"
import { 
  Home, Users, FileText, Calculator, Settings, CreditCard, Building, Wrench, 
  PlusCircle, LogOut, Mic, DollarSign, CheckCircle, Calendar, MessageSquare,
  BarChart3, UserPlus, Star, HelpCircle, MessageCircle, Mail, ClipboardList,
  PiggyBank, Receipt, Briefcase, Car, Target, Clock, FileSignature, 
  TrendingUp, Zap, Bot, Phone, Video, StickyNote, MapPin, Users2, 
  Package, Wallet, FileSpreadsheet, BookOpen, Award, Gift, Lightbulb
} from "lucide-react"
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
import { SidebarMenuSection } from "./sidebar/SidebarMenuSection"

interface AppSidebarProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export function AppSidebar({ setActiveView, activeView }: AppSidebarProps) {
  const { currentLanguage } = useLanguage()

  // Main Features
  const mainFeatures = [
    { 
      view: "dashboard", 
      icon: Home, 
      title: currentLanguage === 'pt' ? "Painel" : "Dashboard" 
    },
    { 
      view: "ai-voice", 
      icon: Mic, 
      title: currentLanguage === 'pt' ? "Assistente IA" : "AI Voice" 
    },
    { 
      view: "invoice-creator", 
      icon: FileText, 
      title: currentLanguage === 'pt' ? "Criar Fatura" : "Create Invoice" 
    },
    { 
      view: "estimates", 
      icon: Calculator, 
      title: currentLanguage === 'pt' ? "Orçamentos" : "Estimates" 
    },
    { 
      view: "payments", 
      icon: DollarSign, 
      title: currentLanguage === 'pt' ? "Pagamentos" : "Payments" 
    },
    { 
      view: "e-signatures", 
      icon: CheckCircle, 
      title: currentLanguage === 'pt' ? "Assinaturas" : "E-Signatures" 
    },
  ]

  // Core Business Tools
  const coreBusinessTools = [
    { 
      view: "customers", 
      icon: Users, 
      title: currentLanguage === 'pt' ? "Clientes" : "Customers" 
    },
    { 
      view: "projects", 
      icon: Briefcase, 
      title: currentLanguage === 'pt' ? "Projetos" : "Projects" 
    },
    { 
      view: "project-timeline", 
      icon: Clock, 
      title: currentLanguage === 'pt' ? "Timeline" : "Project Timeline" 
    },
    { 
      view: "tours", 
      icon: MapPin, 
      title: currentLanguage === 'pt' ? "Tours" : "Tours" 
    },
    { 
      view: "pipeline", 
      icon: Target, 
      title: currentLanguage === 'pt' ? "Pipeline" : "Pipeline" 
    },
    { 
      view: "smart-schedule", 
      icon: Calendar, 
      title: currentLanguage === 'pt' ? "Agendamento" : "Smart Schedule" 
    },
  ]

  // Financial Tools
  const financialTools = [
    { 
      view: "finance", 
      icon: PiggyBank, 
      title: currentLanguage === 'pt' ? "Finanças" : "Finance" 
    },
    { 
      view: "feather-budget", 
      icon: PlusCircle, 
      title: currentLanguage === 'pt' ? "Personal Budget Manager" : "Personal Budget Manager" 
    },
    { 
      view: "feather-tax", 
      icon: Receipt, 
      title: currentLanguage === 'pt' ? "FeatherTax" : "FeatherTax" 
    },
    { 
      view: "easy-calc", 
      icon: Calculator, 
      title: currentLanguage === 'pt' ? "EasyCalc" : "EasyCalc" 
    },
    { 
      view: "receipts", 
      icon: FileSpreadsheet, 
      title: currentLanguage === 'pt' ? "Recibos" : "Receipts" 
    },
    { 
      view: "accounting", 
      icon: BookOpen, 
      title: currentLanguage === 'pt' ? "Contabilidade" : "Accounting" 
    },
    { 
      view: "quotes", 
      icon: FileText, 
      title: currentLanguage === 'pt' ? "Cotações" : "Quotes" 
    },
  ]

  // Operations Tools
  const operationsTools = [
    { 
      view: "car-rental", 
      icon: Car, 
      title: currentLanguage === 'pt' ? "Aluguel Carros" : "Car Rental" 
    },
    { 
      view: "work-orders", 
      icon: Wrench, 
      title: currentLanguage === 'pt' ? "Ordens Serviço" : "Work Orders" 
    },
    { 
      view: "mat-track", 
      icon: Package, 
      title: currentLanguage === 'pt' ? "MatTrack" : "MatTrack" 
    },
    { 
      view: "crew-control", 
      icon: Users2, 
      title: currentLanguage === 'pt' ? "Controle Equipe" : "Crew Control" 
    },
    { 
      view: "earnsync", 
      icon: TrendingUp, 
      title: currentLanguage === 'pt' ? "EarnSync" : "EarnSync" 
    },
    { 
      view: "aftercare", 
      icon: Award, 
      title: currentLanguage === 'pt' ? "Pós-venda" : "AfterCare" 
    },
  ]

  // Documents & Forms
  const documentsAndForms = [
    { 
      view: "feather-forms", 
      icon: ClipboardList, 
      title: currentLanguage === 'pt' ? "FeatherForms" : "FeatherForms" 
    },
    { 
      view: "sales-orders", 
      icon: FileSignature, 
      title: currentLanguage === 'pt' ? "Pedidos Venda" : "Sales Orders" 
    },
    { 
      view: "business-proposals", 
      icon: Briefcase, 
      title: currentLanguage === 'pt' ? "Propostas" : "Business Proposals" 
    },
    { 
      view: "bids", 
      icon: Target, 
      title: currentLanguage === 'pt' ? "Licitações" : "Bids" 
    },
    { 
      view: "contracts", 
      icon: Building, 
      title: currentLanguage === 'pt' ? "Contratos" : "Contracts" 
    },
  ]

  // Productivity Tools
  const productivityTools = [
    { 
      view: "meetings", 
      icon: Video, 
      title: currentLanguage === 'pt' ? "Reuniões" : "Meetings" 
    },
    { 
      view: "todo-list", 
      icon: CheckCircle, 
      title: currentLanguage === 'pt' ? "Lista Tarefas" : "Todo List" 
    },
    { 
      view: "notes", 
      icon: StickyNote, 
      title: currentLanguage === 'pt' ? "Notas" : "Notes" 
    },
    { 
      view: "appointments", 
      icon: Calendar, 
      title: currentLanguage === 'pt' ? "Compromissos" : "Appointments" 
    },
  ]

  // Communication
  const communicationTools = [
    { 
      view: "messages", 
      icon: MessageSquare, 
      title: currentLanguage === 'pt' ? "Mensagens" : "Messages" 
    },
    { 
      view: "email-center", 
      icon: Mail, 
      title: currentLanguage === 'pt' ? "Centro Email" : "Email Center" 
    },
  ]

  // Analytics
  const analyticsTools = [
    { 
      view: "analytics", 
      icon: BarChart3, 
      title: currentLanguage === 'pt' ? "Análises" : "Analytics" 
    },
    { 
      view: "admin-panel", 
      icon: Settings, 
      title: currentLanguage === 'pt' ? "Painel Admin" : "Admin Panel" 
    },
  ]

  // General & Support
  const generalAndSupport = [
    { 
      view: "careers", 
      icon: UserPlus, 
      title: currentLanguage === 'pt' ? "Carreiras" : "Careers" 
    },
    { 
      view: "referrals", 
      icon: Gift, 
      title: currentLanguage === 'pt' ? "Indicações" : "Referrals" 
    },
    { 
      view: "features", 
      icon: Star, 
      title: currentLanguage === 'pt' ? "Recursos" : "Features" 
    },
    { 
      view: "faq-help", 
      icon: HelpCircle, 
      title: currentLanguage === 'pt' ? "FAQ & Ajuda" : "FAQ & Help" 
    },
    { 
      view: "feedback", 
      icon: MessageCircle, 
      title: currentLanguage === 'pt' ? "Feedback" : "Feedback" 
    },
    { 
      view: "pricing", 
      icon: CreditCard, 
      title: currentLanguage === 'pt' ? "Preços" : "Pricing" 
    },
    { 
      view: "settings", 
      icon: Settings, 
      title: currentLanguage === 'pt' ? "Configurações" : "Settings" 
    },
  ]

  return (
    <Sidebar className="bg-sidebar-background border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-primary">FeatherBiz</h2>
          <AuthLinks />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarMenuSection 
          items={mainFeatures}
          sectionTitle={currentLanguage === 'pt' ? 'Recursos Principais' : 'Main Features'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={coreBusinessTools}
          sectionTitle={currentLanguage === 'pt' ? 'Negócios Core' : 'Core Business'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={financialTools}
          sectionTitle={currentLanguage === 'pt' ? 'Ferramentas Financeiras' : 'Financial Tools'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={operationsTools}
          sectionTitle={currentLanguage === 'pt' ? 'Operações' : 'Operations'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={documentsAndForms}
          sectionTitle={currentLanguage === 'pt' ? 'Documentos & Formulários' : 'Documents & Forms'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={productivityTools}
          sectionTitle={currentLanguage === 'pt' ? 'Produtividade' : 'Productivity'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={communicationTools}
          sectionTitle={currentLanguage === 'pt' ? 'Comunicação' : 'Communication'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={analyticsTools}
          sectionTitle={currentLanguage === 'pt' ? 'Análises' : 'Analytics'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />

        <SidebarMenuSection 
          items={generalAndSupport}
          sectionTitle={currentLanguage === 'pt' ? 'Geral & Suporte' : 'General & Support'}
          activeView={activeView}
          onMenuClick={setActiveView}
        />
      </SidebarContent>
    </Sidebar>
  )
}
