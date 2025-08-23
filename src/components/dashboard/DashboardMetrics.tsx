
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <Card className="dashboard-card hover-clean transition h-32">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="kpi-label">
            Active Projects
          </CardTitle>
          <AppIcon name="AlertCircle" size="sm" tone="default" aria-hidden={true} />
        </CardHeader>
        <CardContent>
          <div className="dashboard-number kpi-number">0</div>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
            No active projects
          </p>
        </CardContent>
      </Card>

      <Card className="dashboard-card hover-clean transition h-32">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="kpi-label">
            Conversion Rate
          </CardTitle>
          <AppIcon name="TrendingUp" size="sm" tone="success" aria-hidden={true} />
        </CardHeader>
        <CardContent>
          <div className="dashboard-number kpi-number">-</div>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
            No data available
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 xl:col-span-1 dashboard-card hover-clean transition h-32">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="kpi-label">
            Average Deal Size
          </CardTitle>
          <AppIcon name="DollarSign" size="sm" tone="warning" aria-hidden={true} />
        </CardHeader>
        <CardContent>
          <div className="dashboard-number kpi-number">$0</div>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
            No deals completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
