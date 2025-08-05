
import { Mail, MessageSquare, Send } from "lucide-react"
import { MenuItem } from "./types"

export const communication: MenuItem[] = [
  {
    title: "Central de Emails",
    icon: Mail,
    view: "email-center"
  },
  {
    title: "Messages",
    icon: MessageSquare,
    view: "messages"
  },
  {
    title: "Communication Hub",
    icon: Send,
    view: "communication-hub"
  }
]
