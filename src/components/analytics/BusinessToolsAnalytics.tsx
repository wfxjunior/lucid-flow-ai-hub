
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
      { name: 'Completed', value: completedWorkOrders, color: '#10b981', fill: '#10b981' },
      { name: 'In Progress', value: workOrders?.filter(wo => wo.status === 'in_progress').length || 0, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Pending', value: workOrders?.filter(wo => wo.status === 'pending').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "estimates": [
      { name: 'Approved', value: estimates?.filter(est => est.status === 'approved').length || 0, color: '#10b981', fill: '#10b981' },
      { name: 'Sent', value: estimatesSent, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Draft', value: estimates?.filter(est => est.status === 'draft').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "contracts": [
      { name: 'Active', value: contractsSigned, color: '#10b981', fill: '#10b981' },
      { name: 'Pending', value: contracts?.filter(c => c.status === 'pending').length || 0, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Expired', value: contracts?.filter(c => c.status === 'expired').length || 0, color: '#6b7280', fill: '#6b7280' },
    ],
    "customers": [
      { name: 'Active', value: activeClients, color: '#10b981', fill: '#10b981' },
      { name: 'Inactive', value: clients?.filter(c => c.status === 'inactive').length || 0, color: '#6b7280', fill: '#6b7280' },
      { name: 'Prospective', value: clients?.filter(c => c.status === 'prospect').length || 0, color: '#3b82f6', fill: '#3b82f6' },
    ],
    "invoices": [
      { name: 'Paid', value: 65, color: '#10b981', fill: '#10b981' },
      { name: 'Pending', value: 25, color: '#3b82f6', fill: '#3b82f6' },
      { name: 'Overdue', value: 10, color: '#6b7280', fill: '#6b7280' },
    ]
  }

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#3b82f6",
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Business Tools Analytics</CardTitle>
            <CardDescription>Performance metrics for your business tools</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedBusinessTool} onValueChange={setSelectedBusinessTool}>
              <SelectTrigger className="w-[200px]">
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
      <CardContent>
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
                    fontSize={10}
                  >
                    {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Legend and Stats */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold capitalize">
              {selectedBusinessTool.replace('-', ' ')} Overview
            </h4>
            <div className="space-y-3">
              {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Total Items</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {businessToolsData[selectedBusinessTool as keyof typeof businessToolsData].reduce((sum, item) => sum + item.value, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
