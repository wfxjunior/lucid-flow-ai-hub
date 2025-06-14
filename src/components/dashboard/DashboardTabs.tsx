
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LimitedQuickActions } from "@/components/LimitedQuickActions"
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus"
import { 
  TrendingUp, 
  Clock,
  CheckCircle,
  BarChart3
} from "lucide-react"

interface DashboardTabsProps {
  stats: {
    monthlyRevenue: number
    recentActivities: Array<{
      id: number
      action: string
      time: string
      type: string
    }>
    upcomingTasks: Array<{
      id: number
      title: string
      due: string
      priority: string
    }>
  }
  onActionClick: (actionId: string) => void
  onNavigate: (view: string) => void
}

export function DashboardTabs({ stats, onActionClick, onNavigate }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview" className="text-xs sm:text-sm">
          Overview
        </TabsTrigger>
        <TabsTrigger value="tasks" className="text-xs sm:text-sm">
          Tasks & Activities
        </TabsTrigger>
        <TabsTrigger value="quick-actions" className="text-xs sm:text-sm">
          Quick Actions
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Subscription Status - Full width now */}
          <div className="lg:col-span-3">
            <SubscriptionStatus onNavigate={onNavigate} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Revenue Overview
              </CardTitle>
              <CardDescription className="text-sm">
                Monthly revenue tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-lg font-semibold text-gray-800">
                    ${stats.monthlyRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Current Month Revenue</p>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-xs">Revenue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">+12.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-sm">
                Latest business activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'invoice' ? 'bg-blue-500' :
                      activity.type === 'customer' ? 'bg-purple-500' :
                      activity.type === 'estimate' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.action}</p>
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
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Clock className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription className="text-sm">
                Tasks that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.due}
                      </p>
                    </div>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                      className="ml-2 flex-shrink-0"
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
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CheckCircle className="h-5 w-5" />
                Today's Progress
              </CardTitle>
              <CardDescription className="text-sm">
                Your productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tasks Completed</span>
                <span className="font-bold">7/12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Invoices Created</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Calls</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue Generated</span>
                <span className="font-bold">$8,450</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="quick-actions" className="space-y-4">
        <LimitedQuickActions onActionClick={onActionClick} />
      </TabsContent>
    </Tabs>
  )
}
