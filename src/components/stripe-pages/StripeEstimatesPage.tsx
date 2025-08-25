
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Calculator, Send, MoreHorizontal, Calendar } from "lucide-react"

export function StripeEstimatesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All estimates", count: 8 },
    { id: "draft", label: "Draft", count: 3 },
    { id: "sent", label: "Sent", count: 2 },
    { id: "approved", label: "Approved", count: 2 },
    { id: "declined", label: "Declined", count: 1 }
  ]

  const filters = [
    { id: "status", label: "Status", active: activeFilters.includes("status") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "created", label: "Created date", active: activeFilters.includes("created") },
    { id: "amount", label: "Amount", active: activeFilters.includes("amount") },
    { id: "expiry", label: "Expiry date", active: activeFilters.includes("expiry") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  // Mock estimates data
  const estimates = [
    {
      number: "EST-2024-001",
      client: "Acme Corporation", 
      project: "Website Redesign",
      amount: "$15,000.00",
      status: "Approved",
      created: "Mar 10, 2024",
      expiry: "Apr 10, 2024",
      response: "Mar 12, 2024"
    },
    {
      number: "EST-2024-002",
      client: "Tech Startup Inc",
      project: "Mobile App Development", 
      amount: "$45,000.00",
      status: "Sent",
      created: "Mar 15, 2024",
      expiry: "Apr 15, 2024",
      response: "—"
    },
    {
      number: "EST-2024-003", 
      client: "Local Business LLC",
      project: "E-commerce Platform",
      amount: "$8,500.00",
      status: "Draft",
      created: "Mar 18, 2024",
      expiry: "—",
      response: "—"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Approved": "success",
      "Sent": "warning",
      "Draft": "neutral", 
      "Declined": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">Export</button>
      <button className="stripe-button-secondary">Templates</button>
      <button className="stripe-button-primary">
        <Calculator className="w-4 h-4" />
        New Estimate
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search estimates..."
          showAddButton={true}
          addButtonLabel="New Estimate"
        />
        
        <StripePageLayout
          title="Estimates"
          description="Create and manage project estimates for clients"
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
                  <th>Estimate #</th>
                  <th>Client</th>
                  <th>Project</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Expires</th>
                  <th>Response</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((estimate, index) => (
                  <tr key={index}>
                    <td className="font-mono text-sm">{estimate.number}</td>
                    <td className="font-medium">{estimate.client}</td>
                    <td>{estimate.project}</td>
                    <td className="font-medium">{estimate.amount}</td>
                    <td>
                      <span className={getStatusBadge(estimate.status)}>
                        {estimate.status}
                      </span>
                    </td>
                    <td>{estimate.created}</td>
                    <td>{estimate.expiry}</td>
                    <td>{estimate.response}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        {estimate.status === "Draft" && (
                          <button className="p-1 hover:bg-muted rounded" title="Send estimate">
                            <Send className="w-3 h-3" />
                          </button>
                        )}
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
              {estimates.length} result{estimates.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
