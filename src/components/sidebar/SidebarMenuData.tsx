import { Home, LayoutDashboard, Users, Calendar, FileText, MessageSquare, Settings, ListChecks, Store, PiggyBank, File, CheckCircle, ClipboardList, Wallet, Landmark } from "lucide-react"

interface SidebarMenuItem {
  title: string
  url?: string
  icon?: any
  description?: string
  items?: SidebarMenuItem[]
}

export const sidebarMenuData: SidebarMenuItem[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        description: "Overview of your business"
      },
      {
        title: "Careers",
        url: "/careers",
        icon: Users,
        description: "Join our team"
      },
    ]
  },
  {
    title: "Management",
    items: [
      {
        title: "Customers",
        url: "/customers",
        icon: Users,
        description: "Manage your clients"
      },
      {
        title: "Projects",
        url: "/projects",
        icon: Landmark,
        description: "Track ongoing projects"
      },
      {
        title: "Appointments",
        url: "/appointments",
        icon: Calendar,
        description: "Schedule and manage appointments"
      },
      {
        title: "Invoices",
        url: "/invoices",
        icon: FileText,
        description: "Create and manage invoices"
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: ListChecks,
        description: "Manage your to-do list"
      },
    ]
  },
  {
    title: "Communication",
    items: [
      {
        title: "Messages",
        url: "/messages",
        icon: MessageSquare,
        description: "Send emails and SMS to clients"
      },
      {
        title: "Email Settings",
        url: "/email-settings", 
        icon: Settings,
        description: "Configure your email credentials"
      },
    ]
  },
  {
    title: "Finance",
    items: [
      {
        title: "Products",
        url: "/products",
        icon: Store,
        description: "Manage your products"
      },
      {
        title: "Payments",
        url: "/payments",
        icon: PiggyBank,
        description: "Track incoming payments"
      },
      {
        title: "Expenses",
        url: "/expenses",
        icon: Wallet,
        description: "Manage business expenses"
      },
      {
        title: "Contracts",
        url: "/contracts",
        icon: File,
        description: "Manage legal agreements"
      },
    ]
  },
  {
    title: "E-Signatures",
    items: [
      {
        title: "Documents",
        url: "/esignatures",
        icon: CheckCircle,
        description: "Manage documents for e-signature"
      },
      {
        title: "Templates",
        url: "/esignature-templates",
        icon: ClipboardList,
        description: "Create reusable document templates"
      },
    ]
  },
]
