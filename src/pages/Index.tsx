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
import { Analytics } from "@/components/Analytics"
import { SettingsPage } from "@/components/SettingsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { BlogAdmin } from "@/components/BlogAdmin"
import { AdminDashboard } from "@/components/AdminDashboard"
import { PricingPlans } from "@/components/PricingPlans"

const Index = () => {
  const { t } = useLanguage()
  const [activeView, setActiveView] = useState("dashboard")
  const [hasPremium] = useState(false) // This would come from your auth/subscription system

  const premiumFeatures = [
    "ai-voice", "features", "files", "pdf-generator", "receipts", "appointments", 
    "work-orders", "messages", "customers", "payments", "e-signatures", "email", 
    "family-savings", "ai-assistant", "projects", "analytics", "settings", "blog-admin", "admin"
  ]

  const handleQuickAction = (actionId: string) => {
    // Check if feature requires premium and user doesn't have it
    if (premiumFeatures.includes(actionId) && !hasPremium) {
      setActiveView("pricing")
      return
    }

    setActiveView(actionId)
  }

  const handleSidebarNavigation = (view: string) => {
    // Check if feature requires premium and user doesn't have it
    if (premiumFeatures.includes(view) && !hasPremium) {
      setActiveView("pricing")
      return
    }

    setActiveView(view)
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "create-invoice":
        return <CreateInvoice />
      case "invoices":
        return <InvoiceCreator />
      case "ai-voice":
        return <AIVoice />
      case "customers":
        return <Customers />
      case "analytics":
        return <Analytics />
      case "settings":
        return <SettingsPage />
      case "features":
        return <FeaturesPage />
      case "blog-admin":
        return <BlogAdmin />
      case "admin":
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
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold">{t("dashboard.welcome")}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("dashboard.subtitle")}
              </p>
              {!hasPremium && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">
                    Using Free Plan - Upgrade for full access
                  </span>
                  <Button 
                    size="sm" 
                    onClick={() => setActiveView("pricing")}
                    className="ml-2"
                  >
                    Upgrade Now
                  </Button>
                </div>
              )}
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 sm:p-6">
        {renderActiveView()}
      </div>
    </div>
  )
}

export default Index
