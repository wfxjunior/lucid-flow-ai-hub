
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weeklyData = [
  { day: 'Mon', tasks: 0, color: '#10b981' },
  { day: 'Tue', tasks: 0, color: '#10b981' },
  { day: 'Wed', tasks: 0, color: '#10b981' },
  { day: 'Thu', tasks: 0, color: '#10b981' },
  { day: 'Fri', tasks: 0, color: '#10b981' },
  { day: 'Sat', tasks: 0, color: '#10b981' },
  { day: 'Sun', tasks: 0, color: '#10b981' },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#10b981",
  },
}

export function WeeklyPerformanceChart() {
  return (
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
  )
}
