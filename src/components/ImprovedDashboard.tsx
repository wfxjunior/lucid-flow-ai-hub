
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/StatsCard"
import { QuickActions } from "@/components/QuickActions"
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus"
import { useDashboardData } from "@/hooks/useDashboardData"
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
  Zap,
  RefreshCw
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ImprovedDashboardProps {
  onNavigate: (view: string) => void
}

export function ImprovedDashboard({ onNavigate }: ImprovedDashboardProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const { stats, loading, error, refreshData } = useDashboardData()

  // Debug log para verificar se o componente está sendo renderizado
  useEffect(() => {
    console.log('ImprovedDashboard mounted with onNavigate:', typeof onNavigate)
  }, [])

  // Verificação de segurança para garantir que onNavigate existe
  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId)
    if (typeof onNavigate === 'function') {
      onNavigate(actionId)
    } else {
      console.error('onNavigate is not a function:', onNavigate)
    }
  }

  const handleNavigateInternal = (view: string) => {
    console.log('Internal navigation to:', view)
    if (typeof onNavigate === 'function') {
      onNavigate(view)
    } else {
      console.error('onNavigate is not a function:', onNavigate)
    }
  }

  // Fixed navigation function for subscription upgrade
  const handleSubscriptionUpgrade = () => {
    console.log('Upgrading subscription - navigating to pricing')
    if (typeof onNavigate === 'function') {
      onNavigate('pricing')
    } else {
      // Fallback navigation
      window.location.href = '/#pricing'
    }
  }

  const statsCards = [
    {
      title: t ? t("dashboard.monthlyRevenue", "Monthly Revenue") : "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: stats.monthlyRevenue > 0 ? `+${((stats.monthlyRevenue / 1000) * 2.5).toFixed(1)}%` : "0%",
      icon: DollarSign,
      trend: stats.monthlyRevenue > 0 ? "up" as const : "neutral" as const
    },
    {
      title: t ? t("dashboard.activeCustomers", "Active Customers") : "Active Customers",
      value: stats.activeCustomers.toString(),
      change: stats.activeCustomers > 0 ? `+${(stats.activeCustomers * 1.2).toFixed(1)}%` : "0%",
      icon: Users,
      trend: stats.activeCustomers > 0 ? "up" as const : "neutral" as const
    },
    {
      title: t ? t("dashboard.pendingInvoices", "Pending Invoices") : "Pending Invoices",
      value: stats.pendingInvoices.toString(),
      change: "0%",
      icon: FileText,
      trend: "neutral" as const
    },
    {
      title: t ? t("dashboard.monthlyGoals", "This Month's Goals") : "This Month's Goals",
      value: `${stats.monthlyGoals}%`,
      change: stats.monthlyGoals > 0 ? `+${(stats.monthlyGoals * 0.8).toFixed(1)}%` : "0%",
      icon: Target,
      trend: stats.monthlyGoals > 50 ? "up" as const : "neutral" as const
    }
  ]

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t ? t("dashboard.title", "Business Dashboard") : "Business Dashboard"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {t ? t("dashboard.loading", "Loading your business data...") : "Loading your business data..."}
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t ? t("dashboard.title", "Business Dashboard") : "Business Dashboard"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {t ? t("dashboard.welcome", "Welcome back! Here's what's happening with your business today.") : "Welcome back! Here's what's happening with your business today."}
            </p>
          </div>
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading dashboard data: {error}</p>
            </div>
            <Button onClick={refreshData} variant="outline" className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Improved mobile layout */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t ? t("dashboard.title", "Business Dashboard") : "Business Dashboard"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {t ? t("dashboard.welcome", "Welcome back! Here's what's happening with your business today.") : "Welcome back! Here's what's happening with your business today."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleNavigateInternal('analytics')} className="w-full sm:w-auto">
            <BarChart3 className="mr-2 h-4 w-4" />
            {t ? t("dashboard.viewAnalytics", "View Analytics") : "View Analytics"}
          </Button>
          <Button onClick={() => handleNavigateInternal('invoice-creator')} className="w-full sm:w-auto">
            <Zap className="mr-2 h-4 w-4" />
            {t ? t("dashboard.createInvoice", "Create Invoice") : "Create Invoice"}
          </Button>
          <Button variant="outline" onClick={refreshData} size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards - Improved responsive grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
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
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            {t ? t("dashboard.overview", "Overview") : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs sm:text-sm">
            {t ? t("dashboard.tasksActivities", "Tasks & Activities") : "Tasks & Activities"}
          </TabsTrigger>
          <TabsTrigger value="quick-actions" className="text-xs sm:text-sm">
            {t ? t("dashboard.quickActions", "Quick Actions") : "Quick Actions"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Quick Actions Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {t ? t("dashboard.quickActions", "Quick Actions") : "Quick Actions"}
                </CardTitle>
                <CardDescription>Access your most used business tools</CardDescription>
              </CardHeader>
              <CardContent>
                <QuickActions onActionClick={handleQuickAction} />
              </CardContent>
            </Card>

            {/* Subscription Status with fixed navigation */}
            <SubscriptionStatus onNavigate={handleSubscriptionUpgrade} />
          </div>

          <div className="grid gap-4 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {t ? t("dashboard.revenueOverview", "Revenue Overview") : "Revenue Overview"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t ? t("dashboard.monthlyRevenue6Months", "Monthly revenue tracking") : "Monthly revenue tracking"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {stats.monthlyRevenue > 0 
                        ? `Current Month: $${stats.monthlyRevenue.toLocaleString()}`
                        : "No revenue data yet. Start creating invoices!"
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {t ? t("dashboard.recentActivity", "Recent Activity") : "Recent Activity"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t ? t("dashboard.latestActivities", "Latest business activities") : "Latest business activities"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivities.length > 0 ? (
                    stats.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No recent activities</p>
                      <p className="text-xs text-gray-400">Activities will appear here as you use the platform</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Clock className="h-5 w-5" />
                  {t ? t("dashboard.upcomingTasks", "Upcoming Tasks") : "Upcoming Tasks"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t ? t("dashboard.tasksNeedAttention", "Tasks that need your attention") : "Tasks that need your attention"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.upcomingTasks.length > 0 ? (
                    stats.upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{task.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {t ? t("dashboard.due", "Due") : "Due"}: {task.due}
                          </p>
                        </div>
                        <Badge 
                          variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                          className="ml-2 flex-shrink-0"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No upcoming tasks</p>
                      <p className="text-xs text-gray-400">Schedule appointments to see them here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CheckCircle className="h-5 w-5" />
                  {t ? t("dashboard.todayProgress", "Today's Progress") : "Today's Progress"}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t ? t("dashboard.productivityMetrics", "Your productivity metrics") : "Your productivity metrics"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {t ? t("dashboard.tasksCompleted", "Tasks Completed") : "Tasks Completed"}
                  </span>
                  <span className="font-bold">{stats.upcomingTasks.length}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {t ? t("dashboard.invoicesSent", "Invoices Created") : "Invoices Created"}
                  </span>
                  <span className="font-bold">{stats.pendingInvoices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {t ? t("dashboard.meetingsAttended", "Active Customers") : "Active Customers"}
                  </span>
                  <span className="font-bold">{stats.activeCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {t ? t("dashboard.customerCalls", "Monthly Revenue") : "Monthly Revenue"}
                  </span>
                  <span className="font-bold">${stats.monthlyRevenue.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-4">
          <QuickActions onActionClick={handleQuickAction} />
        </TabsContent>
      </Tabs>

      {/* Bottom Section - Key Metrics - Improved mobile grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t("dashboard.activeProjects", "Active Projects") : "Active Projects"}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {t ? t("dashboard.fromLastMonth", "Scheduled appointments") : "Scheduled appointments"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t("dashboard.conversionRate", "Conversion Rate") : "Conversion Rate"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyGoals}%</div>
            <p className="text-xs text-muted-foreground">
              {t ? t("dashboard.fromLastMonth42", "Progress towards goals") : "Progress towards goals"}
            </p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t("dashboard.averageDealSize", "Average Deal Size") : "Average Deal Size"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.activeCustomers > 0 ? Math.round(stats.monthlyRevenue / stats.activeCustomers).toLocaleString() : '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {t ? t("dashboard.fromLastMonth121", "Revenue per customer") : "Revenue per customer"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
