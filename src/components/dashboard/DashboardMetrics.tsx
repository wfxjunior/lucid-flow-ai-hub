
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card className="dashboard-card hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="kpi-label text-sm font-medium text-muted-foreground">
            Active Projects
          </CardTitle>
          <AppIcon name="AlertCircle" size="sm" tone="default" className="h-4 w-4 text-muted-foreground" aria-hidden={true} />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="kpi-number text-2xl font-semibold text-foreground mb-2">0</div>
          <p className="text-xs text-muted-foreground">
            No active projects
          </p>
        </CardContent>
      </Card>

      <Card className="dashboard-card hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="kpi-label text-sm font-medium text-muted-foreground">
            Conversion Rate
          </CardTitle>
          <AppIcon name="TrendingUp" size="sm" tone="success" className="h-4 w-4 text-muted-foreground" aria-hidden={true} />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="kpi-number text-2xl font-semibold text-foreground mb-2">-</div>
          <p className="text-xs text-muted-foreground">
            No data available
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 xl:col-span-1 dashboard-card hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="kpi-label text-sm font-medium text-muted-foreground">
            Average Deal Size
          </CardTitle>
          <AppIcon name="DollarSign" size="sm" tone="warning" className="h-4 w-4 text-muted-foreground" aria-hidden={true} />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="kpi-number text-2xl font-semibold text-foreground mb-2">$0</div>
          <p className="text-xs text-muted-foreground">
            No deals completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
