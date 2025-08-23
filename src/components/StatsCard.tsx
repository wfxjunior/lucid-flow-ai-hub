
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down"
}

export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600"

  return (
    <Card className="dashboard-card hover-clean transition h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="kpi-label text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 dashboard-icon" />
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <div className="dashboard-number kpi-number text-2xl font-semibold">
          {value}
        </div>
        <div className="flex items-center mt-2">
          <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
          <span className={`text-xs font-medium ${trendColor}`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
