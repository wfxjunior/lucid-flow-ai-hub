
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
      {/* Clean tab navigation */}
      <div className="bg-slate-100 rounded-lg p-1 w-fit" style={{ marginBottom: '16px' }}>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "tasks"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tasks & Activities
          </button>
          <button
            onClick={() => setActiveTab("quick-actions")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === "quick-actions"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
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
          
          <Card className="bg-white border border-slate-200 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Latest business activities
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'payment' ? 'bg-slate-700' :
                      activity.type === 'invoice' ? 'bg-slate-700' :
                      activity.type === 'customer' ? 'bg-slate-700' :
                      activity.type === 'estimate' ? 'bg-slate-700' :
                      'bg-slate-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
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
          <Card className="bg-white border border-slate-200 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Clock className="h-5 w-5 text-slate-700" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Tasks that need your attention
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {stats.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Due: {task.due}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      task.priority === 'high' ? 'bg-slate-100 text-slate-700' :
                      task.priority === 'medium' ? 'bg-slate-100 text-slate-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-slate-200 rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <CheckCircle className="h-5 w-5 text-slate-700" />
                Today's Progress
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Your productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Tasks Completed</span>
                <span className="font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>0/0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Invoices Created</span>
                <span className="font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Customer Calls</span>
                <span className="font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>0</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Revenue Generated</span>
                <span className="font-semibold text-slate-900 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>$0</span>
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
