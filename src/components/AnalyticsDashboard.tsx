

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, DollarSign, FileText, Calendar, BarChart3 } from "lucide-react"
import { useState } from "react"
import { useBusinessData } from "@/hooks/useBusinessData"

export function AnalyticsDashboard() {
  const [selectedBusinessTool, setSelectedBusinessTool] = useState("work-orders")
  const { 
    clients, 
    workOrders, 
    estimates, 
    contracts,
    totalRevenue,
    monthlyRevenue,
    completedWorkOrders,
    estimatesSent,
    contractsSigned,
    activeClients
  } = useBusinessData()

  // Monthly revenue data - using only blue, gray, green
  const monthlyData = [
    { month: 'Jan', revenue: 12000, color: '#3b82f6' },
    { month: 'Feb', revenue: 15000, color: '#3b82f6' },
    { month: 'Mar', revenue: 18500, color: '#3b82f6' },
    { month: 'Apr', revenue: 22000, color: '#3b82f6' },
    { month: 'May', revenue: 28000, color: '#3b82f6' },
    { month: 'Jun', revenue: 32000, color: '#3b82f6' },
  ]

  // Weekly performance data - using only blue, gray, green
  const weeklyData = [
    { day: 'Mon', tasks: 12, color: '#10b981' },
    { day: 'Tue', tasks: 19, color: '#10b981' },
    { day: 'Wed', tasks: 15, color: '#10b981' },
    { day: 'Thu', tasks: 22, color: '#10b981' },
    { day: 'Fri', tasks: 28, color: '#10b981' },
    { day: 'Sat', tasks: 18, color: '#10b981' },
    { day: 'Sun', tasks: 14, color: '#10b981' },
  ]

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

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
    tasks: {
      label: "Tasks",
      color: "#10b981",
    },
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
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
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedWorkOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#6b7280' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#6b7280' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Tasks Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Tasks completed this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#6b7280' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#6b7280' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="tasks" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Business Tools Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Business Tools Analytics</CardTitle>
              <CardDescription>Performance metrics for your business tools</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedBusinessTool} onValueChange={setSelectedBusinessTool}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select tool" />
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-[300px]">
              <ChartContainer config={chartConfig} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={businessToolsData[selectedBusinessTool as keyof typeof businessToolsData]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                      fontSize={10}
                    >
                      {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Legend and Stats */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold capitalize">
                {selectedBusinessTool.replace('-', ' ')} Overview
              </h4>
              <div className="space-y-3">
                {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Total Items</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">
                  {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].reduce((sum, item) => sum + item.value, 0)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
