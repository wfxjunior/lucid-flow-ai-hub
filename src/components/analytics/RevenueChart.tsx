
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563EB",
  },
}

export function RevenueChart() {
  return (
    <Card className="w-full bg-white border border-slate-200 rounded-xl">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold text-slate-900">Monthly Revenue</CardTitle>
        <CardDescription className="text-sm text-slate-500">Revenue trends over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#475569' }}
                axisLine={{ stroke: '#475569' }}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#475569' }}
                axisLine={{ stroke: '#475569' }}
                width={50}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563EB" 
                strokeWidth={2}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
