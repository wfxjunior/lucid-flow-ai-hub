
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuickActions } from "@/components/QuickActions"
import { AppIcon } from "@/components/ui/AppIcon"

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
              <AppIcon name="LineChart" size="sm" tone="default" aria-hidden={true} />
              Revenue
            </CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Revenue Chart
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AppIcon name="PieChart" size="sm" tone="default" aria-hidden={true} />
              Expenses
            </CardTitle>
            <CardDescription>Expense distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Expenses Chart
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <QuickActions onActionClick={onNavigate} />

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AppIcon name="Activity" size="sm" tone="default" aria-hidden={true} />
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
            <AppIcon name="FileText" size="sm" tone="default" aria-hidden={true} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Customer "John Doe" added</p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
            <AppIcon name="Users" size="sm" tone="default" aria-hidden={true} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New order received</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
            <AppIcon name="ShoppingCart" size="sm" tone="default" aria-hidden={true} />
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
            <AppIcon name="HelpCircle" size="sm" tone="default" aria-hidden={true} />
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
            <AppIcon name="Settings" size="sm" tone="default" aria-hidden={true} />
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
