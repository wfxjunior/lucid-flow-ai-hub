
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Users, DollarSign, TrendingUp, FileText, Heart, MessageSquare, Calendar, Receipt, Settings, Lightbulb, UserCog } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { QuickActions } from "@/components/QuickActions"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { AIVoice } from "@/components/AIVoice"
import { CreateInvoice } from "@/components/CreateInvoice"
import { Customers } from "@/components/Customers"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { SettingsPage } from "@/components/SettingsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { BlogAdmin } from "@/components/BlogAdmin"
import { AdminDashboard } from "@/components/AdminDashboard"
import { PricingPlans } from "@/components/PricingPlans"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

const Index = () => {
  const { t } = useLanguage()
  const [activeView, setActiveView] = useState("dashboard")

  const handleQuickAction = (actionId: string) => {
    setActiveView(actionId)
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "create-invoice":
        return <CreateInvoice />
      case "ai-voice":
        return <AIVoice />
      case "customers":
        return <Customers />
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return <SettingsPage />
      case "features":
        return <FeaturesPage />
      case "blog-admin":
        return <BlogAdmin />
      case "admin-dashboard":
        return <AdminDashboard />
      case "pricing":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-8 w-8 text-yellow-500" />
                <h1 className="text-3xl font-bold">Premium Features</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock the full power of FeatherBiz with our premium plans. Access advanced AI features, unlimited invoices, and premium support.
              </p>
            </div>
            <PricingPlans />
          </div>
        )
      case "appointments":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Calendar className="h-16 w-16 mx-auto text-blue-500" />
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Schedule and manage client appointments with automated reminders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "payments":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <DollarSign className="h-16 w-16 mx-auto text-green-500" />
              <h1 className="text-3xl font-bold">Payments</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Process payments and manage payment methods securely.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Received</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$48,250</div>
                  <p className="text-sm text-green-600">+12% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,420</div>
                  <p className="text-sm text-yellow-600">15 invoices</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Overdue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,100</div>
                  <p className="text-sm text-red-600">3 invoices</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-sm text-green-600">Last 30 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "e-signatures":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <FileText className="h-16 w-16 mx-auto text-purple-500" />
              <h1 className="text-3xl font-bold">E-Signatures</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Send documents for electronic signatures and track completion status.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Signed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-sm text-green-600">90% completion</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-sm text-yellow-600">Awaiting signature</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "projects":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Settings className="h-16 w-16 mx-auto text-blue-500" />
              <h1 className="text-3xl font-bold">Projects</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manage your business projects, tasks, and track progress.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">In progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-sm text-green-600">This year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$125k</div>
                  <p className="text-sm text-green-600">+15% growth</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>On Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-sm text-green-600">Delivery rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "files":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <FileText className="h-16 w-16 mx-auto text-indigo-500" />
              <h1 className="text-3xl font-bold">Files & Documents</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Organize and manage your business documents in secure folders.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-sm text-muted-foreground">Documents stored</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Storage Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4GB</div>
                  <p className="text-sm text-muted-foreground">of 10GB</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shared Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">324</div>
                  <p className="text-sm text-blue-600">With clients</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Folders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-sm text-muted-foreground">Organized</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "receipts":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Receipt className="h-16 w-16 mx-auto text-amber-500" />
              <h1 className="text-3xl font-bold">Receipts & Accounting</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track and manage all business receipts, expenses, and accounting records.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$18,420</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Receipts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-sm text-green-600">Recorded</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tax Deductible</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,800</div>
                  <p className="text-sm text-green-600">Potential savings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">Expense types</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "messages":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-16 w-16 mx-auto text-green-500" />
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Send and manage client messages, conversations, and communications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Unread</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-blue-600">New messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-sm text-muted-foreground">Active threads</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-sm text-green-600">Average</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-sm text-green-600">Client rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "email-center":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-16 w-16 mx-auto text-red-500" />
              <h1 className="text-3xl font-bold">Email Center</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create and send email campaigns, newsletters, and automated messages to your clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emails Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,840</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-sm text-green-600">Above average</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Click Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-sm text-green-600">Engagement</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-sm text-blue-600">Growing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "family-savings":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Heart className="h-16 w-16 mx-auto text-red-500" />
              <h1 className="text-3xl font-bold">My Family Savings</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your family's financial goals and savings progress from your business income.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28,450</div>
                  <p className="text-sm text-green-600">+5.2% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,500</div>
                  <p className="text-sm text-blue-600">87% achieved</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Fund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$15,000</div>
                  <p className="text-sm text-green-600">6 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$13,450</div>
                  <p className="text-sm text-green-600">Growing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold">{t("dashboard.welcome")}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("dashboard.subtitle")}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.totalRevenue")}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.activeClients")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.pendingInvoices")}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +19% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.successRate")}</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <QuickActions onActionClick={handleQuickAction} />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{t("dashboard.recentActivity")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{t("dashboard.recentActivityDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: FileText, action: "New invoice created", time: "2 minutes ago", client: "Acme Corp" },
                    { icon: Heart, action: "Payment received", time: "1 hour ago", client: "Tech Solutions" },
                    { icon: MessageSquare, action: "Message sent", time: "3 hours ago", client: "Design Studio" },
                    { icon: Calendar, action: "Appointment scheduled", time: "1 day ago", client: "Marketing Agency" },
                    { icon: Receipt, action: "Expense recorded", time: "2 days ago", client: "Office Supplies" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border bg-white/50">
                      <div className="p-2 rounded-full bg-blue-100">
                        <activity.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.client}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto p-4 sm:p-6">
              {renderActiveView()}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default Index
