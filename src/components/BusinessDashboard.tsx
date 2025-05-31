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
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-4 lg:px-6">
      {/* Key Metrics - Improved Font Sizes */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[120px] sm:min-h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">
              $70,000
            </div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1 flex-shrink-0" />
              <span>+12% from last month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[120px] sm:min-h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Active Clients
            </CardTitle>
            <Users className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">42</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1 flex-shrink-0" />
              <span>+3 new this month</span>
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[120px] sm:min-h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              Pending Invoices
            </CardTitle>
            <FileText className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">8</div>
            <p className="text-sm text-yellow-600 flex items-center mt-1">
              <Clock className="inline h-3 w-3 mr-1 flex-shrink-0" />
              <span>$18,500 outstanding</span>
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[120px] sm:min-h-[140px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-sm md:text-base font-medium text-muted-foreground">
              This Month
            </CardTitle>
            <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold">
              $28,000
            </div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <Target className="inline h-3 w-3 mr-1 flex-shrink-0" />
              <span>Goal: $30,000</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid - Enhanced Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Revenue Breakdown */}
        <Card className="w-full overflow-hidden">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl">Revenue Breakdown</CardTitle>
            <CardDescription className="text-sm">
              Income sources for this quarter
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 lg:p-6">
            <ChartContainer config={chartConfig} className="h-40 sm:h-48 md:h-64 lg:h-80 w-full">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                  fontSize={12}
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
        <Card className="w-full overflow-hidden">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-xl">Monthly Estimates</CardTitle>
            <CardDescription className="text-sm">
              Estimate generation trends
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 lg:p-6">
            <ChartContainer config={chartConfig} className="h-40 sm:h-48 md:h-64 lg:h-80 w-full">
              <BarChart data={estimates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  width={50}
                  fontSize={12}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Status - Full Width Enhanced */}
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="text-lg lg:text-xl">Invoice Status Overview</CardTitle>
          <CardDescription className="text-sm">
            Track paid vs pending invoices over time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 lg:p-6">
          <ChartContainer config={chartConfig} className="h-48 sm:h-64 md:h-80 lg:h-96 w-full">
            <LineChart data={invoices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                fontSize={12}
                interval={0}
              />
              <YAxis 
                width={60}
                fontSize={12}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="paid" 
                stroke="var(--color-paid)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="pending" 
                stroke="var(--color-pending)" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
