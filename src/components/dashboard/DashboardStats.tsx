
import { Card, CardContent } from "@/components/ui/card"
import { StatsCard } from "@/components/StatsCard"

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
      icon: "DollarSign" as keyof typeof import('lucide-react'),
      trend: "up" as const
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers.toString(),
      change: "+5.2%",
      icon: "Users" as keyof typeof import('lucide-react'),
      trend: "up" as const
    },
    {
      title: "Pending Invoices",
      value: stats.pendingInvoices.toString(),
      change: "-8.1%",
      icon: "FileText" as keyof typeof import('lucide-react'),
      trend: "down" as const
    },
    {
      title: "Monthly Goals",
      value: `${stats.monthlyGoals}%`,
      change: "+15.3%",
      icon: "Target" as keyof typeof import('lucide-react'),
      trend: "up" as const
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="dashboard-card">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
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
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  )
}
