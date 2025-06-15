
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
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Business Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          
          {/* Refresh Button */}
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
            className="self-start sm:self-center w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh'}
          </Button>
        </div>

        {/* Mobile-Optimized Action Buttons */}
        {isMobile ? (
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => onNavigate('ai-voice')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3"
              size="lg"
            >
              <Mic className="h-5 w-5" />
              AI Voice Assistant
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => onNavigate('analytics')}
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 w-full"
                size="sm"
              >
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button
                onClick={() => onNavigate('invoice-creator')}
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 w-full"
                size="sm"
              >
                <Zap className="h-4 w-4" />
                Create Invoice
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onNavigate('ai-voice')}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Mic className="h-4 w-4" />
              AI Voice Assistant
            </Button>
            <Button
              onClick={() => onNavigate('analytics')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              View Analytics
            </Button>
            <Button
              onClick={() => onNavigate('invoice-creator')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        )}
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
