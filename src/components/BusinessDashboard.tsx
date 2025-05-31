
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText, 
  Calendar,
  Receipt,
  CreditCard,
  Target,
  Clock,
  CheckCircle
} from "lucide-react"

export function BusinessDashboard() {
  // Initialize with default empty arrays to prevent mapping errors
  const [estimates] = useState([
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 18000 },
    { month: 'Mar', amount: 22000 },
    { month: 'Apr', amount: 19000 },
    { month: 'May', amount: 25000 },
    { month: 'Jun', amount: 28000 },
  ])

  const [invoices] = useState([
    { month: 'Jan', paid: 12000, pending: 3000 },
    { month: 'Feb', paid: 15000, pending: 3000 },
    { month: 'Mar', paid: 18000, pending: 4000 },
    { month: 'Apr', paid: 16000, pending: 3000 },
    { month: 'May', paid: 21000, pending: 4000 },
    { month: 'Jun', paid: 24000, pending: 4000 },
  ])

  const [revenueData] = useState([
    { name: 'Services', value: 65, amount: 45000 },
    { name: 'Products', value: 25, amount: 18000 },
    { name: 'Consulting', value: 10, amount: 7000 },
  ])

  const chartConfig = {
    amount: { label: "Amount", color: "hsl(var(--primary))" },
    paid: { label: "Paid", color: "hsl(142.1 76.2% 36.3%)" },
    pending: { label: "Pending", color: "hsl(var(--destructive))" },
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$70,000</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-yellow-600">
              <Clock className="inline h-3 w-3 mr-1" />
              $18,500 outstanding
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,000</div>
            <p className="text-xs text-green-600">
              <Target className="inline h-3 w-3 mr-1" />
              Goal: $30,000
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Income sources for this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 120}, 70%, 50%)`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Estimates */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Estimates</CardTitle>
            <CardDescription>Estimate generation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={estimates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Status */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Status Overview</CardTitle>
          <CardDescription>Track paid vs pending invoices over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={invoices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="paid" stroke="var(--color-paid)" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
