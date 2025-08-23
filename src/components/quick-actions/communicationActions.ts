
import { QuickAction } from './quickActionsUtils'

export const communicationActions: QuickAction[] = [
  {
    id: "email-templates",
    title: "Email Templates",
    description: "Professional email templates",
    icon: "Mail",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage notifications",
    icon: "Bell",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600"
  },
  {
    id: "client-portal",
    title: "Client Portal",
    description: "Client communication hub",
    icon: "MessageSquare",
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600"
  }
]
