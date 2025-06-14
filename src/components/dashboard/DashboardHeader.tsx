
import { Button } from "@/components/ui/button"
import { 
  BarChart3,
  Zap,
  RefreshCw,
  Mic,
  AlertCircle
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface DashboardHeaderProps {
  onNavigate: (view: string) => void
  onRefresh: () => void
  loading?: boolean
  error?: string | null
}

export function DashboardHeader({ onNavigate, onRefresh, loading, error }: DashboardHeaderProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Business Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Business Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading dashboard data: {error}</p>
            </div>
            <Button onClick={onRefresh} variant="outline" className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Business Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => onNavigate('ai-voice')} className="w-full sm:w-auto">
          <Mic className="mr-2 h-4 w-4" />
          AI Voice Assistant
        </Button>
        <Button variant="outline" onClick={() => onNavigate('analytics')} className="w-full sm:w-auto">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
        <Button onClick={() => onNavigate('invoice-creator')} variant="outline" className="w-full sm:w-auto">
          <Zap className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
        <Button variant="outline" onClick={onRefresh} size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
