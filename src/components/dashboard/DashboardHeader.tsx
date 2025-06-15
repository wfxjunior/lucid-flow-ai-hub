
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
    <div className="space-y-4 w-full max-w-screen-xl mx-auto pt-4">
      {/* Main Header */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Business Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Refresh Button */}
        <div className="w-full flex justify-center">
          <Button
            onClick={onRefresh}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            disabled={loading}
            className={`
              w-full 
              max-w-md 
              rounded-xl 
              py-4 
              text-base 
              font-medium 
              flex items-center justify-center
              border 
              ${isMobile ? "text-base" : "text-lg"}
            `}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh'}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2 items-center">
          {/* AI Voice Assistant - destaca somente em mobile; desktop mantém max-w e reduz padding */}
          <Button
            onClick={() => onNavigate('ai-voice')}
            className={`
              w-full 
              max-w-md 
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              flex items-center justify-center 
              ${isMobile ? "py-5 text-base" : "py-3 text-lg"}
              font-semibold rounded-xl
              transition-all
            `}
            size={isMobile ? "lg" : "default"}
          >
            <Mic className="h-5 w-5 mr-2" />
            AI Voice Assistant
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
            <Button
              onClick={() => onNavigate('analytics')}
              variant="outline"
              className={`
                w-full 
                flex items-center justify-center 
                ${isMobile ? "py-5 text-base" : "py-3 text-base"}
                font-medium rounded-xl
                transition-all
              `}
              size={isMobile ? "lg" : "default"}
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </Button>
            <Button
              onClick={() => onNavigate('invoice-creator')}
              variant="outline"
              className={`
                w-full 
                flex items-center justify-center 
                ${isMobile ? "py-5 text-base" : "py-3 text-base"}
                font-medium rounded-xl
                transition-all
              `}
              size={isMobile ? "lg" : "default"}
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
