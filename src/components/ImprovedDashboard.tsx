
import { useDashboardData } from "@/hooks/useDashboardData"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardTabs } from "@/components/dashboard/DashboardTabs"
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"

interface ImprovedDashboardProps {
  onNavigate: (view: string) => void
}

export function ImprovedDashboard({ onNavigate }: ImprovedDashboardProps) {
  const { stats, loading, error, refreshData } = useDashboardData()

  console.log('ImprovedDashboard: Rendering with stats:', stats)

  // Verificação de segurança para garantir que onNavigate existe
  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId)
    if (typeof onNavigate === 'function') {
      onNavigate(actionId)
    } else {
      console.error('onNavigate is not a function:', onNavigate)
    }
  }

  const handleNavigateInternal = (view: string) => {
    console.log('Internal navigation to:', view)
    if (typeof onNavigate === 'function') {
      onNavigate(view)
    } else {
      console.error('onNavigate is not a function:', onNavigate)
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <DashboardHeader 
        onNavigate={handleNavigateInternal} 
        onRefresh={refreshData}
        loading={loading}
        error={error}
      />

      {/* Stats Cards */}
      <div className="px-1 sm:px-0">
        <DashboardStats stats={stats} loading={loading} />
      </div>

      {/* Main Content Tabs */}
      <div className="px-1 sm:px-0">
        <DashboardTabs 
          stats={stats}
          onActionClick={handleQuickAction}
          onNavigate={handleNavigateInternal}
        />
      </div>

      {/* Bottom Section - Key Metrics */}
      <div className="px-1 sm:px-0">
        <DashboardMetrics />
      </div>
    </div>
  )
}
