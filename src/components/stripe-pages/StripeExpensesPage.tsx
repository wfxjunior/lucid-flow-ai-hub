
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Receipt, Tag, Calendar, Plus, TrendingDown, DollarSign } from "lucide-react"

export function StripeExpensesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All expenses", count: 89 },
    { id: "materials", label: "Materials", count: 34 },
    { id: "labor", label: "Labor", count: 28 },
    { id: "equipment", label: "Equipment", count: 15 },
    { id: "other", label: "Other", count: 12 }
  ]

  const filters = [
    { id: "category", label: "Category", active: activeFilters.includes("category") },
    { id: "amount", label: "Amount", active: activeFilters.includes("amount") },
    { id: "date", label: "Date range", active: activeFilters.includes("date") },
    { id: "project", label: "Project", active: activeFilters.includes("project") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const expenses = [
    {
      description: "Premium hardwood flooring",
      category: "Materials",
      amount: "$3,450.00",
      project: "Anderson Kitchen Renovation",
      date: "Mar 18, 2024",
      vendor: "Superior Materials Co."
    },
    {
      description: "Electrical work consultation",
      category: "Labor", 
      amount: "$850.00",
      project: "Smith Office Remodel",
      date: "Mar 17, 2024",
      vendor: "Expert Electric LLC"
    },
    {
      description: "Tool rental - concrete mixer",
      category: "Equipment",
      amount: "$180.00", 
      project: "Johnson Foundation",
      date: "Mar 16, 2024",
      vendor: "Rental Pro"
    },
    {
      description: "Office supplies and permits",
      category: "Other",
      amount: "$245.00",
      project: "General Operations", 
      date: "Mar 15, 2024",
      vendor: "City Permits Office"
    },
    {
      description: "Plumbing fixtures",
      category: "Materials",
      amount: "$1,250.00",
      project: "Davis Bathroom Remodel",
      date: "Mar 14, 2024",
      vendor: "Quality Plumbing Supply"
    }
  ]

  const metrics = [
    {
      title: "Total Expenses",
      value: "$45,280",
      change: "-2.1%"
    },
    {
      title: "This Month",
      value: "$8,945",
      change: "+12.8%"
    },
    {
      title: "Material Costs",
      value: "$28,150",
      change: "+5.2%"
    },
    {
      title: "Labor Costs",
      value: "$12,890",
      change: "-8.1%"
    }
  ]

  const getCategoryBadge = (category: string) => {
    const categoryClasses = {
      "Materials": "stripe-badge success",
      "Labor": "stripe-badge warning",
      "Equipment": "stripe-badge neutral",
      "Other": "stripe-badge neutral"
    }
    return categoryClasses[category as keyof typeof categoryClasses] || "stripe-badge neutral"
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export</button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add expense
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search expenses..."
          showAddButton={true}
          addButtonLabel="Add expense"
        />
        
        <StripePageLayout
          title="Expenses"
          description="Track and manage business expenses"
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
                  <TrendingDown className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Project</th>
                  <th>Date</th>
                  <th>Vendor</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{expense.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getCategoryBadge(expense.category)}>
                        {expense.category}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{expense.amount}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{expense.project}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {expense.date}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{expense.vendor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {expenses.length} result{expenses.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
