
import { useState } from "react"
import { StripeHeader } from "../stripe-layout/StripeHeader"
import { StripePageLayout } from "../stripe-layout/StripePageLayout"
import { StripeTabs } from "../stripe-layout/StripeTabs"
import { StripeFilters } from "../stripe-layout/StripeFilters"
import { CreditCard, TrendingUp, DollarSign, Calendar } from "lucide-react"

export function StripePaymentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const tabs = [
    { id: "all", label: "All payments", count: 156 },
    { id: "succeeded", label: "Succeeded", count: 142 },
    { id: "pending", label: "Pending", count: 8 },
    { id: "failed", label: "Failed", count: 6 }
  ]

  const filters = [
    { id: "amount", label: "Amount", active: activeFilters.includes("amount") },
    { id: "method", label: "Payment method", active: activeFilters.includes("method") },
    { id: "date", label: "Date", active: activeFilters.includes("date") },
    { id: "customer", label: "Customer", active: activeFilters.includes("customer") }
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const payments = [
    {
      amount: "$15,250.00",
      customer: "Anderson Family",
      method: "Credit Card",
      status: "Succeeded",
      date: "Mar 18, 2024",
      invoice: "INV-001234"
    },
    {
      amount: "$8,750.00", 
      customer: "Smith Industries",
      method: "Bank Transfer",
      status: "Succeeded",
      date: "Mar 17, 2024",
      invoice: "INV-001233"
    },
    {
      amount: "$3,200.00",
      customer: "Johnson Construction", 
      method: "Check",
      status: "Pending",
      date: "Mar 16, 2024",
      invoice: "INV-001232"
    },
    {
      amount: "$12,100.00",
      customer: "Davis Enterprises",
      method: "Credit Card",
      status: "Failed", 
      date: "Mar 15, 2024",
      invoice: "INV-001231"
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      "Succeeded": "success",
      "Pending": "warning",
      "Failed": "error"
    }
    return `stripe-badge ${statusClasses[status as keyof typeof statusClasses] || 'neutral'}`
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: "$127,450",
      change: "+12.5%"
    },
    {
      title: "Successful Payments",
      value: "142",
      change: "+8.2%"
    },
    {
      title: "Average Payment",
      value: "$8,750",
      change: "+5.1%"
    },
    {
      title: "Payment Success Rate", 
      value: "94.2%",
      change: "+2.1%"
    }
  ]

  return (
    <div className="stripe-layout">
      <div className="stripe-main">
        <StripeHeader searchPlaceholder="Search payments..." />
        
        <StripePageLayout
          title="Payments"
          description="Track and manage incoming payments"
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
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span className="text-sm text-green-500">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="stripe-card p-0">
            <table className="stripe-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Customer</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                    </td>
                    <td className="font-medium">{payment.customer}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        {payment.method}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(payment.status)}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {payment.date}
                      </div>
                    </td>
                    <td className="font-mono text-sm text-muted-foreground">{payment.invoice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              {payments.length} result{payments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </StripePageLayout>
      </div>
    </div>
  )
}
