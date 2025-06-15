
import { Button } from "@/components/ui/button"
import { RefreshCw, Mic, BarChart3, Zap } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardHeaderProps {
  onNavigate: (view: string) => void
  onRefresh: () => void
  loading: boolean
  error: string | null
}

export function DashboardHeader({ onNavigate, onRefresh, loading, error }: DashboardHeaderProps) {
  const isMobile = useIsMobile()

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Business Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        
        {/* Refresh Button */}
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          disabled={loading}
          className="w-full rounded-xl py-5 text-base font-medium flex items-center justify-center"
        >
          <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Updating...' : 'Refresh'}
        </Button>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <Button
            onClick={() => onNavigate('ai-voice')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-5 text-base font-semibold rounded-xl"
            size="lg"
          >
            <Mic className="h-5 w-5 mr-2" />
            AI Voice Assistant
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              onClick={() => onNavigate('analytics')}
              variant="outline"
              className="w-full flex items-center justify-center py-5 text-base font-medium rounded-xl"
              size="lg"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </Button>
            <Button
              onClick={() => onNavigate('invoice-creator')}
              variant="outline"
              className="w-full flex items-center justify-center py-5 text-base font-medium rounded-xl"
              size="lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}

