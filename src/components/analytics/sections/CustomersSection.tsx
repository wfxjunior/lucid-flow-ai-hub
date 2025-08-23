
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, UserPlus, TrendingDown, DollarSign } from "lucide-react"

const customerDistributionData = [
  { name: 'Free', value: 1240, color: 'hsl(var(--muted-foreground))' },
  { name: 'Pro', value: 890, color: 'hsl(var(--primary))' },
  { name: 'Enterprise', value: 156, color: 'hsl(var(--accent-foreground))' },
]

const newCustomersData = [
  { month: 'Jan', customers: 45 },
  { month: 'Feb', customers: 52 },
  { month: 'Mar', customers: 48 },
  { month: 'Apr', customers: 61 },
  { month: 'May', customers: 55 },
  { month: 'Jun', customers: 68 },
]

const chartConfig = {
  customers: { label: "Customers", color: "hsl(var(--primary))" },
}

interface CustomersSectionProps {
  dateRange: string
}

export function CustomersSection({ dateRange }: CustomersSectionProps) {
  const totalCustomers = customerDistributionData.reduce((sum, item) => sum + item.value, 0)
  const churnRate = 3.2
  const avgLifetimeValue = 2840

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Customers & Engagement</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {totalCustomers.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <UserPlus className="h-3 w-3 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">+68</span>
              <span className="text-muted-foreground ml-1">this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{churnRate}%</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Below industry average</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. LTV</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${avgLifetimeValue.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Per customer value</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Distribution</CardTitle>
            <CardDescription>Breakdown by subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Customers</CardTitle>
            <CardDescription>Monthly customer acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newCustomersData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
