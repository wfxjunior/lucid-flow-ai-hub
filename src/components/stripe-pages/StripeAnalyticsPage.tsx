
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from "lucide-react"

export function StripeAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "revenue", label: "Revenue" },
    { id: "customers", label: "Customers" },
    { id: "projects", label: "Projects" },
    { id: "performance", label: "Performance" }
  ]

  const filters = [
    { id: "period", label: "Time period", active: activeFilters.includes("period") },
    { id: "revenue-type", label: "Revenue type", active: activeFilters.includes("revenue-type") },
    { id: "customer-segment", label: "Customer segment", active: activeFilters.includes("customer-segment") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: "$127,450",
      change: "+12.5%",
      trend: "up"
    },
    {
      title: "Active Customers",
      value: "247",
      change: "+8.2%", 
      trend: "up"
    },
    {
      title: "Completed Projects",
      value: "156",
      change: "+15.3%",
      trend: "up"
    },
    {
      title: "Avg. Project Value",
      value: "$8,750",
      change: "-2.1%",
      trend: "down"
    }
  ]

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Download className="w-4 h-4" />
        Export
      </button>
      <button className="stripe-button-secondary">
        <Calendar className="w-4 h-4" />
        Date range
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search analytics..." />
        
        <StripePageLayout
          title="Analytics"
          description="Track your business performance and growth"
          actions={actions}
        >
          <StripeTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <StripeFilters 
            filters={filters}
            onFilterClick={handleFilterClick}
          />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="stripe-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Revenue Trend</h3>
                <p className="stripe-card-description">Monthly revenue over time</p>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Revenue Chart</span>
              </div>
            </div>

            <div className="stripe-card">
              <div className="stripe-card-header">
                <h3 className="stripe-card-title">Customer Growth</h3>
                <p className="stripe-card-description">New customers acquired</p>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                <Users className="w-8 h-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Customer Chart</span>
              </div>
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
