
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const invoiceStatusData = [
  { status: 'Paid', count: 156, amount: 89400 },
  { status: 'Pending', count: 23, amount: 12800 },
  { status: 'Overdue', count: 8, amount: 4200 },
]

const topCustomersData = [
  { name: 'Acme Corp', revenue: 24500, invoices: 12 },
  { name: 'TechStart Inc', revenue: 18200, invoices: 8 },
  { name: 'Global Solutions', revenue: 15800, invoices: 6 },
  { name: 'Digital Dynamics', revenue: 12400, invoices: 9 },
  { name: 'Innovation Labs', revenue: 9600, invoices: 4 },
]

const chartConfig = {
  count: { label: "Count", color: "hsl(var(--primary))" },
}

interface FinanceSectionProps {
  dateRange: string
}

export function FinanceSection({ dateRange }: FinanceSectionProps) {
  const totalInvoices = invoiceStatusData.reduce((sum, item) => sum + item.count, 0)
  const totalPaid = invoiceStatusData.find(item => item.status === 'Paid')?.amount || 0
  const totalOverdue = invoiceStatusData.find(item => item.status === 'Overdue')?.amount || 0

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Invoices & Finance</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{totalInvoices}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">83% collection rate</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${totalOverdue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Requires attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Status</CardTitle>
            <CardDescription>Breakdown by payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invoiceStatusData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="status" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Customers by Revenue</CardTitle>
            <CardDescription>Highest value customers this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomersData.map((customer, index) => (
                <div key={customer.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.invoices} invoices</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${customer.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
