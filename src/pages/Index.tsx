import { useState } from "react"

import { QuickActions } from "@/components/QuickActions"
import { RecentActivity } from "@/components/RecentActivity"
import { ProjectsOverview } from "@/components/ProjectsOverview"
import { DocumentTracker } from "@/components/DocumentTracker"
import { AIVoice } from "@/components/AIVoice"
import { CreateInvoice } from "@/components/CreateInvoice"
import { Customers } from "@/components/Customers"
import { Analytics } from "@/components/Analytics"
import { SettingsPage } from "@/components/SettingsPage"
import { FeaturesPage } from "@/components/FeaturesPage"
import { BlogAdmin } from "@/components/BlogAdmin"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Index() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">
                Track your business and see what's happening today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-card text-card-foreground shadow-sm rounded-md p-4">
                <div className="font-medium">Total Revenue</div>
                <div className="text-2xl font-bold">$24,512.00</div>
                <div className="text-sm text-muted-foreground">+19% from last month</div>
              </div>
              <div className="bg-card text-card-foreground shadow-sm rounded-md p-4">
                <div className="font-medium">New Clients</div>
                <div className="text-2xl font-bold">160</div>
                <div className="text-sm text-muted-foreground">+21% from last month</div>
              </div>
              <div className="bg-card text-card-foreground shadow-sm rounded-md p-4">
                <div className="font-medium">Open Projects</div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">-5% from last month</div>
              </div>
              <div className="bg-card text-card-foreground shadow-sm rounded-md p-4">
                <div className="font-medium">Avg. Task Completion</div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">+12% from last month</div>
              </div>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <QuickActions onActionClick={setActiveView} />
              <RecentActivity />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProjectsOverview />
              </div>
              <div>
                <DocumentTracker />
              </div>
            </div>
          </div>
        )
      case "features":
        return <FeaturesPage />
      case "blog-admin":
        return <BlogAdmin />
      case "admin-dashboard":
        return <AdminDashboard />
      case "ai-voice":
        return <AIVoice />
      case "create-invoice":
        return <CreateInvoice />
      case "customers":
        return <Customers />
      case "analytics":
        return <Analytics />
      case "settings":
        return <SettingsPage />
      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Feature Coming Soon</h2>
              <p className="text-muted-foreground">
                This feature is currently under development.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  )
}
