
import { 
  FileText, 
  Users, 
  CreditCard, 
  Calculator,
  Calendar,
  Briefcase,
  Clock,
  GanttChart,
  FilePlus,
  Target,
  DollarSign,
  HeartHandshake
} from "lucide-react"
import { QuickAction } from "./quickActionsUtils"

export const limitedQuickActions: QuickAction[] = [
  // First row - existing actions
  {
    id: "create-invoice",
    title: "Create Invoice",
    description: "Generate new invoice",
    icon: FileText,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "customers",
    title: "Customers",
    description: "Manage customer data",
    icon: Users,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600"
  },
  {
    id: "payments",
    title: "Payments",
    description: "Track payment status",
    icon: CreditCard,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600"
  },
  {
    id: "estimates",
    title: "Estimates",
    description: "Create cost estimates",
    icon: Calculator,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600"
  },
  // Second row - existing actions
  {
    id: "appointments",
    title: "Appointments",
    description: "Schedule appointments",
    icon: Calendar,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600"
  },
  {
    id: "projects",
    title: "Projects",
    description: "Manage projects",
    icon: Briefcase,
    color: "bg-teal-500",
    hoverColor: "hover:bg-teal-600"
  },
  {
    id: "smart-schedule",
    title: "SmartSchedule",
    description: "AI-powered scheduling",
    icon: Clock,
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600"
  },
  {
    id: "project-timeline",
    title: "Project Timeline",
    description: "Track project progress",
    icon: GanttChart,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600"
  },
  // Third row - new actions
  {
    id: "add-invoice",
    title: "Add Invoice",
    description: "Quick invoice creation",
    icon: FilePlus,
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600"
  },
  {
    id: "easy-calc",
    title: "EasyCalc",
    description: "Simple calculations",
    icon: Calculator,
    color: "bg-amber-500",
    hoverColor: "hover:bg-amber-600"
  },
  {
    id: "earn-sync",
    title: "EarnSync",
    description: "Sync earnings data",
    icon: DollarSign,
    color: "bg-lime-500",
    hoverColor: "hover:bg-lime-600"
  },
  {
    id: "after-care",
    title: "After Care",
    description: "Customer follow-up",
    icon: HeartHandshake,
    color: "bg-rose-500",
    hoverColor: "hover:bg-rose-600"
  },
  // Fourth row - additional actions to reach 16
  {
    id: "reports",
    title: "Reports",
    description: "Business reports",
    icon: FileText,
    color: "bg-slate-500",
    hoverColor: "hover:bg-slate-600"
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Data insights",
    icon: Target,
    color: "bg-violet-500",
    hoverColor: "hover:bg-violet-600"
  },
  {
    id: "settings",
    title: "Settings",
    description: "App configuration",
    icon: Users,
    color: "bg-gray-500",
    hoverColor: "hover:bg-gray-600"
  },
  {
    id: "help",
    title: "Help",
    description: "Get support",
    icon: HeartHandshake,
    color: "bg-blue-400",
    hoverColor: "hover:bg-blue-500"
  }
]
