
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
      <div className="rounded-2xl p-1 w-fit" style={{ background: 'var(--bg-muted)', marginBottom: '16px' }}>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "overview"
                ? "shadow-sm"
                : "hover-clean"
            }`}
            style={{
              background: activeTab === "overview" ? 'var(--bg-card)' : 'transparent',
              color: activeTab === "overview" ? 'var(--fg-strong)' : 'var(--fg-muted)'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "tasks"
                ? "shadow-sm"
                : "hover-clean"
            }`}
            style={{
              background: activeTab === "tasks" ? 'var(--bg-card)' : 'transparent',
              color: activeTab === "tasks" ? 'var(--fg-strong)' : 'var(--fg-muted)'
            }}
          >
            Tasks & Activities
          </button>
          <button
            onClick={() => setActiveTab("quick-actions")}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === "quick-actions"
                ? "shadow-sm"
                : "hover-clean"
            }`}
            style={{
              background: activeTab === "quick-actions" ? 'var(--bg-card)' : 'transparent',
              color: activeTab === "quick-actions" ? 'var(--fg-strong)' : 'var(--fg-muted)'
            }}
          >
            Quick Actions
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <SubscriptionStatus onNavigate={onNavigate} />
          
          <Card className="dashboard-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold" style={{ color: 'var(--fg-strong)' }}>Recent Activity</CardTitle>
              <CardDescription className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                Latest business activities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'payment' ? 'bg-success' :
                      activity.type === 'invoice' ? '' :
                      activity.type === 'customer' ? 'bg-secondary' :
                      activity.type === 'estimate' ? 'bg-warning' :
                      ''
                    }`} style={{
                      background: activity.type === 'payment' ? '#10b981' :
                                 activity.type === 'invoice' ? 'var(--brand-600)' :
                                 activity.type === 'estimate' ? '#f59e0b' :
                                 'var(--fg-muted)'
                    }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: 'var(--fg-default)' }}>{activity.action}</p>
                      <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{activity.time}</p>
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
          <Card className="dashboard-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold" style={{ color: 'var(--fg-strong)' }}>
                <Clock className="h-5 w-5 dashboard-icon" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                Tasks that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {stats.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm" style={{ color: 'var(--fg-default)' }}>{task.title}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                        Due: {task.due}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                      task.priority === 'medium' ? 'bg-warning/10 text-warning' :
                      'text-muted-foreground'
                    }`} style={{
                      background: task.priority === 'medium' ? '#fef3c7' : 'var(--bg-muted)',
                      color: task.priority === 'medium' ? '#d97706' : 'var(--fg-muted)'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold" style={{ color: 'var(--fg-strong)' }}>
                <CheckCircle className="h-5 w-5 dashboard-icon" />
                Today's Progress
              </CardTitle>
              <CardDescription className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                Your productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm" style={{ color: 'var(--fg-default)' }}>Tasks Completed</span>
                <span className="font-semibold table-numeric" style={{ color: 'var(--fg-default)' }}>0/0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm" style={{ color: 'var(--fg-default)' }}>Invoices Created</span>
                <span className="font-semibold table-numeric" style={{ color: 'var(--fg-default)' }}>0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm" style={{ color: 'var(--fg-default)' }}>Customer Calls</span>
                <span className="font-semibold table-numeric" style={{ color: 'var(--fg-default)' }}>0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm" style={{ color: 'var(--fg-default)' }}>Revenue Generated</span>
                <span className="font-semibold table-numeric" style={{ color: 'var(--fg-default)' }}>$0</span>
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
