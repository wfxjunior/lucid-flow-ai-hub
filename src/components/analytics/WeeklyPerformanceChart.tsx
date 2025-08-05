
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
    <Card className="w-full">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Weekly Performance</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Tasks completed this week</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
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
              <Bar 
                dataKey="tasks" 
                fill="#10b981"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
