
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Eye,
  Mic,
  FolderOpen
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { Icons } from "@/components/icons"
import { useSidebar } from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/LanguageContext"

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const { t } = useLanguage()
  const { setOpenMobile } = useSidebar()

  const menuItems = [
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
      id: "customers",
      title: t("sidebar.customers"),
      icon: Users,
    },
    {
      id: "analytics",
      title: t("sidebar.analytics"),
      icon: BarChart3,
    },
    {
      id: "document-tracker",
      title: t("sidebar.documentTracker"),
      icon: Eye,
    },
    {
      id: "files",
      title: "File Manager",
      icon: FolderOpen,
    },
    {
      id: "pdf-generator",
      title: "PDF Generator",
      icon: FileText,
    },
  ]

  return (
    <aside className="bg-secondary border-r h-screen w-60 flex-none overflow-y-auto">
      <div className="p-4">
        <NavLink to="/" className="flex items-center gap-2 font-bold">
          <Icons.logo className="h-6 w-6" />
          <span>FeatherBIZ</span>
        </NavLink>
      </div>

      <ul className="space-y-1 py-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={`/dashboard?view=${item.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors ${
                  isActive ? "bg-muted font-medium" : "text-muted-foreground"
                }`
              }
              onClick={() => {
                setActiveView(item.id)
                setOpenMobile(false)
              }}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
