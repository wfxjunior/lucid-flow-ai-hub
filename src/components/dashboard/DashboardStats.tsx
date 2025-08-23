
import { Card, CardContent } from "@/components/ui/card"
import { StatsCard } from "@/components/StatsCard"
import { 
  DollarSign, 
  Users, 
  FileText, 
  Target
} from "lucide-react"

interface DashboardStatsProps {
  stats: {
    monthlyRevenue: number
    activeCustomers: number
    pendingInvoices: number
    monthlyGoals: number
  }
  loading?: boolean
}

export function DashboardStats({ stats, loading }: DashboardStatsProps) {
  const statsCards = [
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers.toString(),
      change: "+5.2%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Pending Invoices",
      value: stats.pendingInvoices.toString(),
      change: "-8.1%",
      icon: FileText,
      trend: "down" as const
    },
    {
      title: "Monthly Goals",
      value: `${stats.monthlyGoals}%`,
      change: "+15.3%",
      icon: Target,
      trend: "up" as const
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="dashboard-card h-32">
            <CardContent className="pt-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div key={index} className="h-32">
          <StatsCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        </div>
      ))}
    </div>
  )
}
