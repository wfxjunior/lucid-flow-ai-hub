
import { QuickAction } from './quickActionsUtils'

export const businessToolsActions: QuickAction[] = [
  {
    id: "estimates",
    title: "Estimates",
    description: "Create cost estimates",
    icon: "Calculator",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600"
  },
  {
    id: "contracts",
    title: "Contracts",
    description: "Manage contracts",
    icon: "FileText",
    color: "bg-teal-500",
    hoverColor: "hover:bg-teal-600"
  },
  {
    id: "payments",
    title: "Payment Tracking",
    description: "Track payment status",
    icon: "CreditCard",
    color: "bg-pink-500",
    hoverColor: "hover:bg-pink-600"
  },
  {
    id: "documents",
    title: "Document Manager",
    description: "Organize documents",
    icon: "FolderOpen",
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600"
  }
]
