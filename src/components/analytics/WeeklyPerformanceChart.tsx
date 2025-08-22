
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weeklyData = [
  { day: 'Mon', tasks: 0 },
  { day: 'Tue', tasks: 0 },
  { day: 'Wed', tasks: 0 },
  { day: 'Thu', tasks: 0 },
  { day: 'Fri', tasks: 0 },
  { day: 'Sat', tasks: 0 },
  { day: 'Sun', tasks: 0 },
]

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#64748B",
  },
}

export function WeeklyPerformanceChart() {
  return (
    <Card className="w-full bg-white border border-slate-200 rounded-xl">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold text-slate-900">Weekly Performance</CardTitle>
        <CardDescription className="text-sm text-slate-500">Tasks completed this week</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
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
              <Bar 
                dataKey="tasks" 
                fill="#64748B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
