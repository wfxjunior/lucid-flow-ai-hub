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
  Sun,
  Globe,
  Lightbulb
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar 
} from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { t } = useLanguage()
  const { setOpenMobile } = useSidebar()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(newTheme)
    
    // Also set the data attribute for better compatibility
    root.setAttribute("data-theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

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
          <div>
            <h1 className="text-xl font-bold text-blue-600">FeatherBiz</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Business Platform</p>
          </div>
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Features */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Features</SidebarGroupLabel>
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

        {/* Business Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>Business Tools</SidebarGroupLabel>
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

        {/* Communication */}
        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
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

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
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

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
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

        {/* Feature Requests - Separate item */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleMenuClick("features")}
                  isActive={activeView === "features"}
                  className="w-full justify-start"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Feature Requests</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="text-sm">Dark Mode</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-6 w-12 p-0"
            >
              <div className={`w-11 h-6 rounded-full border-2 transition-colors ${
                theme === "dark" ? "bg-primary border-primary" : "bg-input border-input"
              }`}>
                <div className={`w-5 h-5 rounded-full bg-background shadow-sm transition-transform ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`} />
              </div>
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Globe className="h-4 w-4" />
            <LanguageSelector />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
