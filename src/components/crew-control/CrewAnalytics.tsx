
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Clock, DollarSign, CreditCard } from 'lucide-react'

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
  hours: {
    label: "Hours",
    color: "hsl(var(--chart-2))",
  },
  employees: {
    label: "Employees",
    color: "hsl(var(--chart-3))",
  },
}

export function CrewAnalytics() {
  // Mock data for charts
  const weeklyEarningsData = [
    { day: 'Mon', earnings: 2400, hours: 32 },
    { day: 'Tue', earnings: 1800, hours: 28 },
    { day: 'Wed', earnings: 2800, hours: 35 },
    { day: 'Thu', earnings: 3200, hours: 40 },
    { day: 'Fri', earnings: 2600, hours: 33 },
    { day: 'Sat', earnings: 1200, hours: 16 },
    { day: 'Sun', earnings: 800, hours: 8 }
  ]

  const paymentMethodData = [
    { name: 'Digital Transfer', value: 45, amount: 5400, color: '#0088FE' },
    { name: 'CashApp', value: 25, amount: 3000, color: '#00C49F' },
    { name: 'Check', value: 15, amount: 1800, color: '#FFBB28' },
    { name: 'Zelle', value: 10, amount: 1200, color: '#FF8042' },
    { name: 'Cash', value: 5, amount: 600, color: '#8884d8' }
  ]

  const employeePerformanceData = [
    { name: 'John Smith', hours: 42, earnings: 1275.50, efficiency: 95 },
    { name: 'Maria Rodriguez', hours: 40, earnings: 1025.00, efficiency: 88 },
    { name: 'David Johnson', hours: 38, earnings: 1140.00, efficiency: 92 },
    { name: 'Sarah Wilson', hours: 35, earnings: 962.50, efficiency: 85 },
    { name: 'Mike Brown', hours: 44, earnings: 1320.00, efficiency: 97 }
  ]

  const monthlyTrendsData = [
    { month: 'Jan', totalPayroll: 18000, hoursWorked: 640, activeEmployees: 10 },
    { month: 'Feb', totalPayroll: 19500, hoursWorked: 680, activeEmployees: 11 },
    { month: 'Mar', totalPayroll: 21000, hoursWorked: 720, activeEmployees: 12 },
    { month: 'Apr', totalPayroll: 22500, hoursWorked: 760, activeEmployees: 12 },
    { month: 'May', totalPayroll: 24000, hoursWorked: 800, activeEmployees: 13 },
    { month: 'Jun', totalPayroll: 23500, hoursWorked: 780, activeEmployees: 12 }
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payroll (Month)</p>
                <p className="text-2xl font-bold">$23,500</p>
                <p className="text-xs text-green-600">+8.5% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold">780</p>
                <p className="text-xs text-green-600">+2.6% from last month</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-500">No change</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Hourly Rate</p>
                <p className="text-2xl font-bold">$30.13</p>
                <p className="text-xs text-green-600">+1.2% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Earnings & Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEarningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="earnings" fill="var(--color-earnings)" name="Earnings ($)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}% ($${props.payload.amount})`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Employee Performance (Hours vs Earnings)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeePerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="earnings" fill="var(--color-earnings)" name="Earnings ($)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalPayroll" 
                    stroke="var(--color-earnings)" 
                    strokeWidth={2}
                    name="Total Payroll ($)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hoursWorked" 
                    stroke="var(--color-hours)" 
                    strokeWidth={2}
                    name="Hours Worked"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paymentMethodData.map((method) => (
              <div key={method.name} className="p-4 border rounded-lg text-center">
                <h4 className="font-medium text-sm">{method.name}</h4>
                <p className="text-2xl font-bold mt-2">{method.value}%</p>
                <p className="text-sm text-gray-600">${method.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
