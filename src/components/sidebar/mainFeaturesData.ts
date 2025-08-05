
import { 
  Home, FileText, Calendar, CreditCard, Signature, Mic, CalendarCheck
} from "lucide-react"
import { MenuItem } from "./types"

export const mainFeatures: MenuItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    view: "dashboard"
  },
  {
    title: "AI Voice",
    icon: Mic,
    view: "ai-voice"
  },
  {
    title: "Invoices",
    icon: FileText,
    view: "invoices"
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments"
  },
  {
    title: "Payments",
    icon: CreditCard,
    view: "payments"
  },
  {
    title: "E-Signatures",
    icon: Signature,
    view: "e-signatures"
  }
]
