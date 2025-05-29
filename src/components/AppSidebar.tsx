
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Eye,
  Mic,
  FolderOpen,
  Calendar,
  CreditCard,
  Signature,
  DollarSign,
  Mail,
  MessageSquare,
  Send,
  Heart,
  HelpCircle,
  Crown,
  Settings,
  Moon,
  Globe
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { Icons } from "@/components/icons"
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
  useSidebar 
} from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/LanguageContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSelector } from "@/components/LanguageSelector"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { t } = useLanguage()
  const { setOpenMobile } = useSidebar()

  const mainFeatures = [
    {
      id: "dashboard",
      title: t("sidebar.dashboard"),
      icon: LayoutDashboard,
    },
    {
      id: "ai-voice",
      title: t("sidebar.aiVoice"),
      icon: Mic,
    },
    {
      id: "create-invoice",
      title: t("sidebar.createInvoice"),
      icon: FileText,
    },
    {
      id: "appointments",
      title: "Appointments",
      icon: Calendar,
    },
    {
      id: "payments",
      title: "Payments",
      icon: CreditCard,
    },
    {
      id: "e-signatures",
      title: "E-Signatures",
      icon: Signature,
    },
  ]

  const businessTools = [
    {
      id: "customers",
      title: t("sidebar.customers"),
      icon: Users,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderOpen,
    },
    {
      id: "quotes",
      title: "Quotes",
      icon: FileText,
    },
    {
      id: "receipts",
      title: "Receipts & Accounting",
      icon: FolderOpen,
    },
    {
      id: "sales-orders",
      title: "Sales Orders",
      icon: BarChart3,
    },
    {
      id: "service-orders",
      title: "Service Orders",
      icon: Eye,
    },
    {
      id: "business-proposals",
      title: "Business Proposals",
      icon: FileText,
    },
    {
      id: "bids",
      title: "Bids",
      icon: DollarSign,
    },
  ]

  const communication = [
    {
      id: "email-center",
      title: "Email Center",
      icon: Mail,
    },
    {
      id: "messages",
      title: "Messages",
      icon: MessageSquare,
    },
    {
      id: "communication-hub",
      title: "Communication Hub",
      icon: Send,
    },
  ]

  const analytics = [
    {
      id: "analytics",
      title: t("sidebar.analytics"),
      icon: BarChart3,
    },
    {
      id: "family-savings",
      title: "My Family Savings",
      icon: Heart,
    },
  ]

  const system = [
    {
      id: "faq",
      title: "FAQ & Help",
      icon: HelpCircle,
    },
    {
      id: "pricing",
      title: "Pricing Plans",
      icon: Crown,
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
    },
  ]

  const handleMenuClick = (itemId: string) => {
    setActiveView(itemId)
    setOpenMobile(false)
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-blue-600">FeatherBiz</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Business Platform</p>
          </div>
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-2">
            Main Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-2">
            Business Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessTools.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-2">
            Communication
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communication.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-2">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analytics.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
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
          <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {system.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
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

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span className="text-sm">Dark Mode</span>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Language</span>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
