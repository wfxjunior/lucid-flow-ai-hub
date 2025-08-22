
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  Users, 
  CheckCircle2,
  TrendingUp
} from "lucide-react"

interface KeyMetricsProps {
  totalRevenue: number
  activeClients: number
  completedWorkOrders: number
}

export function KeyMetrics({ totalRevenue, activeClients, completedWorkOrders }: KeyMetricsProps) {
  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      description: "This month",
      icon: DollarSign,
      trend: "+12.5%"
    },
    {
      title: "Active Clients",
      value: activeClients.toString(),
      description: "Currently active",
      icon: Users,
      trend: "+3.2%"
    },
    {
      title: "Completed Jobs",
      value: completedWorkOrders.toString(),
      description: "This month",
      icon: CheckCircle2,
      trend: "+8.1%"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="kpi-label">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 dashboard-icon" />
          </CardHeader>
          <CardContent>
            <div className="dashboard-number kpi-number">{metric.value}</div>
            <p className="text-xs mt-1" style={{ color: 'var(--fg-subtle)' }}>
              {metric.description}
            </p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: '#10b981' }} />
              <span className="text-xs font-medium" style={{ color: '#10b981' }}>
                {metric.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
