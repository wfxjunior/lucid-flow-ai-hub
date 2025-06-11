
import { BarChart3, Gift, Lightbulb } from "lucide-react"

export const analyticsActions = [
  {
    id: "analytics",
    title: "View Reports",
    description: "Check business metrics",
    icon: BarChart3,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600"
  },
  {
    id: "referrals",
    title: "Referral Program",
    description: "Invite friends & earn",
    icon: Gift,
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700"
  },
  {
    id: "features",
    title: "Feature Requests",
    description: "Suggest new features",
    icon: Lightbulb,
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600"
  }
]
