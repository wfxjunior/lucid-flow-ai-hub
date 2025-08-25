
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { FileText, Calendar, User, Plus, Download } from "lucide-react"

export function StripeContractsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "active", label: "Active", count: 12 },
    { id: "pending", label: "Pending signature", count: 4 },
    { id: "completed", label: "Completed", count: 28 },
    { id: "expired", label: "Expired", count: 3 }
  ]

  const filters = [
    { id: "type", label: "Contract type", active: activeFilters.includes("type") },
    { id: "client", label: "Client", active: activeFilters.includes("client") },
    { id: "value", label: "Contract value", active: activeFilters.includes("value") },
    { id: "date", label: "Date range", active: activeFilters.includes("date") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const contracts = [
    {
      title: "Kitchen Renovation Agreement",
      client: "Anderson Family",
      type: "Service Contract",
      value: "$15,250.00",
      startDate: "Mar 1, 2024",
      endDate: "May 15, 2024",
      status: "Active"
    },
    {
      title: "Office Remodeling Contract",
      client: "Smith Industries", 
      type: "Commercial Contract",
      value: "$45,800.00",
      startDate: "Feb 15, 2024",
      endDate: "June 30, 2024",
      status: "Active"
    },
    {
      title: "Bathroom Renovation Agreement",
      client: "Johnson Construction",
      type: "Subcontractor Agreement",
      value: "$8,750.00",
      startDate: "Mar 20, 2024", 
      endDate: "Apr 30, 2024",
      status: "Pending signature"
    },
    {
      title: "Maintenance Service Agreement",
      client: "Davis Properties",
      type: "Service Contract",
      value: "$2,400.00",
      startDate: "Jan 1, 2024",
      endDate: "Dec 31, 2024",
      status: "Active"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Active": "success",
      "Pending signature": "warning", 
      "Completed": "neutral",
      "Expired": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Download className="w-4 h-4" />
        Export contracts
      </button>
      <button className="stripe-button-primary">
        <Plus className="w-4 h-4" />
        Create contract
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search contracts..."
          showAddButton={true}
          addButtonLabel="Create contract"
        />
        
        <StripePageLayout
          title="Contracts"
          description="Manage legal agreements and service contracts"
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
                  <th>Contract Title</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{contract.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {contract.client}
                      </div>
                    </td>
                    <td className="text-muted-foreground">{contract.type}</td>
                    <td className="font-medium">{contract.value}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {contract.startDate}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {contract.endDate}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(contract.status)}>
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {contracts.length} result{contracts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
