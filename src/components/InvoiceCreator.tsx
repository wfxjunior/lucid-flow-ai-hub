import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { FileText, Plus, Send, Eye, Download, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"
import { CreateInvoice } from "./CreateInvoice"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useBusinessData } from "@/hooks/useBusinessData"

export function InvoiceCreator() {
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const { invoices, clients, loading } = useBusinessData()

  const monthlyInvoiceData = [
    { month: 'Jan', sent: 23, paid: 20, pending: 3 },
    { month: 'Feb', sent: 18, paid: 16, pending: 2 },
    { month: 'Mar', sent: 31, paid: 28, pending: 3 },
    { month: 'Apr', sent: 25, paid: 22, pending: 3 },
    { month: 'May', sent: 28, paid: 25, pending: 3 },
    { month: 'Jun', sent: 34, paid: 30, pending: 4 },
  ]

  const invoiceValueData = [
    { range: '$0-500', count: 15 },
    { range: '$500-1000', count: 25 },
    { range: '$1000-2500', count: 35 },
    { range: '$2500-5000', count: 20 },
    { range: '$5000+', count: 5 },
  ]

  const paymentMethodData = [
    { method: 'Bank Transfer', value: 45, color: '#3b82f6' },
    { method: 'Credit Card', value: 30, color: '#10b981' },
    { method: 'PayPal', value: 15, color: '#f59e0b' },
    { method: 'Cash', value: 10, color: '#ef4444' },
  ]

  const chartConfig = {
    sent: { label: "Sent", color: "hsl(var(--primary))" },
    paid: { label: "Paid", color: "hsl(142.1 76.2% 36.3%)" },
    pending: { label: "Pending", color: "hsl(var(--destructive))" },
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800">Sent</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      case 'partial':
        return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>
      case 'viewed':
        return <Badge className="bg-purple-100 text-purple-800">Viewed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getClientName = (clientId: string) => {
    const client = clients?.find(c => c.id === clientId)
    return client?.name || 'Unknown Client'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const calculateDaysOverdue = (dueDate: string | null, status: string) => {
    if (!dueDate || status === 'paid') return 0
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">159</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">$48,250</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Payment Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12 days</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              2 days faster
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +3% improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Invoice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Plus className="h-5 w-5" />
            Create New Invoice
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Start with a pre-filled template and customize as needed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                  <FileText className="h-4 w-4" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[calc(95vh-120px)] w-full">
                  <div className="px-6 pb-6">
                    <CreateInvoice />
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Use Template
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Invoice Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Invoice Performance</CardTitle>
            <CardDescription className="text-sm">Monthly invoice sending and payment tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <BarChart data={monthlyInvoiceData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sent" fill="var(--color-sent)" name="Sent" />
                <Bar dataKey="paid" fill="var(--color-paid)" name="Paid" />
                <Bar dataKey="pending" fill="var(--color-pending)" name="Pending" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Payment Methods</CardTitle>
            <CardDescription className="text-sm">How customers prefer to pay</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ method, value }) => `${method}: ${value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Value Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Invoice Value Distribution</CardTitle>
          <CardDescription className="text-sm">Distribution of invoice amounts</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="overflow-x-auto">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full min-w-[400px]">
              <BarChart data={invoiceValueData} layout="horizontal" margin={{ top: 20, right: 20, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" width={50} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Invoice Activities</CardTitle>
          <CardDescription className="text-sm">Latest invoice interactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {[
              { action: "Invoice INV-045 opened by John Doe", time: "2 hours ago", status: "viewed" },
              { action: "Payment received for INV-043", time: "4 hours ago", status: "paid" },
              { action: "Invoice INV-044 sent to Sarah Smith", time: "6 hours ago", status: "sent" },
              { action: "Reminder sent for INV-041", time: "1 day ago", status: "reminder" },
            ].map((activity, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="font-medium text-sm sm:text-base">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full w-fit ${
                  activity.status === 'paid' ? 'bg-green-100 text-green-700' :
                  activity.status === 'viewed' ? 'bg-blue-100 text-blue-700' :
                  activity.status === 'sent' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complete Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">All Invoices</CardTitle>
          <CardDescription className="text-sm">Complete list of your invoices with detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-muted-foreground">Loading invoices...</div>
            </div>
          ) : invoices && invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Days</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => {
                    const daysOverdue = calculateDaysOverdue(invoice.due_date, invoice.status)
                    return (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium text-blue-600">
                          {invoice.invoice_number}
                        </TableCell>
                        <TableCell>{getClientName(invoice.client_id)}</TableCell>
                        <TableCell>{formatDate(invoice.created_at)}</TableCell>
                        <TableCell className="text-center">
                          {daysOverdue > 0 && (
                            <span className="text-red-600 font-medium">{daysOverdue}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${invoice.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${invoice.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(invoice.status)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first invoice to get started.
              </p>
              <Button onClick={() => setIsCreateInvoiceOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Invoice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
