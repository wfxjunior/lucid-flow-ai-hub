
import { Button } from "@/components/ui/button"
import { RefreshCw, Mic, BarChart3, Zap } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/LanguageContext"

interface DashboardHeaderProps {
  onNavigate: (view: string) => void
  onRefresh: () => void
  loading: boolean
  error: string | null
}

export function DashboardHeader({ onNavigate, onRefresh, loading, error }: DashboardHeaderProps) {
  const isMobile = useIsMobile()
  const { t } = useLanguage()

  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            {t("dashboardHeader.title", "Business Dashboard")}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
            {t("dashboardHeader.welcome", "Welcome back! Here's what's happening with your business today.")}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <Button
            onClick={onRefresh}
            variant="outline"
            size={isMobile ? "sm" : "default"}
            disabled={loading}
            className="w-full max-w-md rounded-xl py-3 sm:py-4 text-sm sm:text-base font-medium flex items-center justify-center border"
          >
            <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? t("dashboardHeader.updating", "Updating...") : t("dashboardHeader.refresh", "Refresh")}
          </Button>
        </div>

        <div className="w-full flex flex-col gap-2 items-center">
          <Button
            onClick={() => onNavigate('ai-voice')}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all"
            size={isMobile ? "lg" : "default"}
          >
            <Mic className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {t("dashboardHeader.aiVoiceAssistant", "AI Voice Assistant")}
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
            <Button
              onClick={() => onNavigate('analytics')}
              variant="outline"
              className="w-full flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base font-medium rounded-xl transition-all"
              size={isMobile ? "lg" : "default"}
            >
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t("dashboardHeader.viewAnalytics", "View Analytics")}
            </Button>
            <Button
              onClick={() => onNavigate('invoice-creator')}
              variant="outline"
              className="w-full flex items-center justify-center py-3 sm:py-4 text-sm sm:text-base font-medium rounded-xl transition-all"
              size={isMobile ? "lg" : "default"}
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t("dashboardHeader.invoices", "Invoices")}
            </Button>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
