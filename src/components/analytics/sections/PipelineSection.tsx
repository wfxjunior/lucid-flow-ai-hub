
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Target, TrendingUp, MapPin, Percent } from "lucide-react"

const pipelineData = [
  { stage: 'Leads', count: 245, value: 1225000 },
  { stage: 'Qualified', count: 128, value: 896000 },
  { stage: 'Proposal', count: 64, value: 576000 },
  { stage: 'Negotiation', count: 32, value: 352000 },
  { stage: 'Closed Won', count: 18, value: 234000 },
]

const regionData = [
  { region: 'North America', customers: 1456, revenue: 342000 },
  { region: 'Europe', customers: 892, revenue: 187000 },
  { region: 'Asia Pacific', customers: 534, revenue: 98000 },
  { region: 'Latin America', customers: 234, revenue: 45000 },
]

const chartConfig = {
  count: { label: "Count", color: "hsl(var(--primary))" },
}

interface PipelineSectionProps {
  dateRange: string
}

export function PipelineSection({ dateRange }: PipelineSectionProps) {
  const totalDeals = pipelineData.reduce((sum, item) => sum + item.count, 0)
  const avgDealSize = 13600
  const conversionRate = 7.3

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Projects & Pipeline</h2>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Deals</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{totalDeals}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Active pipeline</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Deal Size</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${avgDealSize.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Per opportunity</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{conversionRate}%</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Percent className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Lead to close</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Funnel</CardTitle>
            <CardDescription>Pipeline progression by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-muted-foreground" />
                  <YAxis dataKey="stage" type="category" className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Regions</CardTitle>
            <CardDescription>Geographic distribution of customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div key={region.region} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{region.region}</p>
                      <p className="text-sm text-muted-foreground">{region.customers.toLocaleString()} customers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${region.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
