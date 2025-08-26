
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Search, Plus, TrendingUp, Users, DollarSign, Activity } from "lucide-react"

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 38000 },
  { month: 'Apr', revenue: 61000, expenses: 42000 },
  { month: 'May', revenue: 55000, expenses: 40000 },
  { month: 'Jun', revenue: 67000, expenses: 45000 },
]

const recentActivities = [
  { id: 1, type: 'Invoice', customer: 'Acme Corp', amount: '$5,200', status: 'Paid', date: '2024-01-15' },
  { id: 2, type: 'Project', customer: 'Tech Solutions', amount: '$12,400', status: 'In Progress', date: '2024-01-14' },
  { id: 3, type: 'Estimate', customer: 'Global Industries', amount: '$8,900', status: 'Pending', date: '2024-01-13' },
  { id: 4, type: 'Contract', customer: 'StartupXYZ', amount: '$15,600', status: 'Signed', date: '2024-01-12' },
  { id: 5, type: 'Invoice', customer: 'Enterprise LLC', amount: '$3,400', status: 'Overdue', date: '2024-01-11' },
]

export function StripeDashboardPage() {
  return (
    <div className="flex-1 space-y-3 p-3 max-h-screen overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-9 w-40"
            />
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-3">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3">
          {/* KPI Cards */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-xs font-medium text-gray-600">Total Revenue</CardTitle>
                <DollarSign className="h-3 w-3 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-gray-900">$328,000</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="mr-1 h-2 w-2" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-xs font-medium text-gray-600">Active Projects</CardTitle>
                <Activity className="h-3 w-3 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-gray-900">24</div>
                <p className="text-xs text-blue-600">
                  +3 new this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-xs font-medium text-gray-600">Total Customers</CardTitle>
                <Users className="h-3 w-3 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-gray-900">156</div>
                <p className="text-xs text-purple-600">
                  +8 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-xs font-medium text-gray-600">Conversion Rate</CardTitle>
                <TrendingUp className="h-3 w-3 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-gray-900">68%</div>
                <p className="text-xs text-green-600">
                  +4% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Revenue Trend</CardTitle>
                <CardDescription className="text-xs">Monthly revenue vs expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#64748b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Monthly Performance</CardTitle>
                <CardDescription className="text-xs">Revenue breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Bar dataKey="revenue" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-xs">Latest business transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Customer</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium text-xs">{activity.type}</TableCell>
                      <TableCell className="text-xs">{activity.customer}</TableCell>
                      <TableCell className="text-xs">{activity.amount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            activity.status === 'Paid' || activity.status === 'Signed' ? 'default' :
                            activity.status === 'Pending' ? 'secondary' :
                            activity.status === 'Overdue' ? 'destructive' : 'outline'
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 text-xs">{activity.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Financial Overview</h3>
            <p className="text-sm text-gray-600">Detailed financial reports and analysis coming soon.</p>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="text-center py-8">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Project Analytics</h3>
            <p className="text-sm text-gray-600">Project performance metrics and insights coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
