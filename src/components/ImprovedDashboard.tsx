
import { useDashboardData } from "@/hooks/useDashboardData"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { DashboardTabs } from "@/components/dashboard/DashboardTabs"
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  FileText, 
  Target,
  Calendar,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react"

interface ImprovedDashboardProps {
  onNavigate: (view: string) => void
}

export function ImprovedDashboard({ onNavigate }: ImprovedDashboardProps) {
  const { stats, loading, error, refreshData } = useDashboardData()

  console.log('ImprovedDashboard: Rendering with stats:', stats)

  // Mock data for demonstration - in real app this would come from useDashboardData
  const dashboardData = {
    monthlyRevenue: 12450,
    activeCustomers: 24,
    pendingInvoices: 3,
    monthlyGoals: 85,
    recentActivities: [
      { id: 1, action: "New invoice created #INV-2024-001", time: "2 hours ago", type: "invoice" },
      { id: 2, action: "Payment received from John Doe", time: "4 hours ago", type: "payment" },
      { id: 3, action: "New customer registered", time: "1 day ago", type: "customer" },
      { id: 4, action: "Project milestone completed", time: "2 days ago", type: "project" }
    ],
    upcomingTasks: [
      { id: 1, title: "Follow up with Johnson Construction", due: "Today", priority: "high" },
      { id: 2, title: "Prepare monthly report", due: "Tomorrow", priority: "medium" },
      { id: 3, title: "Client meeting - ABC Corp", due: "Friday", priority: "high" },
      { id: 4, title: "Update project timeline", due: "Next week", priority: "low" }
    ]
  }

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId)
    if (typeof onNavigate === 'function') {
      onNavigate(actionId)
    }
  }

  const handleNavigateInternal = (view: string) => {
    console.log('Internal navigation to:', view)
    if (typeof onNavigate === 'function') {
      onNavigate(view)
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6">
      <div className="w-full mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Business Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <Button onClick={refreshData} variant="outline" disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.monthlyRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.activeCustomers}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +5.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.pendingInvoices}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                -8.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.monthlyGoals}%</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +15.3% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Overview, Tasks & Activities, Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Overview Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Your business performance this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Goal</span>
                  <span>{dashboardData.monthlyGoals}%</span>
                </div>
                <Progress value={dashboardData.monthlyGoals} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-green-600">${(dashboardData.monthlyRevenue * 0.3).toFixed(0)}K</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{Math.floor(dashboardData.activeCustomers * 0.4)}</div>
                  <div className="text-xs text-muted-foreground">New Clients</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks & Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Tasks & Activities
              </CardTitle>
              <CardDescription>Recent activities and upcoming tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div>
                  <h4 className="font-medium mb-3">Recent Activities</h4>
                  <div className="space-y-3">
                    {dashboardData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'payment' ? 'bg-green-500' :
                          activity.type === 'invoice' ? 'bg-blue-500' :
                          activity.type === 'customer' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div>
                  <h4 className="font-medium mb-3">Upcoming Tasks</h4>
                  <div className="space-y-3">
                    {dashboardData.upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                        <CheckCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{task.due}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              task.priority === 'high' ? 'bg-red-100 text-red-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleQuickAction('invoice-creator')}
              >
                <FileText className="h-6 w-6" />
                Create Invoice
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleQuickAction('customers')}
              >
                <Users className="h-6 w-6" />
                Manage Customers
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleQuickAction('projects')}
              >
                <BarChart3 className="h-6 w-6" />
                View Projects
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => handleQuickAction('payments')}
              >
                <DollarSign className="h-6 w-6" />
                Track Payments
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              Subscription Status
            </CardTitle>
            <CardDescription>Manage your FeatherBiz subscription and billing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Plan: <span className="text-blue-600">Free</span></p>
                  <p className="text-sm text-muted-foreground">Status: <span className="text-green-600">Free Plan</span></p>
                </div>
                <Button onClick={() => handleNavigateInternal('pricing')} className="bg-blue-600 hover:bg-blue-700">
                  Upgrade
                </Button>
              </div>
              
              <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">🎯 Free Plan Active</h4>
                <p className="text-sm text-blue-700 mb-3">You're currently using the free plan with limited features. Upgrade to Professional to unlock:</p>
                <ul className="text-sm text-blue-700 space-y-1 ml-4">
                  <li>• Unlimited invoices and estimates</li>
                  <li>• AI voice assistant</li>
                  <li>• Advanced analytics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
