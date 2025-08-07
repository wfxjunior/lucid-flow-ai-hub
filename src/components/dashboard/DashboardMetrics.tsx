
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AlertCircle,
  TrendingUp,
  DollarSign
} from "lucide-react"

export function DashboardMetrics() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            Active Projects
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            No active projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            Conversion Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">-</div>
          <p className="text-xs text-muted-foreground">
            No data available
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">
            Average Deal Size
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">$0</div>
          <p className="text-xs text-muted-foreground">
            No deals completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
