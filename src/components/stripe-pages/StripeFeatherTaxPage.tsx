
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { FileText, Calendar, DollarSign, AlertCircle, Plus } from "lucide-react"

export function StripeFeatherTaxPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "quarterly", label: "Quarterly", count: 4 },
    { id: "annual", label: "Annual", count: 1 },
    { id: "deductions", label: "Deductions" }
  ]

  const filters = [
    { id: "type", label: "Tax Type", active: activeFilters.includes("type") },
    { id: "period", label: "Tax Period", active: activeFilters.includes("period") },
    { id: "status", label: "Status", active: activeFilters.includes("status") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const taxObligations = [
    {
      type: "Quarterly Income Tax",
      period: "Q1 2024",
      amount: "$12,450",
      dueDate: "Apr 15, 2024",
      status: "Due Soon",
      daysLeft: 5
    },
    {
      type: "Sales Tax",
      period: "March 2024", 
      amount: "$3,280",
      dueDate: "Apr 20, 2024",
      status: "Pending",
      daysLeft: 10
    },
    {
      type: "Payroll Tax",
      period: "March 2024",
      amount: "$8,750",
      dueDate: "Mar 15, 2024",
      status: "Paid",
      daysLeft: 0
    },
    {
      type: "Property Tax",
      period: "2024",
      amount: "$4,200",
      dueDate: "May 31, 2024", 
      status: "Scheduled",
      daysLeft: 51
    }
  ]

  const metrics = [
    {
      title: "Taxes Due",
      value: "$15,730",
      change: "Next 30 days"
    },
    {
      title: "Taxes Paid",
      value: "$45,200",
      change: "This year"
    },
    {
      title: "Estimated Savings",
      value: "$8,400", 
      change: "Through deductions"
    },
    {
      title: "Filing Accuracy",
      value: "99.8%",
      change: "AI-powered"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Paid": "success",
      "Due Soon": "error",
      "Pending": "warning",
      "Scheduled": "neutral"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <FileText className="w-4 h-4" />
        Generate Report
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Add Tax Item
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search tax records..."
          showAddButton={true}
          addButtonLabel="Add Tax Item"
        />
        
        <StripePageLayout
          title="FeatherTax"
          description="Comprehensive tax management and compliance tracking"
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
                  <th>Tax Type</th>
                  <th>Period</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Days Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {taxObligations.map((tax, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{tax.type}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground">{tax.period}</td>
                    <td className="font-medium">{tax.amount}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {tax.dueDate}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {tax.daysLeft <= 7 && tax.daysLeft > 0 && (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                        <span className={tax.daysLeft <= 7 && tax.daysLeft > 0 ? "text-red-600 font-medium" : ""}>
                          {tax.daysLeft > 0 ? `${tax.daysLeft} days` : '—'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(tax.status)}>
                        {tax.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {taxObligations.length} result{taxObligations.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
