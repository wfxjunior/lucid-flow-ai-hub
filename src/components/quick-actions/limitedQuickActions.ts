import { 
  FileText, 
  Users, 
  CreditCard, 
  Calculator,
  Calendar,
  Briefcase,
  Clock,
  Timeline
} from "lucide-react"
import { QuickAction } from "./quickActionsUtils"

export const limitedQuickActions: QuickAction[] = [
  // Existing actions
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
  // New actions row
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
    icon: Timeline,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600"
  }
]
