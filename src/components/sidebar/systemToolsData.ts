
import { 
  Shield, Gift, Lightbulb, HelpCircle, MessageSquare, Crown, Settings 
} from "lucide-react"
import { MenuItem } from "./types"

export const systemTools: MenuItem[] = [
  {
    title: "Admin Panel",
    icon: Shield,
    view: "admin-panel"
  },
  {
    title: "Referrals",
    icon: Gift,
    view: "referrals"
  },
  {
    title: "Features",
    icon: Lightbulb,
    view: "features"
  },
  {
    title: "FAQ & Help",
    icon: HelpCircle,
    view: "faq-help"
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    view: "feedback"
  },
  {
    title: "Pricing Plans",
    icon: Crown,
    view: "pricing"
  },
  {
    title: "Settings",
    icon: Settings,
    view: "settings"
  }
]
