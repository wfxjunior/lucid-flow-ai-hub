
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
    <div className="w-full">
      {/* Clean header with title and search */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {t("dashboardHeader.title", "Dashboard")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboardHeader.welcome", "Overview of your business performance")}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
            className="px-3 py-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
