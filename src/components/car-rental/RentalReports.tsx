
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Jan', revenue: 12000, rentals: 45 },
  { month: 'Feb', revenue: 15000, rentals: 52 },
  { month: 'Mar', revenue: 18000, rentals: 60 },
  { month: 'Apr', revenue: 16000, rentals: 55 },
  { month: 'May', revenue: 20000, rentals: 68 },
  { month: 'Jun', revenue: 22000, rentals: 72 }
]

const vehicleTypeData = [
  { name: 'Sedan', value: 40, color: '#3b82f6' },
  { name: 'SUV', value: 35, color: '#10b981' },
  { name: 'Hatchback', value: 15, color: '#f59e0b' },
  { name: 'Luxury', value: 10, color: '#8b5cf6' }
]

export function RentalReports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Rental Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analytics and insights for your rental business
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">352</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-xs text-muted-foreground">
              +0.5 days from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
