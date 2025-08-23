
import { Button } from "@/components/ui/button"
import { RefreshCw, Search } from "lucide-react"
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
      <div className="flex items-center justify-between pb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-[28px] font-semibold text-foreground leading-tight mb-2">
            {t("dashboardHeader.title") || "Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("dashboardHeader.welcome") || "Overview of your business performance"}
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0 ml-6">
          {/* Search field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <div className="mb-6 bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
