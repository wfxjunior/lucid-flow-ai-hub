
import { 
  Home, FileText, Calendar, CreditCard, Signature, Mic, CalendarCheck, Heart
} from "lucide-react"

export const mainFeaturesActions = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "View business overview",
    icon: Home,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "ai-voice",
    title: "AI Assistant",
    description: "Voice commands",
    icon: Mic,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600"
  },
  {
    id: "aftercare",
    title: "AfterCare",
    description: "Client feedback & relationships",
    icon: Heart,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "invoice-creator",
    title: "Create Invoice",
    description: "Generate a new invoice",
    icon: FileText,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600"
  },
  {
    id: "appointments",
    title: "Appointments",
    description: "Book an appointment",
    icon: Calendar,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600"
  },
  {
    id: "smart-schedule",
    title: "Smart Schedule",
    description: "Intelligent scheduling",
    icon: CalendarCheck,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600"
  },
  {
    id: "payments",
    title: "Process Payment",
    description: "Handle transactions",
    icon: CreditCard,
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600"
  },
  {
    id: "e-signatures",
    title: "Sign Document",
    description: "Electronic signatures",
    icon: Signature,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600"
  }
]
