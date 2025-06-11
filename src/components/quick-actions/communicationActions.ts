
import { Mail, MessageSquare, Send } from "lucide-react"

export const communicationActions = [
  {
    id: "email-center",
    title: "Email Center",
    description: "Manage emails",
    icon: Mail,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700"
  },
  {
    id: "messages",
    title: "Messages",
    description: "Chat messages",
    icon: MessageSquare,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700"
  },
  {
    id: "communication-hub",
    title: "Communication Hub",
    description: "Unified communications",
    icon: Send,
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700"
  }
]
