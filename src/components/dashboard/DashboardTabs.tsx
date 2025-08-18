
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LimitedQuickActions } from "@/components/LimitedQuickActions"
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus"
import { 
  TrendingUp, 
  Clock,
  CheckCircle
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
    <div className="space-y-6" style={{ marginTop: '12px', marginBottom: '12px' }}>
      {/* Soft tab navigation */}
      <div className="bg-muted rounded-2xl p-1 w-fit" style={{ marginBottom: '16px' }}>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "tasks"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tasks & Activities
          </button>
          <button
            onClick={() => setActiveTab("quick-actions")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "quick-actions"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quick Actions
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <SubscriptionStatus onNavigate={onNavigate} />
          
          <Card className="bg-card border border-border rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Latest business activities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'payment' ? 'bg-success' :
                      activity.type === 'invoice' ? 'bg-primary' :
                      activity.type === 'customer' ? 'bg-secondary' :
                      activity.type === 'estimate' ? 'bg-warning' :
                      'bg-muted-foreground'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="bg-card border border-border rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Tasks that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {stats.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Due: {task.due}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      task.priority === 'medium' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <CheckCircle className="h-5 w-5" />
                Today's Progress
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Your productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">Tasks Completed</span>
                <span className="font-semibold text-foreground">0/0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">Invoices Created</span>
                <span className="font-semibold text-foreground">0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">Customer Calls</span>
                <span className="font-semibold text-foreground">0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">Revenue Generated</span>
                <span className="font-semibold text-foreground">$0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "quick-actions" && (
        <LimitedQuickActions onActionClick={onActionClick} />
      )}
    </div>
  )
}
