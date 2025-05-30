
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Users, DollarSign, TrendingUp, FileText, Heart, MessageSquare, Calendar, Receipt, Settings, Lightbulb, UserCog, Calculator } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { QuickActions } from "@/components/QuickActions"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { AIVoice } from "@/components/AIVoice"
import { CreateInvoice } from "@/components/CreateInvoice"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { SettingsPage } from "@/components/SettingsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { BlogAdmin } from "@/components/BlogAdmin"
import { AdminDashboard } from "@/components/AdminDashboard"
import { PricingPlans } from "@/components/PricingPlans"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { FileManager } from "@/components/FileManager"
import { CustomerManagement } from "@/components/CustomerManagement"

const Index = () => {
  const { t } = useLanguage()
  const [activeView, setActiveView] = useState("dashboard")

  const handleQuickAction = (actionId: string) => {
    // Map quick actions to the new unified views
    if (actionId === "customers" || actionId === "invoices" || actionId === "estimates" || actionId === "receipts") {
      setActiveView("dashboard")
    } else if (actionId === "files") {
      setActiveView("file-manager")
    } else if (actionId === "ai-voice") {
      setActiveView("ai-voice")
    } else if (actionId === "analytics") {
      setActiveView("analytics")
    } else if (actionId === "features") {
      setActiveView("features")
    } else {
      setActiveView(actionId)
    }
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <BusinessDashboard />
            <QuickActions onActionClick={handleQuickAction} />
          </div>
        )
      case 'analytics':
        return <AnalyticsDashboard />
      case 'customer-management':
      case 'customers':
        return <CustomerManagement />
      case 'invoice-creator':
      case 'create-invoice':
        return <InvoiceCreator />
      case 'file-manager':
        return <FileManager />
      case 'ai-voice':
        return <AIVoice />
      case 'features':
        return <FeaturesPage />
      case 'settings':
        return <SettingsPage />
      case 'admin-dashboard':
        return <AdminDashboard />
      case 'blog-admin':
        return <BlogAdmin />
      case 'pricing':
        return <PricingPlans />
      default:
        return (
          <div className="space-y-6">
            <BusinessDashboard />
            <QuickActions onActionClick={handleQuickAction} />
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
