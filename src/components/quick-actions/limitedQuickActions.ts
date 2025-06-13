
import { 
  Home, Mic, Heart, Signature, Clipboard, Calculator, FileText
} from "lucide-react"

export const limitedQuickActions = [
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
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600"
  },
  {
    id: "aftercare",
    title: "AfterCare",
    description: "Client feedback & relationships",
    icon: Heart,
    color: "bg-gray-500",
    hoverColor: "hover:bg-gray-600"
  },
  {
    id: "e-signatures",
    title: "E-sign",
    description: "Electronic signatures",
    icon: Signature,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700"
  },
  {
    id: "feather-forms",
    title: "FeatherForms",
    description: "Build custom forms",
    icon: Clipboard,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700"
  },
  {
    id: "estimates",
    title: "Estimates",
    description: "Generate price quotes",
    icon: Calculator,
    color: "bg-gray-600",
    hoverColor: "hover:bg-gray-700"
  },
  {
    id: "invoice-creator",
    title: "Create Invoice",
    description: "Generate a new invoice",
    icon: FileText,
    color: "bg-blue-700",
    hoverColor: "hover:bg-blue-800"
  },
  {
    id: "easy-calc",
    title: "EasyCalc",
    description: "AI-powered smart estimates",
    icon: Calculator,
    color: "bg-green-700",
    hoverColor: "hover:bg-green-800"
  }
]
