import { useState } from "react"
import { Users, Activity, Settings, FileText, BarChart3, Shield, Database, Bell, Search, Filter, Globe, Clock, MessageSquare as FeedbackIcon, Download, Languages, FileSpreadsheet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "moderator"
  status: "active" | "suspended" | "pending"
  lastLogin: string
  joinDate: string
  currentPage?: string
  sessionDuration?: string
  country?: string
}

interface ActivityLog {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
}

interface Feedback {
  id: string
  user: string
  type: "bug" | "feature" | "general"
  subject: string
  message: string
  status: "pending" | "resolved" | "in-progress"
  timestamp: string
}

export function AdminDashboard() {
  const { toast } = useToast()
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      role: "user",
      status: "active",
      lastLogin: "2024-01-20",
      joinDate: "2024-01-01",
      currentPage: "/dashboard",
      sessionDuration: "2h 15m",
      country: "Brazil"
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@example.com",
      role: "moderator",
      status: "active",
      lastLogin: "2024-01-19",
      joinDate: "2024-01-05",
      currentPage: "/invoices",
      sessionDuration: "45m",
      country: "Portugal"
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@example.com",
      role: "user",
      status: "suspended",
      lastLogin: "2024-01-15",
      joinDate: "2024-01-10",
      currentPage: "/offline",
      sessionDuration: "0m",
      country: "Spain"
    }
  ])

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      user: "João Silva",
      type: "bug",
      subject: "Invoice generation error",
      message: "Getting an error when trying to generate PDF invoices",
      status: "pending",
      timestamp: "2024-01-20 14:30"
    },
    {
      id: "2",
      user: "Maria Santos",
      type: "feature",
      subject: "Dark mode request",
      message: "Would love to have a dark mode option",
      status: "in-progress",
      timestamp: "2024-01-19 10:15"
    }
  ])

  const countryStats = [
    { country: "Brazil", users: 45, percentage: 35 },
    { country: "Portugal", users: 32, percentage: 25 },
    { country: "Spain", users: 28, percentage: 22 },
    { country: "USA", users: 15, percentage: 12 },
    { country: "Others", users: 8, percentage: 6 }
  ]

  const languageStats = [
    { language: "Portuguese", users: 77, percentage: 60, code: "pt" },
    { language: "Spanish", users: 28, percentage: 22, code: "es" },
    { language: "English", users: 15, percentage: 12, code: "en" },
    { language: "French", users: 5, percentage: 4, code: "fr" },
    { language: "German", users: 3, percentage: 2, code: "de" }
  ]

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      user: "João Silva",
      action: "Created Invoice",
      timestamp: "2024-01-20 14:30",
      details: "Invoice #INV-001 created for $500"
    },
    {
      id: "2",
      user: "Maria Santos",
      action: "User Promoted",
      timestamp: "2024-01-20 12:15",
      details: "Promoted user to moderator role"
    },
    {
      id: "3",
      user: "Pedro Costa",
      action: "Login Attempt",
      timestamp: "2024-01-20 10:45",
      details: "Failed login attempt from IP 192.168.1.1"
    }
  ])

  // Global data for all pages export
  const allPagesData = {
    dashboard: { name: "Dashboard", records: 1, description: "Main dashboard data" },
    invoices: { name: "Invoices", records: 234, description: "All invoice records" },
    customers: { name: "Customers", records: 156, description: "Customer database" },
    projects: { name: "Projects", records: 89, description: "Project management data" },
    appointments: { name: "Appointments", records: 67, description: "Scheduled appointments" },
    estimates: { name: "Estimates", records: 45, description: "Price estimates" },
    contracts: { name: "Contracts", records: 34, description: "Contract documents" },
    payments: { name: "Payments", records: 298, description: "Payment transactions" },
    accounting: { name: "Accounting", records: 445, description: "Financial records" },
    analytics: { name: "Analytics", records: 1, description: "Business analytics data" }
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === "active").length,
    totalInvoices: 1247,
    totalRevenue: 85430,
    pendingApprovals: 12,
    systemHealth: "healthy"
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleUserAction = (userId: string, action: "suspend" | "activate" | "promote" | "demote") => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case "suspend":
            return { ...user, status: "suspended" as const }
          case "activate":
            return { ...user, status: "active" as const }
          case "promote":
            return { ...user, role: user.role === "user" ? "moderator" as const : "admin" as const }
          case "demote":
            return { ...user, role: user.role === "admin" ? "moderator" as const : "user" as const }
          default:
            return user
        }
      }
      return user
    }))
  }

  const handleFeedbackAction = (feedbackId: string, action: "resolve" | "progress" | "pending") => {
    setFeedbacks(feedbacks.map(feedback => {
      if (feedback.id === feedbackId) {
        const statusMap = {
          resolve: "resolved" as const,
          progress: "in-progress" as const,
          pending: "pending" as const
        }
        return { ...feedback, status: statusMap[action] }
      }
      return feedback
    }))
  }

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const key = header.toLowerCase().replace(/\s+/g, '_')
        const value = row[key] || ''
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export Complete",
      description: `${filename} has been exported successfully`
    })
  }

  const handleExport = (type: 'users' | 'activity' | 'feedback' | 'analytics' | 'languages' | 'all-pages') => {
    switch (type) {
      case 'users':
        exportToCSV(
          users,
          'users_data',
          ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Join Date', 'Country']
        )
        break
      case 'activity':
        exportToCSV(
          activityLogs,
          'activity_logs',
          ['User', 'Action', 'Timestamp', 'Details']
        )
        break
      case 'feedback':
        exportToCSV(
          feedbacks,
          'feedback_data',
          ['User', 'Type', 'Subject', 'Message', 'Status', 'Timestamp']
        )
        break
      case 'analytics':
        exportToCSV(
          countryStats,
          'country_analytics',
          ['Country', 'Users', 'Percentage']
        )
        break
      case 'languages':
        exportToCSV(
          languageStats,
          'language_analytics',
          ['Language', 'Users', 'Percentage', 'Code']
        )
        break
      case 'all-pages':
        const allPagesArray = Object.entries(allPagesData).map(([key, value]) => ({
          page: key,
          name: value.name,
          records: value.records,
          description: value.description
        }))
        exportToCSV(
          allPagesArray,
          'all_pages_export',
          ['Page', 'Name', 'Records', 'Description']
        )
        break
    }
  }

  const exportAllPages = () => {
    const allExports = [
      { type: 'users', data: users, headers: ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Join Date', 'Country'] },
      { type: 'activity', data: activityLogs, headers: ['User', 'Action', 'Timestamp', 'Details'] },
      { type: 'feedback', data: feedbacks, headers: ['User', 'Type', 'Subject', 'Message', 'Status', 'Timestamp'] },
      { type: 'analytics', data: countryStats, headers: ['Country', 'Users', 'Percentage'] },
      { type: 'languages', data: languageStats, headers: ['Language', 'Users', 'Percentage', 'Code'] }
    ]

    allExports.forEach(({ type, data, headers }) => {
      setTimeout(() => {
        exportToCSV(data, `${type}_data`, headers)
      }, 500 * allExports.indexOf(allExports.find(item => item.type === type)!))
    })

    toast({
      title: "Bulk Export Started",
      description: "All pages are being exported. Downloads will start shortly."
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800"
      case "moderator": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "suspended": return "bg-red-100 text-red-800"
      default: return "bg-yellow-100 text-yellow-800"
    }
  }

  const getFeedbackStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      default: return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Complete system administration and control</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={exportAllPages}
            className="flex items-center gap-2"
            variant="default"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export All Pages
          </Button>
          <Select onValueChange={(value) => handleExport(value as any)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Export Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Export Users</SelectItem>
              <SelectItem value="activity">Export Activity Logs</SelectItem>
              <SelectItem value="feedback">Export Feedback</SelectItem>
              <SelectItem value="analytics">Export Analytics</SelectItem>
              <SelectItem value="languages">Export Languages</SelectItem>
              <SelectItem value="all-pages">Export All Pages Summary</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => handleExport('users')}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Quick Export
          </Button>
        </div>
      </div>

      {/* New All Pages Export Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            All Pages Export Control
          </CardTitle>
          <CardDescription>Overview and export control for all system pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(allPagesData).map(([key, value]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{value.name}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{value.records} records</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: `${value.name} Export`,
                        description: `Exporting ${value.records} records from ${value.name}`
                      })
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === "active" && u.currentPage !== "/offline").length}</div>
            <p className="text-xs text-muted-foreground">
              Users currently online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Language</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{languageStats[0].language}</div>
            <p className="text-xs text-muted-foreground">
              {languageStats[0].percentage}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countryStats[0].country}</div>
            <p className="text-xs text-muted-foreground">
              {countryStats[0].percentage}% of users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Control</TabsTrigger>
          <TabsTrigger value="analytics">Country Analytics</TabsTrigger>
          <TabsTrigger value="languages">Language Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => handleExport('users')}
              variant="outline"
              className="ml-4 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Users
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="outline" className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Joined: {user.joinDate}</span>
                        <span>Last login: {user.lastLogin}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {user.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "suspend")}
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "activate")}
                        >
                          Activate
                        </Button>
                      )}
                      {user.role !== "admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "promote")}
                        >
                          Promote
                        </Button>
                      )}
                      {user.role !== "user" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, "demote")}
                        >
                          Demote
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Live User Sessions</CardTitle>
                <CardDescription>Real-time user activity and page access</CardDescription>
              </div>
              <Button 
                onClick={() => handleExport('users')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Sessions
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.filter(u => u.status === "active").map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{user.name}</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {user.currentPage !== "/offline" ? "Online" : "Offline"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">from {user.country}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Current page: {user.currentPage}</p>
                      <p className="text-xs text-muted-foreground">Session duration: {user.sessionDuration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{user.sessionDuration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Control Tab */}
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Feedback Management</CardTitle>
                <CardDescription>Control and respond to user feedback</CardDescription>
              </div>
              <Button 
                onClick={() => handleExport('feedback')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Feedback
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{feedback.subject}</h4>
                        <Badge variant="outline" className={getFeedbackStatusColor(feedback.status)}>
                          {feedback.status}
                        </Badge>
                        <Badge variant="outline">
                          {feedback.type}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{feedback.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">From: {feedback.user}</p>
                    <p className="text-sm">{feedback.message}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeedbackAction(feedback.id, "progress")}
                      >
                        Mark In Progress
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeedbackAction(feedback.id, "resolve")}
                      >
                        Mark Resolved
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeedbackAction(feedback.id, "pending")}
                      >
                        Mark Pending
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Country Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Country Access Analytics</CardTitle>
                <CardDescription>Geographic distribution of users</CardDescription>
              </div>
              <Button 
                onClick={() => handleExport('analytics')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Analytics
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryStats.map((stat, index) => (
                  <div key={stat.country} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{stat.country}</h4>
                        <p className="text-sm text-muted-foreground">{stat.users} users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Analytics Tab */}
        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Language Access Analytics</CardTitle>
                <CardDescription>Distribution of languages used by users</CardDescription>
              </div>
              <Button 
                onClick={() => handleExport('languages')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Languages
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languageStats.map((stat, index) => (
                  <div key={stat.language} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="font-medium">{stat.language}</h4>
                          <p className="text-sm text-muted-foreground">{stat.users} users • {stat.code}</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {stat.code}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{stat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Activity Logs</h3>
            <Button 
              onClick={() => handleExport('activity')}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Logs
            </Button>
          </div>
          <div className="grid gap-4">
            {activityLogs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.user}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm">{log.action}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Name</label>
                  <Input defaultValue="FeatherBiz" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Currency</label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="BRL">BRL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Login Attempts</label>
                  <Input type="number" defaultValue="5" />
                </div>
                <Button>Update Security</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Database size: 2.4 GB</p>
                  <p className="text-sm text-muted-foreground">Last backup: 2024-01-20</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Backup Now</Button>
                  <Button variant="outline">Optimize DB</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Alerts</label>
                  <Select defaultValue="critical">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Notifications</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
