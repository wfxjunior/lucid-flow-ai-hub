
import { QuickAction } from './quickActionsUtils'

export const analyticsActions: QuickAction[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Business overview",
    icon: "BarChart3",
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600"
  },
  {
    id: "reports",
    title: "Reports",
    description: "Generate business reports",
    icon: "TrendingUp",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600"
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Detailed analytics",
    icon: "PieChart",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600"
  }
]
