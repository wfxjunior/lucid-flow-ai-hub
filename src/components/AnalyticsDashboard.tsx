
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, FileText, Calendar, Heart } from "lucide-react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$48,250",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Active Customers",
      value: "142",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Invoices Sent",
      value: "89",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Pending Payments",
      value: "$12,480",
      change: "-5.2%",
      changeType: "negative" as const,
      icon: Calendar
    },
    {
      title: "Family Savings",
      value: "$2,850",
      change: "+22.1%",
      changeType: "positive" as const,
      icon: Heart
    }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 4200, expenses: 2800, profit: 1400 },
    { month: 'Feb', revenue: 3800, expenses: 2600, profit: 1200 },
    { month: 'Mar', revenue: 4500, expenses: 3000, profit: 1500 },
    { month: 'Apr', revenue: 3200, expenses: 2400, profit: 800 },
    { month: 'May', revenue: 4800, expenses: 3200, profit: 1600 },
    { month: 'Jun', revenue: 5200, expenses: 3400, profit: 1800 },
    { month: 'Jul', revenue: 4250, expenses: 2900, profit: 1350 },
  ]

  const invoiceStatusData = [
    { name: 'Paid', value: 65, count: 58 },
    { name: 'Pending', value: 25, count: 22 },
    { name: 'Overdue', value: 10, count: 9 },
  ]

  const familySavingsData = [
    { month: 'Sep', amount: 420, percentage: 5 },
    { month: 'Oct', amount: 380, percentage: 5 },
    { month: 'Nov', amount: 475, percentage: 5 },
    { month: 'Dec', amount: 520, percentage: 5 },
    { month: 'Jan', amount: 580, percentage: 5 },
  ]

  const documentEngagementData = [
    { type: 'Invoices', opened: 89, viewed: 76, signed: 58 },
    { type: 'Quotes', opened: 67, viewed: 54, signed: 42 },
    { type: 'Contracts', opened: 34, viewed: 28, signed: 21 },
    { type: 'Proposals', opened: 23, viewed: 19, signed: 15 },
  ]

  const COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    expenses: {
      label: "Expenses", 
      color: "hsl(var(--destructive))",
    },
    profit: {
      label: "Profit",
      color: "hsl(142.1 76.2% 36.3%)",
    },
  }

  const recentInvoices = [
    { id: 'INV-001', client: 'John Smith', amount: 2500, status: 'paid', date: '2024-01-20' },
    { id: 'INV-002', client: 'Sarah Johnson', amount: 3200, status: 'pending', date: '2024-01-18' },
    { id: 'INV-003', client: 'Mike Davis', amount: 1800, status: 'overdue', date: '2024-01-15' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 mr-1" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Revenue Analytics
          </CardTitle>
          <CardDescription>Monthly revenue, expenses and profit breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
              <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
              <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status Distribution</CardTitle>
            <CardDescription>Current status of all invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Family Savings Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Family Savings Trend
            </CardTitle>
            <CardDescription>Monthly savings from completed jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <AreaChart data={familySavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="amount" stroke="#ef4444" fill="#fecaca" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Document Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Document Engagement Analytics</CardTitle>
          <CardDescription>Track how customers interact with your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={documentEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="opened" fill="#3b82f6" name="Opened" />
              <Bar dataKey="viewed" fill="#f59e0b" name="Fully Viewed" />
              <Bar dataKey="signed" fill="#22c55e" name="Signed/Responded" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Track your latest invoice statuses and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                  <p className="text-xs text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
