
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
    <Card className="fb-card hover:shadow-sm transition-shadow duration-200 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="fb-metric-label fb-text-sm font-medium">
          {title}
        </CardTitle>
        <AppIcon name={icon} size="sm" tone="default" className="fb-icon-sm text-muted-foreground" aria-hidden={true} />
      </CardHeader>
      <CardContent className="flex flex-col justify-between flex-1 pt-0">
        <div className="fb-metric-value fb-text-2xl font-semibold text-foreground mb-2">
          {value}
        </div>
        <div className="flex items-center">
          <AppIcon 
            name={trendIconName as keyof typeof import('lucide-react')} 
            size="sm" 
            tone={trendTone} 
            className="fb-icon-sm mr-1" 
            aria-hidden={true} 
          />
          <span className={`fb-text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
