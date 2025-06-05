
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Building2, Receipt } from 'lucide-react'

export function EarnSyncDashboard() {
  // Mock data for recent activities
  const recentEarnings = [
    { id: 1, company: 'ABC Corp', amount: 250.00, date: '2024-01-10', status: 'paid' },
    { id: 2, company: 'XYZ Ltd', amount: 180.50, date: '2024-01-09', status: 'pending' },
    { id: 3, company: 'Tech Solutions', amount: 320.00, date: '2024-01-08', status: 'paid' },
  ]

  const recentExpenses = [
    { id: 1, category: 'Fuel', amount: 45.20, date: '2024-01-10', company: 'ABC Corp' },
    { id: 2, category: 'Food', amount: 28.50, date: '2024-01-09', company: 'XYZ Ltd' },
    { id: 3, category: 'Other', amount: 15.00, date: '2024-01-08', company: 'Tech Solutions' },
  ]

  const upcomingJobs = [
    { id: 1, company: 'Future Corp', date: '2024-01-12', workType: 'Consultation' },
    { id: 2, company: 'Next Gen Ltd', date: '2024-01-15', workType: 'Development' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Earnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Recent Earnings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentEarnings.map((earning) => (
            <div key={earning.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{earning.company}</p>
                <p className="text-sm text-gray-600">{earning.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">${earning.amount}</p>
                <Badge variant={earning.status === 'paid' ? 'default' : 'secondary'}>
                  {earning.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Recent Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{expense.category}</p>
                <p className="text-sm text-gray-600">{expense.company}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">-${expense.amount}</p>
                <p className="text-sm text-gray-600">{expense.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Jobs */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium">{job.company}</p>
                  <p className="text-sm text-gray-600">{job.workType}</p>
                  <p className="text-sm text-gray-500">{job.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
