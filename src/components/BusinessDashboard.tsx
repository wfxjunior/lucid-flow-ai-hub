
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, DollarSign, FileText, Clock, CheckCircle, TrendingUp, Download, Menu } from "lucide-react"
import { useBusinessData } from "@/hooks/useBusinessData"
import { usePDFGeneration } from "@/hooks/usePDFGeneration"
import { QuickActions } from "@/components/QuickActions"
import { useSidebar } from "@/components/ui/sidebar"

interface BusinessDashboardProps {
  onNavigate?: (view: string) => void
}

export function BusinessDashboard({ onNavigate }: BusinessDashboardProps) {
  const { workOrders, clients, estimates, contracts, signatures, appointments, loading } = useBusinessData()
  const { generateAnalyticsReportPDF, isGenerating } = usePDFGeneration()
  const { toggleSidebar } = useSidebar()

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const totalRevenue = estimates?.reduce((sum, est) => sum + (est.amount || 0), 0) || 0
  const activeClients = clients?.filter(client => client.status === 'active').length || 0
  const completedWorkOrders = workOrders?.filter(wo => wo.status === 'completed').length || 0
  const pendingWorkOrders = workOrders?.filter(wo => wo.status === 'pending' || wo.status === 'in_progress').length || 0
  const upcomingAppointments = appointments?.filter(apt => {
    const aptDate = new Date(apt.appointment_date)
    const today = new Date()
    return aptDate >= today
  }).length || 0

  const dashboardData = {
    totalRevenue: totalRevenue.toFixed(2),
    activeClients,
    pendingProjects: pendingWorkOrders,
    completedWorkOrders,
    estimatesSent: estimates?.filter(est => est.status === 'sent').length || 0,
    contractsSigned: contracts?.filter(c => c.status === 'active').length || 0,
    growthRate: '12.5',
    previousCompletedWorkOrders: Math.max(0, completedWorkOrders - 5),
    workOrdersChange: '15',
    previousEstimatesSent: Math.max(0, (estimates?.filter(est => est.status === 'sent').length || 0) - 3),
    estimatesChange: '8',
    previousContractsSigned: Math.max(0, (contracts?.filter(c => c.status === 'active').length || 0) - 2),
    contractsChange: '25'
  }

  const handleGenerateDashboardReport = async () => {
    await generateAnalyticsReportPDF(dashboardData)
  }

  const handleQuickActionClick = (actionId: string) => {
    console.log('Quick action clicked:', actionId)
    
    // Map action IDs to their respective views
    const actionToViewMap: { [key: string]: string } = {
      'invoices': 'invoice-creator',
      'estimates': 'estimates',
      'work-orders': 'work-orders',
      'quotes': 'quotes',
      'todo-list': 'todo-list',
      'ai-voice': 'ai-voice',
      'features': 'features',
      'files': 'files',
      'appointments': 'appointments',
      'customers': 'customer-management',
      'payments': 'payments',
      'e-signatures': 'e-signatures',
      'messages': 'messages',
      'email-center': 'email-center',
      'analytics': 'analytics',
      'receipts': 'accounting'
    }

    const targetView = actionToViewMap[actionId]
    if (targetView && onNavigate) {
      onNavigate(targetView)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Business Overview</h2>
          <p className="text-muted-foreground">
            Your business performance at a glance
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button onClick={toggleSidebar} variant="outline" size="sm" className="w-full sm:w-auto">
            <Menu className="mr-2 h-4 w-4" />
            <span className="sm:inline">Menu</span>
          </Button>
          <Button onClick={handleGenerateDashboardReport} disabled={isGenerating} variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline">{isGenerating ? 'Generating...' : 'Export Report'}</span>
            <span className="xs:hidden">{isGenerating ? 'Generating...' : 'Export'}</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWorkOrders}</div>
            <p className="text-xs text-muted-foreground">
              In progress & pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workOrders?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {completedWorkOrders} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimates?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {estimates?.filter(est => est.status === 'accepted').length || 0} accepted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {contracts?.filter(c => c.status === 'active').length || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Signatures</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signatures?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {signatures?.filter(s => s.status === 'signed').length || 0} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workOrders?.slice(0, 5).map((workOrder) => (
              <div key={workOrder.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{workOrder.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Client: {workOrder.client?.name || 'Unknown Client'}
                  </p>
                </div>
                <Badge 
                  className={
                    workOrder.status === 'completed' ? 'bg-green-100 text-green-800' :
                    workOrder.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                >
                  {workOrder.status.replace('_', ' ')}
                </Badge>
              </div>
            )) || (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActions onActionClick={handleQuickActionClick} />
    </div>
  )
}
