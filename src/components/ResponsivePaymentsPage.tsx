
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, DollarSign, TrendingUp, Clock, Check } from "lucide-react"
import { toast } from "sonner"

export function ResponsivePaymentsPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const payments = [
    {
      id: 1,
      amount: 1250.00,
      client: "John Doe",
      date: "2024-01-15",
      status: "completed",
      method: "Credit Card",
      invoice: "INV-001"
    }
  ]

  const handleAddPayment = () => {
    setShowPaymentForm(true)
    toast.info("Payment form will be available for recording payments")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            Payments
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage client payments
          </p>
        </div>
        <Button onClick={handleAddPayment} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">Awaiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Loading...</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>


      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Track all incoming payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-medium">${payment.amount.toFixed(2)}</h3>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                    <span>From: {payment.client}</span>
                    <span>•</span>
                    <span>{payment.date}</span>
                    <span>•</span>
                    <span>{payment.method}</span>
                    <span>•</span>
                    <span>Invoice: {payment.invoice}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Receipt</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
