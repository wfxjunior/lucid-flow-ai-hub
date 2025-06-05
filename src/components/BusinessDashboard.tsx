import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Banknote,
  BarChart3,
  FileText,
  HelpCircle,
  LineChart,
  PieChart,
  Settings,
  ShoppingCart,
  Users,
  Zap,
  Calendar,
  Calculator,
  Briefcase,
  Target
} from "lucide-react"

interface BusinessDashboardProps {
  onNavigate: (view: string) => void
}

export function BusinessDashboard({ onNavigate }: BusinessDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>You made $3,400 this month.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="border p-4 rounded-md">
            <div className="font-medium">Total Revenue</div>
            <div className="text-2xl font-bold">$3,400</div>
            <div className="text-sm text-gray-500">+19% from last month</div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="font-medium">New Customers</div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-500">+23% from last month</div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="font-medium">Active Projects</div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-500">-3% from last month</div>
          </div>
          <div className="border p-4 rounded-md">
            <div className="font-medium">Open Support Tickets</div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-gray-500">No change from last month</div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Revenue
            </CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for revenue chart */}
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Revenue Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Expenses
            </CardTitle>
            <CardDescription>Expense distribution</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for expenses chart */}
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Expenses Chart
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-blue-50"
              onClick={() => onNavigate('invoice-creator')}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">Create Invoice</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-green-50"
              onClick={() => onNavigate('customer-management')}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Add Customer</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-purple-50"
              onClick={() => onNavigate('appointments')}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-yellow-50"
              onClick={() => onNavigate('estimates')}
            >
              <Calculator className="w-6 h-6" />
              <span className="text-sm">Estimate</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-indigo-50"
              onClick={() => onNavigate('projects')}
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-sm">New Project</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-emerald-50"
              onClick={() => onNavigate('earnsync')}
            >
              <Target className="w-6 h-6" />
              <span className="text-sm">EarnSync</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your recent business activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New invoice created</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <Banknote className="w-5 h-5 text-green-500" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Customer "John Doe" added</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New order received</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
            <ShoppingCart className="w-5 h-5 text-purple-500" />
          </div>

          <Button variant="link" className="w-full">
            View All
          </Button>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support
          </CardTitle>
          <CardDescription>Need help? Contact our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            If you have any questions or need assistance, please don't hesitate to reach out to our support team.
          </p>
          <Button variant="outline" className="mt-4">
            Contact Support
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </CardTitle>
          <CardDescription>Manage your business settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Customize your business settings to fit your needs.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => onNavigate('settings')}>
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
