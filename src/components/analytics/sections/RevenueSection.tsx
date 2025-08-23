
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, DollarSign, Calendar } from "lucide-react"

const monthlyRevenueData = [
  { month: 'Jan', revenue: 42000, growth: 8.2 },
  { month: 'Feb', revenue: 45500, growth: 8.3 },
  { month: 'Mar', revenue: 48200, growth: 5.9 },
  { month: 'Apr', revenue: 52100, growth: 8.1 },
  { month: 'May', revenue: 55800, growth: 7.1 },
  { month: 'Jun', revenue: 58900, growth: 5.6 },
]

const arrByPlanData = [
  { plan: 'Free', arr: 0, customers: 1240 },
  { plan: 'Pro', arr: 180000, customers: 890 },
  { plan: 'Enterprise', arr: 420000, customers: 156 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  arr: { label: "ARR", color: "hsl(var(--primary))" },
}

interface RevenueSectionProps {
  dateRange: string
}

export function RevenueSection({ dateRange }: RevenueSectionProps) {
  const totalARR = arrByPlanData.reduce((sum, item) => sum + item.arr, 0)
  const momChange = 12.4
  const ytdGrowth = 47.8

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Revenue & Growth</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total ARR</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${totalARR.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-3 w-3 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">+{momChange}%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">MoM Growth</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{momChange}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Consistent growth trend</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">YTD Growth</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{ytdGrowth}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-3 w-3 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">Strong performance</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Revenue Growth</CardTitle>
            <CardDescription>Revenue trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ARR by Plan</CardTitle>
            <CardDescription>Annual recurring revenue distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={arrByPlanData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="plan" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="arr" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
