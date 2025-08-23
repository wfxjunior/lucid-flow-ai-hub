
import { QuickAction } from './quickActionsUtils'

export const mainFeaturesActions: QuickAction[] = [
  {
    id: "invoice-creator",
    title: "Invoice Creator",
    description: "Create professional invoices",
    icon: "FileText",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "customers",
    title: "Customer Management",
    description: "Manage your client database",
    icon: "Users",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600"
  },
  {
    id: "projects",
    title: "Project Tracker",
    description: "Track project progress",
    icon: "Briefcase",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600"
  },
  {
    id: "appointments",
    title: "Appointment Scheduler",
    description: "Schedule and manage appointments",
    icon: "Calendar",
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600"
  }
]
