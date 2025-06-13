
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Calendar, Download } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { useState } from "react"

export function AnalyticsDashboard() {
  const { workOrders, estimates, clients, contracts, signatures } = useBusinessData()
  const { generateAnalyticsReportPDF, isGenerating } = usePDFGeneration()
  const [selectedBusinessTool, setSelectedBusinessTool] = useState("work-orders")

  // Generate analytics data
  const totalRevenue = estimates?.reduce((sum, est) => sum + (est.amount || 0), 0) || 0
  const activeClients = clients?.filter(c => c.status === 'active').length || 0
  const pendingProjects = workOrders?.filter(wo => wo.status === 'pending' || wo.status === 'in_progress').length || 0
  const completedWorkOrders = workOrders?.filter(wo => wo.status === 'completed').length || 0
  const estimatesSent = estimates?.filter(est => est.status === 'sent' || est.status === 'viewed').length || 0
  const contractsSigned = contracts?.filter(c => c.status === 'active').length || 0

  const analyticsData = {
    totalRevenue: totalRevenue.toFixed(2),
    activeClients,
    pendingProjects,
    growthRate: '12.5',
    completedWorkOrders,
    previousCompletedWorkOrders: Math.max(0, completedWorkOrders - 5),
    workOrdersChange: '15',
    estimatesSent,
    previousEstimatesSent: Math.max(0, estimatesSent - 3),
    estimatesChange: '8',
    contractsSigned,
    previousContractsSigned: Math.max(0, contractsSigned - 2),
    contractsChange: '25'
  }

  const handleGenerateReport = async () => {
    await generateAnalyticsReportPDF(analyticsData)
  }

  // Business tools data for different charts - using only blue, gray, green
  const businessToolsData = {
    "work-orders": [
      { name: 'Completed', value: completedWorkOrders, color: '#10b981', fill: '#10b981' },
      { name: 'In Progress', value: workOrders?.filter(wo => wo.status === 'in_progress').length || 0, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Pending', value: workOrders?.filter(wo => wo.status === 'pending').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "estimates": [
      { name: 'Approved', value: estimates?.filter(est => est.status === 'approved').length || 0, color: '#10b981', fill: '#10b981' },
      { name: 'Sent', value: estimatesSent, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Draft', value: estimates?.filter(est => est.status === 'draft').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "contracts": [
      { name: 'Active', value: contractsSigned, color: '#10b981', fill: '#10b981' },
      { name: 'Pending', value: contracts?.filter(c => c.status === 'pending').length || 0, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Expired', value: contracts?.filter(c => c.status === 'expired').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "customers": [
      { name: 'Active', value: activeClients, color: '#10b981', fill: '#10b981' },
      { name: 'Inactive', value: clients?.filter(c => c.status === 'inactive').length || 0, color: '#6b7280', fill: '#6b7280' },
      { name: 'Prospective', value: clients?.filter(c => c.status === 'prospect').length || 0, color: '#3b82f6', fill: '#3b82f6' },
    ],
    "invoices": [
      { name: 'Paid', value: 65, color: '#10b981', fill: '#10b981' },
      { name: 'Pending', value: 25, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Overdue', value: 10, color: '#6b7280', fill: '#6b7280' },
    ]
  }

  // Monthly data using only blue, gray, green colors
  const monthlyData = [
    { month: 'Jan', revenue: 12500, expenses: 8000, profit: 4500 },
    { month: 'Feb', revenue: 15000, expenses: 9500, profit: 5500 },
    { month: 'Mar', revenue: 18500, expenses: 11000, profit: 7500 },
    { month: 'Apr', revenue: 22000, expenses: 13500, profit: 8500 },
    { month: 'May', revenue: 28000, expenses: 16000, profit: 12000 },
    { month: 'Jun', revenue: 32000, expenses: 18500, profit: 13500 },
  ]

  // Project status data using only blue, gray, green colors
  const projectStatusData = [
    { status: 'Completed', count: completedWorkOrders, fill: '#10b981' },
    { status: 'In Progress', count: workOrders?.filter(wo => wo.status === 'in_progress').length || 0, fill: '#3b82f6' },
    { status: 'Pending', count: workOrders?.filter(wo => wo.status === 'pending').length || 0, fill: '#6b7280' },
    { status: 'Cancelled', count: workOrders?.filter(wo => wo.status === 'cancelled').length || 0, fill: '#6b7280' },
  ]

  const chartConfig = {
    revenue: { label: "Revenue", color: "#3b82f6" },
    expenses: { label: "Expenses", color: "#6b7280" },
    profit: { label: "Profit", color: "#10b981" },
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your business performance and key metrics
          </p>
        </div>
        <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{pendingProjects}</div>
            <p className="text-xs text-blue-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{completedWorkOrders}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Revenue Trend</CardTitle>
            <CardDescription className="text-sm">Monthly revenue, expenses, and profit</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <AreaChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <YAxis 
                  width={40} 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2"
                  stroke="#6b7280" 
                  fill="#6b7280" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Business Tools Chart with Dropdown */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Business Tools Analysis</CardTitle>
                <CardDescription className="text-sm">Select a tool to view analytics</CardDescription>
              </div>
              <Select value={selectedBusinessTool} onValueChange={setSelectedBusinessTool}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-orders">Work Orders</SelectItem>
                  <SelectItem value="estimates">Estimates</SelectItem>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                  <SelectItem value="invoices">Invoices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <Pie
                  data={businessToolsData[selectedBusinessTool as keyof typeof businessToolsData]}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  fontSize={10}
                >
                  {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Project Status</CardTitle>
            <CardDescription className="text-sm">Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <BarChart data={projectStatusData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="status" 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <YAxis 
                  width={30} 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Monthly Progress</CardTitle>
            <CardDescription className="text-sm">Profit trend over time</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <YAxis 
                  width={40} 
                  fontSize={12}
                  className="text-xs sm:text-sm"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Performance Summary</CardTitle>
          <CardDescription className="text-sm">Key performance indicators for this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-3 sm:p-4 border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{estimatesSent}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Estimates Sent</div>
            </div>
            <div className="text-center p-3 sm:p-4 border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{contractsSigned}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Contracts Signed</div>
            </div>
            <div className="text-center p-3 sm:p-4 border rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-gray-600">
                {signatures?.filter(s => s.status === 'signed').length || 0}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Documents Signed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
