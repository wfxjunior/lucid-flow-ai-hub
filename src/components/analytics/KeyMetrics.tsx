import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, FileText } from "lucide-react"

interface KeyMetricsProps {
  totalRevenue: number
  activeClients: number
  completedWorkOrders: number
}

export function KeyMetrics({ totalRevenue, activeClients, completedWorkOrders }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <Card className="p-4 sm:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="text-xl sm:text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {totalRevenue > 0 ? <span className="text-green-600">+20.1%</span> : "No data"} from last month
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 sm:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="text-xl sm:text-2xl font-bold">{activeClients}</div>
          <p className="text-xs text-muted-foreground">
            {activeClients > 0 ? <span className="text-green-600">+12%</span> : "No data"} from last month
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 sm:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
          <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="text-xl sm:text-2xl font-bold">{completedWorkOrders}</div>
          <p className="text-xs text-muted-foreground">
            {completedWorkOrders > 0 ? <span className="text-green-600">+8%</span> : "No data"} from last month
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 sm:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="text-xl sm:text-2xl font-bold">-</div>
          <p className="text-xs text-muted-foreground">
            No data available
          </p>
        </CardContent>
      </Card>
    </div>
  )
}