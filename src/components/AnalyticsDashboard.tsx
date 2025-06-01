
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Calendar, Download } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"

export function AnalyticsDashboard() {
  const { workOrders, estimates, clients, contracts, signatures } = useBusinessData()
  const { generateAnalyticsReportPDF, isGenerating } = usePDFGeneration()

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

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', revenue: 12500, expenses: 8000, profit: 4500 },
    { month: 'Feb', revenue: 15000, expenses: 9500, profit: 5500 },
    { month: 'Mar', revenue: 18500, expenses: 11000, profit: 7500 },
    { month: 'Apr', revenue: 22000, expenses: 13500, profit: 8500 },
    { month: 'May', revenue: 28000, expenses: 16000, profit: 12000 },
    { month: 'Jun', revenue: 32000, expenses: 18500, profit: 13500 },
  ]

  const clientData = [
    { name: 'Residential', value: 45, color: '#3b82f6' },
    { name: 'Commercial', value: 35, color: '#10b981' },
    { name: 'Industrial', value: 20, color: '#f59e0b' },
  ]

  const projectStatusData = [
    { status: 'Completed', count: completedWorkOrders },
    { status: 'In Progress', count: workOrders?.filter(wo => wo.status === 'in_progress').length || 0 },
    { status: 'Pending', count: workOrders?.filter(wo => wo.status === 'pending').length || 0 },
    { status: 'Cancelled', count: workOrders?.filter(wo => wo.status === 'cancelled').length || 0 },
  ]

  const chartConfig = {
    revenue: { label: "Revenue", color: "hsl(var(--primary))" },
    expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
    profit: { label: "Profit", color: "hsl(142.1 76.2% 36.3%)" },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your business performance and key metrics
          </p>
        </div>
        <Button onClick={handleGenerateReport} disabled={isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
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
            <div className="text-2xl font-bold">{activeClients}</div>
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
            <div className="text-2xl font-bold">{pendingProjects}</div>
            <p className="text-xs text-yellow-600 flex items-center">
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
            <div className="text-2xl font-bold">{completedWorkOrders}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <AreaChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={60} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="var(--color-revenue)" 
                  fill="var(--color-revenue)" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2"
                  stroke="var(--color-expenses)" 
                  fill="var(--color-expenses)" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Client Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Client Distribution</CardTitle>
            <CardDescription>Breakdown by client type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <Pie
                  data={clientData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {clientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={projectStatusData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>Profit trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis width={60} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="var(--color-profit)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-profit)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators for this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{estimatesSent}</div>
              <div className="text-sm text-muted-foreground">Estimates Sent</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{contractsSigned}</div>
              <div className="text-sm text-muted-foreground">Contracts Signed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {signatures?.filter(s => s.status === 'signed').length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Documents Signed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
