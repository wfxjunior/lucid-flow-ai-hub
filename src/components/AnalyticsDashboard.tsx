
import { useBusinessData } from "@/hooks/useBusinessData"
import { DashboardHeader } from "./analytics/DashboardHeader"
import { KeyMetrics } from "./analytics/KeyMetrics"
import { RevenueChart } from "./analytics/RevenueChart"
import { WeeklyPerformanceChart } from "./analytics/WeeklyPerformanceChart"
import { BusinessToolsAnalytics } from "./analytics/BusinessToolsAnalytics"

export function AnalyticsDashboard() {
  const { 
    clients, 
    workOrders, 
    estimates, 
    contracts,
    totalRevenue,
    completedWorkOrders,
    estimatesSent,
    contractsSigned,
    activeClients
  } = useBusinessData()

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-6">
      <div className="space-y-6">
        <DashboardHeader />

        {/* Key Metrics */}
        <KeyMetrics 
          totalRevenue={totalRevenue}
          activeClients={activeClients}
          completedWorkOrders={completedWorkOrders}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="w-full">
            <RevenueChart />
          </div>
          <div className="w-full">
            <WeeklyPerformanceChart />
          </div>
        </div>

        {/* Business Tools Analytics */}
        <BusinessToolsAnalytics
          completedWorkOrders={completedWorkOrders}
          workOrders={workOrders}
          estimates={estimates}
          estimatesSent={estimatesSent}
          contracts={contracts}
          contractsSigned={contractsSigned}
          clients={clients}
          activeClients={activeClients}
        />
      </div>
    </div>
  )
}
