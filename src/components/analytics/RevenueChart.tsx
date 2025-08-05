
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { month: 'Jan', revenue: 0, color: '#3b82f6' },
  { month: 'Feb', revenue: 0, color: '#3b82f6' },
  { month: 'Mar', revenue: 0, color: '#3b82f6' },
  { month: 'Apr', revenue: 0, color: '#3b82f6' },
  { month: 'May', revenue: 0, color: '#3b82f6' },
  { month: 'Jun', revenue: 0, color: '#3b82f6' },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
}

export function RevenueChart() {
  return (
    <Card className="w-full">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Monthly Revenue</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Revenue trends over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={{ stroke: '#6b7280' }}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 10, fill: '#6b7280' }}
                axisLine={{ stroke: '#6b7280' }}
                width={40}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
