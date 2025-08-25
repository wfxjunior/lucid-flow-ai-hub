
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react"
import { KeyMetrics } from "../analytics/KeyMetrics"
import { BusinessToolsAnalytics } from "../analytics/BusinessToolsAnalytics"

export function StripeAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "revenue", label: "Revenue" },
    { id: "customers", label: "Customers" },
    { id: "products", label: "Products" },
    { id: "performance", label: "Performance" }
  ]

  // Mock analytics data
  const mockData = {
    totalRevenue: 125750,
    activeClients: 34,
    completedWorkOrders: 67,
    workOrders: [
      { id: 1, status: 'completed' },
      { id: 2, status: 'in_progress' },
      { id: 3, status: 'pending' }
    ],
    estimates: [
      { id: 1, status: 'approved' },
      { id: 2, status: 'sent' },
      { id: 3, status: 'draft' }
    ],
    estimatesSent: 12,
    contracts: [
      { id: 1, status: 'active' },
      { id: 2, status: 'pending' }
    ],
    contractsSigned: 8,
    clients: [
      { id: 1, status: 'active' },
      { id: 2, status: 'inactive' }
    ]
  }

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search analytics..." />
        
        <StripePageLayout
          title="Analytics Dashboard"
          description="Track your business performance and key metrics"
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stripe-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="stripe-card-title">Total Revenue</h3>
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">${mockData.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +12.5% from last month
                    </p>
                  </div>
                </div>

                <div className="stripe-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="stripe-card-title">Active Clients</h3>
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{mockData.activeClients}</p>
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +3.2% from last month
                    </p>
                  </div>
                </div>

                <div className="stripe-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="stripe-card-title">Completed Jobs</h3>
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{mockData.completedWorkOrders}</p>
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +8.1% from last month
                    </p>
                  </div>
                </div>

                <div className="stripe-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="stripe-card-title">Conversion Rate</h3>
                    <BarChart3 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">78.3%</p>
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +2.1% from last month
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Tools Analytics */}
              <BusinessToolsAnalytics
                completedWorkOrders={mockData.completedWorkOrders}
                workOrders={mockData.workOrders}
                estimates={mockData.estimates}
                estimatesSent={mockData.estimatesSent}
                contracts={mockData.contracts}
                contractsSigned={mockData.contractsSigned}
                clients={mockData.clients}
                activeClients={mockData.activeClients}
              />
            </div>
          )}

          {activeTab === "revenue" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Revenue Analytics</h3>
                <p className="stripe-card-description">Detailed revenue breakdown and trends</p>
              </div>
              <p className="text-muted-foreground">Revenue analytics content coming soon...</p>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Customer Analytics</h3>
                <p className="stripe-card-description">Customer behavior and acquisition metrics</p>
              </div>
              <p className="text-muted-foreground">Customer analytics content coming soon...</p>
            </div>
          )}

          {activeTab === "products" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Product Analytics</h3>
                <p className="stripe-card-description">Product performance and usage statistics</p>
              </div>
              <p className="text-muted-foreground">Product analytics content coming soon...</p>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Performance Metrics</h3>
                <p className="stripe-card-description">System performance and operational metrics</p>
              </div>
              <p className="text-muted-foreground">Performance metrics content coming soon...</p>
            </div>
          )}
        </StripePageLayout>
      </div>
    </div>
  )
}
