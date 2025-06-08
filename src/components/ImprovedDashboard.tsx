
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/StatsCard"
import { QuickActions } from "@/components/QuickActions"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Target,
  Zap
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ImprovedDashboardProps {
  onNavigate: (view: string) => void
}

export function ImprovedDashboard({ onNavigate }: ImprovedDashboardProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: t("dashboard.monthlyRevenue", "Monthly Revenue"),
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: t("dashboard.activeCustomers", "Active Customers"),
      value: "1,234",
      change: "+5.2%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: t("dashboard.pendingInvoices", "Pending Invoices"),
      value: "23",
      change: "-8.1%",
      icon: FileText,
      trend: "down" as const
    },
    {
      title: t("dashboard.monthlyGoals", "This Month's Goals"),
      value: "87%",
      change: "+15.3%",
      icon: Target,
      trend: "up" as const
    }
  ]

  const upcomingTasks = [
    { id: 1, title: t("dashboard.followUpClient", "Follow up with client ABC Corp"), due: t("dashboard.today", "Today"), priority: "high" },
    { id: 2, title: t("dashboard.monthlyReport", "Send monthly report to stakeholders"), due: t("dashboard.tomorrow", "Tomorrow"), priority: "medium" },
    { id: 3, title: t("dashboard.reviewContracts", "Review and approve new contracts"), due: t("dashboard.friday", "Friday"), priority: "high" },
    { id: 4, title: t("dashboard.updateTimeline", "Update project timeline"), due: t("dashboard.nextWeek", "Next week"), priority: "low" }
  ]

  const recentActivities = [
    { id: 1, action: t("dashboard.invoiceSent", "Invoice #001 sent to ABC Corp"), time: t("dashboard.hoursAgo", "2 hours ago"), type: "invoice" },
    { id: 2, action: t("dashboard.newCustomer", "New customer registration: XYZ Ltd"), time: t("dashboard.hoursAgo4", "4 hours ago"), type: "customer" },
    { id: 3, action: t("dashboard.paymentReceived", "Payment received: $2,500"), time: t("dashboard.hoursAgo6", "6 hours ago"), type: "payment" },
    { id: 4, action: t("dashboard.milestoneCompleted", "Project milestone completed"), time: t("dashboard.dayAgo", "1 day ago"), type: "project" }
  ]

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId)
    onNavigate(actionId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title", "Business Dashboard")}</h1>
          <p className="text-muted-foreground">
            {t("dashboard.welcome", "Welcome back! Here's what's happening with your business today.")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            {t("dashboard.viewAnalytics", "View Analytics")}
          </Button>
          <Button onClick={() => onNavigate('invoice-creator')}>
            <Zap className="mr-2 h-4 w-4" />
            {t("dashboard.createInvoice", "Create Invoice")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t("dashboard.overview", "Overview")}</TabsTrigger>
          <TabsTrigger value="tasks">{t("dashboard.tasksActivities", "Tasks & Activities")}</TabsTrigger>
          <TabsTrigger value="quick-actions">{t("dashboard.quickActions", "Quick Actions")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Actions Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.quickActions", "Quick Actions")}</CardTitle>
              <CardDescription>Access your most used business tools</CardDescription>
            </CardHeader>
            <CardContent>
              <QuickActions onActionClick={handleQuickAction} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("dashboard.revenueOverview", "Revenue Overview")}</CardTitle>
                <CardDescription>{t("dashboard.monthlyRevenue6Months", "Monthly revenue for the last 6 months")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{t("dashboard.revenueChartPlaceholder", "Revenue chart will be displayed here")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("dashboard.recentActivity", "Recent Activity")}</CardTitle>
                <CardDescription>{t("dashboard.latestActivities", "Latest business activities")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {t("dashboard.upcomingTasks", "Upcoming Tasks")}
                </CardTitle>
                <CardDescription>{t("dashboard.tasksNeedAttention", "Tasks that need your attention")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{t("dashboard.due", "Due")}: {task.due}</p>
                      </div>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {t("dashboard.todayProgress", "Today's Progress")}
                </CardTitle>
                <CardDescription>{t("dashboard.productivityMetrics", "Your productivity metrics")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("dashboard.tasksCompleted", "Tasks Completed")}</span>
                  <span className="font-bold">7/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("dashboard.invoicesSent", "Invoices Sent")}</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("dashboard.meetingsAttended", "Meetings Attended")}</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t("dashboard.customerCalls", "Customer Calls")}</span>
                  <span className="font-bold">5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-4">
          <QuickActions onActionClick={handleQuickAction} />
        </TabsContent>
      </Tabs>

      {/* Bottom Section - Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.activeProjects", "Active Projects")}</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.fromLastMonth", "+2 from last month")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.conversionRate", "Conversion Rate")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.fromLastMonth42", "+4.2% from last month")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.averageDealSize", "Average Deal Size")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,845</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.fromLastMonth121", "+12.1% from last month")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
