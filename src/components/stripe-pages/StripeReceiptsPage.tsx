
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Receipt, Upload, Calendar, Tag, Plus, Eye } from "lucide-react"

export function StripeReceiptsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All Receipts", count: 156 },
    { id: "pending", label: "Pending Review", count: 8 },
    { id: "processed", label: "Processed", count: 124 },
    { id: "rejected", label: "Rejected", count: 3 }
  ]

  const filters = [
    { id: "date", label: "Date Range", active: activeFilters.includes("date") },
    { id: "vendor", label: "Vendor", active: activeFilters.includes("vendor") },
    { id: "category", label: "Category", active: activeFilters.includes("category") },
    { id: "amount", label: "Amount Range", active: activeFilters.includes("amount") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const receipts = [
    {
      vendor: "Home Depot",
      amount: "$1,245.67",
      category: "Materials",
      date: "Mar 18, 2024",
      project: "Anderson Kitchen",
      status: "Processed",
      fileType: "PDF"
    },
    {
      vendor: "Lowe's Building Supply", 
      amount: "$856.34",
      category: "Tools",
      date: "Mar 17, 2024",
      project: "Smith Office",
      status: "Pending Review",
      fileType: "JPG"
    },
    {
      vendor: "Johnson Electric Supply",
      amount: "$432.89",
      category: "Electrical",
      date: "Mar 16, 2024", 
      project: "Johnson Bathroom",
      status: "Processed",
      fileType: "PDF"
    },
    {
      vendor: "Metro Gas Station",
      amount: "$89.45",
      category: "Fuel", 
      date: "Mar 15, 2024",
      project: "General Operations",
      status: "Processed",
      fileType: "JPG"
    }
  ]

  const metrics = [
    {
      title: "Total Receipts",
      value: "$45,280",
      change: "This month"
    },
    {
      title: "Pending Review",
      value: "8",
      change: "Awaiting approval"
    },
    {
      title: "Processing Time",
      value: "2.3 days",
      change: "Average"
    },
    {
      title: "Tax Deductible",
      value: "$38,450",
      change: "85% of total"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Processed": "success",
      "Pending Review": "warning",
      "Rejected": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export Report</button>
      <button className="stripe-button-primary">
        <Upload className="w-4 h-4" />
        Upload Receipt
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search receipts..."
          showAddButton={true}
          addButtonLabel="Upload Receipt"
        />
        
        <StripePageLayout
          title="Receipts"
          description="Manage and track business expense receipts"
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
                  <Receipt className="w-4 h-4 text-muted-foreground" />
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
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{receipt.vendor}</span>
                      </div>
                    </td>
                    <td className="font-medium">{receipt.amount}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        {receipt.category}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {receipt.date}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{receipt.project}</td>
                    <td>
                      <span className={getStatusBadge(receipt.status)}>
                        {receipt.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          {receipt.fileType}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {receipts.length} result{receipts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
