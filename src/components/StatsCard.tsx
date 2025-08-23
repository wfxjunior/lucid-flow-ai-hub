
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: keyof typeof import('lucide-react')
  trend: "up" | "down"
}

export function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  const trendIconName = trend === "up" ? "TrendingUp" : "TrendingDown"
  const trendTone = trend === "up" ? "success" : "danger"

  return (
    <Card className="dashboard-card hover-clean transition h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="kpi-label text-sm font-medium">
          {title}
        </CardTitle>
        <AppIcon name={icon} size="sm" tone="default" aria-hidden="true" />
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1">
        <div className="dashboard-number kpi-number text-2xl font-semibold">
          {value}
        </div>
        <div className="flex items-center mt-2">
          <AppIcon name={trendIconName as keyof typeof import('lucide-react')} size="sm" tone={trendTone} className="mr-1" aria-hidden="true" />
          <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
