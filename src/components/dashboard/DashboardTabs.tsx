
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickActions } from "@/components/QuickActions"
import { LimitedQuickActions } from "@/components/LimitedQuickActions"
import { Activity, Clock, Target, TrendingUp } from "lucide-react"
import { CapabilitiesPills } from "./CapabilitiesPills"

interface DashboardTabsProps {
  stats: any
  onActionClick: (actionId: string) => void
  onNavigate: (view: string) => void
}

export function DashboardTabs({ stats, onActionClick, onNavigate }: DashboardTabsProps) {
  const handleCapabilityClick = (capabilityId: string) => {
    console.log('Capability clicked:', capabilityId)
    onNavigate(capabilityId)
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeProjects || 12}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingTasks || 8}</div>
              <p className="text-xs text-muted-foreground">
                -3 from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.goalsCompleted || 24}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.growthRate || "23%"}</div>
              <p className="text-xs text-muted-foreground">
                +5% from last quarter
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="capabilities" className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Business Capabilities</CardTitle>
            <CardDescription>
              Explore all available tools and features to grow your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CapabilitiesPills onCapabilityClick={handleCapabilityClick} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="quick-actions" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Quickly access the most common business operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LimitedQuickActions onActionClick={onActionClick} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
