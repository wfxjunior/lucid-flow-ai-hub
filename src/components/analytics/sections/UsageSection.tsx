
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Users, Clock, Zap } from "lucide-react"

const usageData = [
  { week: 'Week 1', hours: 1240 },
  { week: 'Week 2', hours: 1380 },
  { week: 'Week 3', hours: 1520 },
  { week: 'Week 4', hours: 1680 },
  { week: 'Week 5', hours: 1580 },
  { week: 'Week 6', hours: 1720 },
]

const featureAdoptionData = [
  { feature: 'Invoicing', adoption: 89, users: 2034 },
  { feature: 'CRM', adoption: 76, users: 1734 },
  { feature: 'Automation', adoption: 64, users: 1456 },
  { feature: 'Reports', adoption: 45, users: 1026 },
  { feature: 'API', adoption: 23, users: 524 },
]

const chartConfig = {
  hours: { label: "Hours", color: "hsl(var(--primary))" },
  adoption: { label: "Adoption", color: "hsl(var(--primary))" },
}

interface UsageSectionProps {
  dateRange: string
}

export function UsageSection({ dateRange }: UsageSectionProps) {
  const dailyActiveUsers = 1456
  const weeklyActiveUsers = 2286
  const stickiness = 63.7

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Usage & Productivity</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Active Users</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {dailyActiveUsers.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Average daily engagement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekly Active Users</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {weeklyActiveUsers.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Weekly engagement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stickiness</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{stickiness}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">DAU/WAU ratio</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Usage</CardTitle>
            <CardDescription>Weekly usage hours trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Feature Adoption</CardTitle>
            <CardDescription>Usage rate by feature</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureAdoptionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="feature" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="adoption" 
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
