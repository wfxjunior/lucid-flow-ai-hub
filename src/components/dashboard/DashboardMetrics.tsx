
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AlertCircle,
  TrendingUp,
  DollarSign
} from "lucide-react"

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Card className="bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">
            Active Projects
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>0</div>
          <p className="text-sm text-slate-500 font-medium">
            No active projects
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">
            Conversion Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>-</div>
          <p className="text-sm text-slate-500 font-medium">
            No data available
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 xl:col-span-1 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-700">
            Average Deal Size
          </CardTitle>
          <DollarSign className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>$0</div>
          <p className="text-sm text-slate-500 font-medium">
            No deals completed
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
