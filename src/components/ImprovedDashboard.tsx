
import { useDashboardData } from "@/hooks/useDashboardData"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardTabs } from "@/components/dashboard/DashboardTabs"
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import { useEffect } from "react"

interface ImprovedDashboardProps {
  onNavigate: (view: string) => void
}

export function ImprovedDashboard({ onNavigate }: ImprovedDashboardProps) {
  const { stats, loading, error, refreshData } = useDashboardData()

  useEffect(() => {
    console.log('ImprovedDashboard: Rendering with stats:', stats)
    console.log('ImprovedDashboard: Loading:', loading)
    console.log('ImprovedDashboard: Error:', error)
  }, [stats, loading, error])

  const handleQuickAction = (actionId: string) => {
    console.log('ImprovedDashboard: Quick action clicked:', actionId)
    if (typeof onNavigate === 'function') {
      onNavigate(actionId)
    } else {
      console.error('ImprovedDashboard: onNavigate is not a function:', onNavigate)
    }
  }

  const handleNavigateInternal = (view: string) => {
    console.log('ImprovedDashboard: Internal navigation to:', view)
    if (typeof onNavigate === 'function') {
      onNavigate(view)
    } else {
      console.error('ImprovedDashboard: onNavigate is not a function:', onNavigate)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Dashboard Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={refreshData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full overflow-hidden" data-scope="dashboard">
      <div className="h-full overflow-y-auto">
        <div className="max-w-[1280px] mx-auto px-8 py-6">
          <div className="space-y-6">
            {/* Header */}
            <DashboardHeader 
              onNavigate={handleNavigateInternal} 
              onRefresh={refreshData}
              loading={loading}
              error={error}
            />

            {/* Stats Cards */}
            <DashboardStats stats={stats} loading={loading} />

            {/* Main Content Tabs */}
            <DashboardTabs 
              stats={stats}
              onActionClick={handleQuickAction}
              onNavigate={handleNavigateInternal}
            />

            {/* Bottom Section - Key Metrics */}
            <DashboardMetrics />
          </div>
        </div>
      </div>
    </div>
  )
}
