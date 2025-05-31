import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, FileText, Calendar, Heart, Target, Award, Clock } from "lucide-react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$87,450",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Active Clients",
      value: "28",
      change: "+14.3%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Completed Projects",
      value: "42",
      change: "+22.1%",
      changeType: "positive" as const,
      icon: Award
    },
    {
      title: "Monthly Growth",
      value: "12.5%",
      change: "+3.2%",
      changeType: "positive" as const,
      icon: Target
    },
    {
      title: "Avg Project Value",
      value: "$3,120",
      change: "+8.7%",
      changeType: "positive" as const,
      icon: Heart
    },
    {
      title: "Response Time",
      value: "2.4h",
      change: "-15.3%",
      changeType: "positive" as const,
      icon: Clock
    }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 6200, expenses: 3800, profit: 2400, projects: 4 },
    { month: 'Feb', revenue: 5800, expenses: 3600, profit: 2200, projects: 3 },
    { month: 'Mar', revenue: 7500, expenses: 4200, profit: 3300, projects: 6 },
    { month: 'Apr', revenue: 6200, expenses: 3900, profit: 2300, projects: 4 },
    { month: 'May', revenue: 8800, expenses: 4800, profit: 4000, projects: 7 },
    { month: 'Jun', revenue: 9200, expenses: 5000, profit: 4200, projects: 8 },
    { month: 'Jul', revenue: 8750, expenses: 4650, profit: 4100, projects: 7 },
  ]

  const clientGrowthData = [
    { month: 'Jan', newClients: 3, totalClients: 15, retention: 95 },
    { month: 'Feb', newClients: 2, totalClients: 17, retention: 94 },
    { month: 'Mar', newClients: 4, totalClients: 21, retention: 96 },
    { month: 'Apr', newClients: 2, totalClients: 23, retention: 93 },
    { month: 'May', newClients: 3, totalClients: 26, retention: 97 },
    { month: 'Jun', newClients: 2, totalClients: 28, retention: 98 },
  ]

  const projectStatusData = [
    { name: 'Completed', value: 42, count: 42 },
    { name: 'In Progress', value: 15, count: 15 },
    { name: 'Planning', value: 8, count: 8 },
    { name: 'On Hold', value: 3, count: 3 },
  ]

  const invoiceStatusData = [
    { name: 'Paid', value: 72, count: 31 },
    { name: 'Pending', value: 19, count: 8 },
    { name: 'Overdue', value: 9, count: 4 },
  ]

  const serviceDistributionData = [
    { service: 'Web Development', revenue: 28500, clients: 12, avgValue: 2375 },
    { service: 'Design Services', revenue: 22100, clients: 8, avgValue: 2763 },
    { service: 'Consulting', revenue: 18600, clients: 6, avgValue: 3100 },
    { service: 'Maintenance', revenue: 12250, clients: 15, avgValue: 817 },
    { service: 'SEO Services', revenue: 6000, clients: 4, avgValue: 1500 },
  ]

  const performanceMetrics = [
    { metric: 'Client Satisfaction', current: 94, target: 95, change: 2 },
    { metric: 'Project Delivery', current: 87, target: 90, change: 5 },
    { metric: 'Response Time', current: 92, target: 85, change: -3 },
    { metric: 'Revenue Growth', current: 118, target: 110, change: 8 },
  ]

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

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
    newClients: {
      label: "New Clients",
      color: "hsl(var(--primary))",
    },
    totalClients: {
      label: "Total Clients",
      color: "hsl(142.1 76.2% 36.3%)",
    },
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</div>
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

      {/* Revenue & Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            Business Performance Overview
          </CardTitle>
          <CardDescription className="text-sm">Monthly revenue, expenses, profit and project count</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6">
          <ChartContainer config={chartConfig} className="h-64 sm:h-80 md:h-96">
            <BarChart data={revenueData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis width={50} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
              <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
              <Bar dataKey="profit" fill="var(--color-profit)" name="Profit" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Client Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Client Growth Trend
            </CardTitle>
            <CardDescription className="text-sm">New client acquisition and total client base</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6">
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 md:h-80">
              <AreaChart data={clientGrowthData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis width={40} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="totalClients" stroke="var(--color-totalClients)" fill="var(--color-totalClients)" fillOpacity={0.3} />
                <Bar dataKey="newClients" fill="var(--color-newClients)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Project Status Distribution</CardTitle>
            <CardDescription className="text-sm">Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="w-full h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Revenue Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Service Revenue Breakdown</CardTitle>
          <CardDescription className="text-sm">Revenue distribution by service type</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6">
          <div className="w-full h-64 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceDistributionData} layout="horizontal" margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="service" type="category" width={60} fontSize={10} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Invoice Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Invoice Status</CardTitle>
            <CardDescription className="text-sm">Payment status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="w-full h-48 sm:h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Performance Metrics</CardTitle>
            <CardDescription className="text-sm">Key performance indicators vs targets</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{metric.current}% / {metric.target}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${metric.current >= metric.target ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(metric.current, 100)}%` }}
                    />
                  </div>
                  <p className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}% from target
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Business Summary</CardTitle>
          <CardDescription className="text-sm">Key highlights and recent performance</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 text-sm sm:text-base">This Month's Wins</h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• 4 new clients acquired</li>
                <li>• $12,500 in new revenue</li>
                <li>• 7 projects completed</li>
                <li>• 98% client satisfaction</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 text-sm sm:text-base">Focus Areas</h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Reduce response time to 2h</li>
                <li>• Increase project delivery rate</li>
                <li>• Expand consulting services</li>
                <li>• Follow up on pending invoices</li>
              </ul>
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold text-purple-600 text-sm sm:text-base">Next Quarter Goals</h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Reach 35 active clients</li>
                <li>• $100K total revenue</li>
                <li>• Launch new service line</li>
                <li>• Improve automation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
