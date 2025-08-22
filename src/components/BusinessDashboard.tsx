
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuickActions } from "@/components/QuickActions"
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
  TrendingUp,
  DollarSign,
  Activity,
  Calendar
} from "lucide-react"

interface BusinessDashboardProps {
  onNavigate: (view: string) => void
}

export function BusinessDashboard({ onNavigate }: BusinessDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="stripe-button-secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button size="sm" className="stripe-button-primary">
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stripe-metric-card stripe-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">$3,400</p>
                <p className="text-sm text-green-600 font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +19% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="stripe-metric-card stripe-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Customers</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">12</p>
                <p className="text-sm text-green-600 font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +23% from last month
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="stripe-metric-card stripe-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">4</p>
                <p className="text-sm text-red-600 font-medium mt-1 flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  -3% from last month
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="stripe-metric-card stripe-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">2</p>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  No change from last month
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <HelpCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="stripe-card stripe-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    Revenue
                  </CardTitle>
                  <CardDescription className="text-gray-600">Monthly revenue trend</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200">
                Revenue Chart
              </div>
            </CardContent>
          </Card>

          <Card className="stripe-card stripe-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Expenses
                  </CardTitle>
                  <CardDescription className="text-gray-600">Expense distribution</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200">
                Expenses Chart
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActions onActionClick={onNavigate} />

        {/* Recent Activity */}
        <Card className="stripe-card stripe-fade-in">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-600">Your recent business activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New invoice created</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Customer "John Doe" added</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New order received</p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support & Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="stripe-card stripe-fade-in">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Support
              </CardTitle>
              <CardDescription className="text-gray-600">Need help? Contact our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions or need assistance, please don't hesitate to reach out to our support team.
              </p>
              <Button variant="outline" className="stripe-button-secondary">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="stripe-card stripe-fade-in">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Settings
              </CardTitle>
              <CardDescription className="text-gray-600">Manage your business settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Customize your business settings to fit your needs.
              </p>
              <Button variant="outline" className="stripe-button-secondary" onClick={() => onNavigate('settings')}>
                Go to Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
