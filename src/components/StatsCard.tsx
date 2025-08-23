
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
  const trendColor = trend === "up" ? "text-emerald-600" : "text-red-600"

  return (
    <Card className="dashboard-card hover:shadow-sm transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="kpi-label text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <AppIcon 
          name={icon} 
          size="sm" 
          tone="default" 
          className="h-4 w-4 text-muted-foreground" 
          aria-hidden={true} 
        />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="kpi-number text-2xl font-semibold text-foreground mb-3">
          {value}
        </div>
        <div className="flex items-center">
          <AppIcon 
            name={trendIconName as keyof typeof import('lucide-react')} 
            size="sm" 
            tone={trend === "up" ? "success" : "danger"} 
            className="h-3 w-3 mr-1" 
            aria-hidden={true} 
          />
          <span className={`text-xs font-medium ${trendColor}`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
