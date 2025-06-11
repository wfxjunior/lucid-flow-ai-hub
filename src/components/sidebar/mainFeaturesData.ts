
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
    title: "Create Invoice",
    icon: FileText,
    view: "invoice-creator"
  },
  {
    title: "Appointments",
    icon: Calendar,
    view: "appointments"
  },
  {
    title: "Smart Schedule",
    icon: CalendarCheck,
    view: "smart-schedule"
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
