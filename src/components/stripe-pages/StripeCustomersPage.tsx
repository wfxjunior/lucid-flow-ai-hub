
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { Users, Mail, Calendar, CreditCard, Filter, Download, MoreHorizontal, Eye } from "lucide-react"

export function StripeCustomersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All", count: 1 },
    { id: "top", label: "Top customers" },
    { id: "first-time", label: "First-time customers" },
    { id: "repeat", label: "Repeat customers" },
    { id: "recent", label: "Recent customers" },
    { id: "high-refunds", label: "High refunds" }
  ]

  const filters = [
    { id: "email", label: "Email", icon: <Mail className="w-3 h-3" />, active: activeFilters.includes("email") },
    { id: "card", label: "Card", icon: <CreditCard className="w-3 h-3" />, active: activeFilters.includes("card") },
    { id: "created", label: "Created date", icon: <Calendar className="w-3 h-3" />, active: activeFilters.includes("created") },
    { id: "type", label: "Type", active: activeFilters.includes("type") },
    { id: "more", label: "More filters", icon: <Filter className="w-3 h-3" />, active: activeFilters.includes("more") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  // Mock customer data
  const customers = [
    {
      name: "Wilson Junior",
      email: "fxamericangroup@gmail.com",
      paymentMethod: "•••• 4242",
      created: "Jun 12, 10:31 AM",
      totalSpend: "$0.00 USD",
      payments: "0",
      refunds: "$0.00 USD",
      disputes: "$0.00 USD"
    }
  ]

  const actions = (
    <>
      <button className="stripe-button-secondary">
        <Eye className="w-4 h-4" />
        Copy
      </button>
      <button className="stripe-button-secondary">
        <Download className="w-4 h-4" />
        Export
      </button>
      <button className="stripe-button-secondary">
        Analyze
      </button>
      <button className="stripe-button-secondary">
        Edit columns
      </button>
      <button className="stripe-button-primary">
        <Users className="w-4 h-4" />
        Add customer
      </button>
    </>
  )

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader 
          searchPlaceholder="Search customers..."
          showAddButton={true}
          addButtonLabel="Add customer"
        />
        
        <StripePageLayout
          title="Customers"
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Default payment method</th>
                  <th>Created</th>
                  <th>Total spend</th>
                  <th>Payments</th>
                  <th>Refunds</th>
                  <th>Dispute losses</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td className="font-medium">{customer.name}</td>
                    <td className="text-muted-foreground">{customer.email}</td>
                    <td>{customer.paymentMethod}</td>
                    <td>{customer.created}</td>
                    <td className="font-medium">{customer.totalSpend}</td>
                    <td>{customer.payments}</td>
                    <td>{customer.refunds}</td>
                    <td>{customer.disputes}</td>
                    <td>
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              1 result
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
