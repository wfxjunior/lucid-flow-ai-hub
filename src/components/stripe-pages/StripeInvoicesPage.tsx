
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Receipt, Download, MoreHorizontal, Calendar } from "lucide-react"

export function StripeInvoicesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All invoices", count: 2 },
    { id: "draft", label: "Draft" },
    { id: "open", label: "Open" },
    { id: "past-due", label: "Past due" },
    { id: "paid", label: "Paid", count: 1 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "created", label: "Created", active: activeFilters.includes("created") },
    { id: "due", label: "Due date", active: activeFilters.includes("due") },
    { id: "finalization", label: "Finalization date", active: activeFilters.includes("finalization") },
    { id: "total", label: "Total", active: activeFilters.includes("total") },
    { id: "more", label: "More filters", active: activeFilters.includes("more") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  // Mock invoices data
  const invoices = [
    {
      total: "$29.00",
      frequency: "Monthly",
      number: "B4UCVMDY-0002",
      customer: "Wilson Junior",
      email: "fxamericangroup@gmail.com",
      due: "—",
      created: "Jun 19, 10:32 AM",
      finalization: "—",
      status: "Failed"
    },
    {
      total: "$0.00",
      frequency: "Monthly", 
      number: "B4UCVMDY-0001",
      customer: "Wilson Junior",
      email: "fxamericangroup@gmail.com",
      due: "—",
      created: "Jun 12, 10:31 AM",
      finalization: "—",
      status: "Paid"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Paid": "success",
      "Failed": "error",
      "Draft": "neutral",
      "Open": "warning"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Download className="w-4 h-4" />
        Export
      </button>
      <button className="stripe-button-secondary">Analyze</button>
      <button className="stripe-button-secondary">Edit columns</button>
      <button className="stripe-button-primary">
        <Receipt className="w-4 h-4" />
        Create invoice
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search invoices..."
          showAddButton={true}
          addButtonLabel="Create invoice"
        />
        
        <StripePageLayout
          title="Invoices"
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

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Total</th>
                  <th>Frequency</th>
                  <th>Invoice number</th>
                  <th>Customer name</th>
                  <th>Customer email</th>
                  <th>Due</th>
                  <th>Created</th>
                  <th>Finalization date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td className="font-medium">{invoice.total} USD</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {invoice.frequency}
                      </div>
                    </td>
                    <td className="font-mono text-sm">{invoice.number}</td>
                    <td>{invoice.customer}</td>
                    <td className="text-muted-foreground">{invoice.email}</td>
                    <td>{invoice.due}</td>
                    <td>{invoice.created}</td>
                    <td>{invoice.finalization}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={getStatusBadge(invoice.status)}>
                          {invoice.status}
                        </span>
                        <button className="p-1 hover:bg-muted rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              2 results
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
