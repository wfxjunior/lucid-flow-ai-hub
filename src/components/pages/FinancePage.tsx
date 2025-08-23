import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { DollarSign, TrendingUp, CreditCard, PiggyBank, AlertTriangle, Plus, Download, Filter } from 'lucide-react'

interface DataItem {
  name: string
  value: number
}

const lineChartData: DataItem[] = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 2210 },
  { name: "Sep", value: 3800 },
  { name: "Oct", value: 4300 },
  { name: "Nov", value: 5000 },
  { name: "Dec", value: 4000 },
]

const areaChartData: DataItem[] = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
  { name: "Aug", value: 2800 },
  { name: "Sep", value: 5908 },
  { name: "Oct", value: 7800 },
  { name: "Nov", value: 6800 },
  { name: "Dec", value: 5400 },
]

const barChartData: DataItem[] = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 400 },
  { name: "Apr", value: 600 },
  { name: "May", value: 500 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 300 },
  { name: "Aug", value: 200 },
  { name: "Sep", value: 400 },
  { name: "Oct", value: 600 },
  { name: "Nov", value: 800 },
  { name: "Dec", value: 700 },
]

interface PieChartData {
  name: string
  value: number
  color: string
}

const pieChartData: PieChartData[] = [
  { name: "Services", value: 400, color: "#0088FE" },
  { name: "Products", value: 300, color: "#00C49F" },
  { name: "Subscriptions", value: 300, color: "#FFBB28" },
  { name: "Other", value: 200, color: "#FF8042" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const metrics = [
  {
    title: "Total Revenue",
    value: "$124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Expenses",
    value: "$38,200",
    change: "-5.2%",
    trend: "down",
    icon: CreditCard,
    color: "text-red-600"
  },
  {
    title: "Net Profit",
    value: "$86,300",
    change: "+18.3%",
    trend: "up",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Cash Flow",
    value: "$42,100",
    change: "+7.8%",
    trend: "up",
    icon: PiggyBank,
    color: "text-purple-600"
  }
]

export function FinancePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <DollarSign className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">Track your financial performance and manage your business finances</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>Dashboard</TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>Reports</TabsTrigger>
          <TabsTrigger value="budgeting" onClick={() => setActiveTab("budgeting")}>Budgeting</TabsTrigger>
          <TabsTrigger value="forecasting" onClick={() => setActiveTab("forecasting")}>Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                    &nbsp;
                    {metric.trend === "up" ? "increase" : "decrease"} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Chart</CardTitle>
                <CardDescription>A visual representation of your revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download detailed financial reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Income Statement</h3>
                  <p className="text-sm text-muted-foreground">View a summary of your income and expenses over a period of time.</p>
                  <Button variant="outline" className="mt-2">
                    Generate Report <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Balance Sheet</h3>
                  <p className="text-sm text-muted-foreground">View a snapshot of your assets, liabilities, and equity at a specific point in time.</p>
                  <Button variant="outline" className="mt-2">
                    Generate Report <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Cash Flow Statement</h3>
                  <p className="text-sm text-muted-foreground">View the movement of cash both into and out of your business.</p>
                  <Button variant="outline" className="mt-2">
                    Generate Report <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Custom Report</h3>
                  <p className="text-sm text-muted-foreground">Create a custom financial report based on your specific needs.</p>
                  <Button variant="outline" className="mt-2">
                    Create Custom Report <Filter className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgeting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budgeting Tools</CardTitle>
              <CardDescription>Create and manage your business budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertTriangle className="h-6 w-6" />
              <p className="text-sm text-muted-foreground">This feature is under development and will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecasting</CardTitle>
              <CardDescription>Predict your future financial performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertTriangle className="h-6 w-6" />
              <p className="text-sm text-muted-foreground">This feature is under development and will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
