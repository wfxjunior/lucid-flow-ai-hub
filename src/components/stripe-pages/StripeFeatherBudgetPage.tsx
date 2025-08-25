
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { DollarSign, TrendingUp, Target, Zap, Plus } from "lucide-react"

export function StripeFeatherBudgetPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "forecasts", label: "AI Forecasts" },
    { id: "alerts", label: "Budget Alerts", count: 3 }
  ]

  const filters = [
    { id: "period", label: "Time Period", active: activeFilters.includes("period") },
    { id: "category", label: "Category", active: activeFilters.includes("category") },
    { id: "status", label: "Budget Status", active: activeFilters.includes("status") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const budgetCategories = [
    {
      category: "Materials",
      budgeted: "$45,000",
      spent: "$32,150", 
      remaining: "$12,850",
      percentage: 71,
      status: "On Track"
    },
    {
      category: "Labor",
      budgeted: "$60,000",
      spent: "$52,800",
      remaining: "$7,200", 
      percentage: 88,
      status: "At Risk"
    },
    {
      category: "Equipment",
      budgeted: "$15,000", 
      spent: "$18,200",
      remaining: "-$3,200",
      percentage: 121,
      status: "Over Budget"
    },
    {
      category: "Overhead",
      budgeted: "$25,000",
      spent: "$18,500",
      remaining: "$6,500",
      percentage: 74,
      status: "On Track"
    }
  ]

  const metrics = [
    {
      title: "Total Budget",
      value: "$145,000",
      change: "Current period"
    },
    {
      title: "Total Spent",
      value: "$121,650",
      change: "84% of budget"
    },
    {
      title: "Remaining Budget",
      value: "$23,350",
      change: "16% remaining"
    },
    {
      title: "Forecast Accuracy", 
      value: "94%",
      change: "+2% vs last period"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "On Track": "success",
      "At Risk": "warning",
      "Over Budget": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Zap className="w-4 h-4" />
        AI Optimize
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        New Budget
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search budget categories..."
          showAddButton={true}
          addButtonLabel="New Budget"
        />
        
        <StripePageLayout
          title="FeatherBudget AI"
          description="AI-powered budget planning and expense tracking"
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
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
              </div>
            ))}
          </div>

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budgeted Amount</th>
                  <th>Spent Amount</th>
                  <th>Remaining</th>
                  <th>Utilization</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {budgetCategories.map((budget, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{budget.category}</span>
                      </div>
                    </td>
                    <td className="font-medium">{budget.budgeted}</td>
                    <td>{budget.spent}</td>
                    <td className={budget.percentage > 100 ? "text-red-600 font-medium" : ""}>{budget.remaining}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              budget.percentage > 100 ? 'bg-red-500' :
                              budget.percentage > 85 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{budget.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(budget.status)}>
                        {budget.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {budgetCategories.length} result{budgetCategories.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
