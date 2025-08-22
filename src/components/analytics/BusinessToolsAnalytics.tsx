import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart3 } from "lucide-react"
import { useState } from "react"

interface BusinessToolsAnalyticsProps {
  completedWorkOrders: number
  workOrders?: any[]
  estimates?: any[]
  estimatesSent: number
  contracts?: any[]
  contractsSigned: number
  clients?: any[]
  activeClients: number
}

const CHART_COLORS = ['#2563EB', '#64748B', '#0EA5E9', '#94A3B8', '#6366F1']

export function BusinessToolsAnalytics({
  completedWorkOrders,
  workOrders,
  estimates,
  estimatesSent,
  contracts,
  contractsSigned,
  clients,
  activeClients
}: BusinessToolsAnalyticsProps) {
  const [selectedBusinessTool, setSelectedBusinessTool] = useState("work-orders")

  const businessToolsData = {
    "work-orders": [
      { name: 'Completed', value: completedWorkOrders, color: CHART_COLORS[0], fill: CHART_COLORS[0] },
      { name: 'In Progress', value: workOrders?.filter(wo => wo.status === 'in_progress').length || 0, color: CHART_COLORS[1], fill: CHART_COLORS[1] },
      { name: 'Pending', value: workOrders?.filter(wo => wo.status === 'pending').length || 0, color: CHART_COLORS[2], fill: CHART_COLORS[2] },
    ],
    "estimates": [
      { name: 'Approved', value: estimates?.filter(est => est.status === 'approved').length || 0, color: CHART_COLORS[0], fill: CHART_COLORS[0] },
      { name: 'Sent', value: estimatesSent, color: CHART_COLORS[1], fill: CHART_COLORS[1] },
      { name: 'Draft', value: estimates?.filter(est => est.status === 'draft').length || 0, color: CHART_COLORS[2], fill: CHART_COLORS[2] },
    ],
    "contracts": [
      { name: 'Active', value: contractsSigned, color: CHART_COLORS[0], fill: CHART_COLORS[0] },
      { name: 'Pending', value: contracts?.filter(c => c.status === 'pending').length || 0, color: CHART_COLORS[1], fill: CHART_COLORS[1] },
      { name: 'Expired', value: contracts?.filter(c => c.status === 'expired').length || 0, color: CHART_COLORS[2], fill: CHART_COLORS[2] },
    ],
    "customers": [
      { name: 'Active', value: activeClients, color: CHART_COLORS[0], fill: CHART_COLORS[0] },
      { name: 'Inactive', value: clients?.filter(c => c.status === 'inactive').length || 0, color: CHART_COLORS[1], fill: CHART_COLORS[1] },
      { name: 'Prospective', value: clients?.filter(c => c.status === 'prospect').length || 0, color: CHART_COLORS[2], fill: CHART_COLORS[2] },
    ],
    "invoices": [
      { name: 'Paid', value: 65, color: CHART_COLORS[0], fill: CHART_COLORS[0] },
      { name: 'Pending', value: 25, color: CHART_COLORS[1], fill: CHART_COLORS[1] },
      { name: 'Overdue', value: 10, color: CHART_COLORS[2], fill: CHART_COLORS[2] },
    ]
  }

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#2563EB",
    },
  }

  return (
    <Card className="bg-white border border-slate-200 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-slate-900">Business Tools Analytics</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Performance metrics for your business tools
            </CardDescription>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <Select value={selectedBusinessTool} onValueChange={setSelectedBusinessTool}>
              <SelectTrigger className="w-full sm:w-[200px] h-9 bg-white border-slate-300 text-slate-700">
                <SelectValue placeholder="Select tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work-orders">Work Orders</SelectItem>
                <SelectItem value="estimates">Estimates</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
                <SelectItem value="invoices">Invoices</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={businessToolsData[selectedBusinessTool as keyof typeof businessToolsData]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                    fontSize={12}
                  >
                    {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Legend and Stats */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 capitalize">
              {selectedBusinessTool.replace('-', ' ')} Overview
            </h4>
            <div className="space-y-3">
              {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-slate-700" />
                <span className="font-medium text-slate-700">Total Items</span>
              </div>
              <span className="text-2xl font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].reduce((sum, item) => sum + item.value, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
