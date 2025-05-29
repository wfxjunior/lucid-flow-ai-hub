import {
  BarChart3,
  CheckSquare,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  Workflow,
  Mail,
  CreditCard,
  Brain,
  Receipt,
  Calendar,
  DollarSign,
  FolderOpen,
  Signature,
  TrendingUp,
  FileCheck,
  Send,
  Heart,
  Mic,
  Crown,
  HelpCircle
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LanguageSelector } from "./LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"
import { ThemeToggle } from "./ThemeToggle"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { t } = useLanguage()

  const mainFeatures = [
    {
      title: t("nav.dashboard"),
      id: "dashboard",
      icon: Home,
    },
    {
      title: t("nav.ai-voice"),
      id: "ai-voice",
      icon: Mic,
    },
    {
      title: t("nav.create-invoice"),
      id: "create-invoice",
      icon: FileText,
    },
    {
      title: t("nav.appointments"),
      id: "appointments",
      icon: Calendar,
    },
    {
      title: t("nav.payments"),
      id: "payments",
      icon: CreditCard,
    },
    {
      title: t("nav.e-signatures"),
      id: "e-signatures",
      icon: Signature,
    },
  ]

  const businessTools = [
    {
      title: t("nav.customers"),
      id: "customers",
      icon: Users,
    },
    {
      title: t("nav.projects"),
      id: "projects",
      icon: Workflow,
    },
    {
      title: t("nav.quotes"),
      id: "quotes",
      icon: Receipt,
    },
    {
      title: t("nav.receipts"),
      id: "receipts",
      icon: FolderOpen,
    },
    {
      title: t("nav.sales-orders"),
      id: "sales-orders",
      icon: TrendingUp,
    },
    {
      title: t("nav.service-orders"),
      id: "service-orders",
      icon: FileCheck,
    },
    {
      title: t("nav.proposals"),
      id: "proposals",
      icon: FileText,
    },
    {
      title: t("nav.bids"),
      id: "bids",
      icon: DollarSign,
    },
  ]

  const communication = [
    {
      title: t("nav.email"),
      id: "email",
      icon: Mail,
    },
    {
      title: t("nav.messages"),
      id: "messages",
      icon: MessageSquare,
    },
    {
      title: t("nav.communication"),
      id: "communication",
      icon: Send,
    },
  ]

  const analytics = [
    {
      title: t("nav.analytics"),
      id: "analytics",
      icon: BarChart3,
    },
    {
      title: t("nav.family-savings"),
      id: "family-savings",
      icon: Heart,
    },
  ]

  const settings = [
    {
      title: t("nav.faq"),
      id: "faq",
      icon: HelpCircle,
    },
    {
      title: t("nav.pricing"),
      id: "pricing",
      icon: Crown,
    },
    {
      title: t("nav.settings"),
      id: "settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Hubsfy
          </h1>
          <p className="text-sm text-muted-foreground">{t('common.subtitle')}</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
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
          <SidebarGroupLabel>Business Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessTools.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
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
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communication.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
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
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analytics.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
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
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t pt-4 space-y-4">
          <div className="px-3">
            <ThemeToggle />
          </div>
          <LanguageSelector />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
