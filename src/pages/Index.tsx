
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Toaster } from "@/components/ui/toaster"
import { BusinessDashboard } from "@/components/BusinessDashboard"
import { InvoiceCreator } from "@/components/InvoiceCreator"
import { CustomerManagement } from "@/components/CustomerManagement"
import { EstimatesPage } from "@/components/EstimatesPage"
import { AppointmentsPage } from "@/components/AppointmentsPage"
import { ContractsPage } from "@/components/ContractsPage"
import { ESignaturesPage } from "@/components/ESignaturesPage"
import { Analytics } from "@/components/Analytics"
import { SettingsPage } from "@/components/SettingsPage"
import { WorkOrdersPage } from "@/components/WorkOrdersPage"
import { TodoListPage } from "@/components/TodoListPage"
import { ProjectsPage } from "@/components/ProjectsPage"
import { AIVoiceAssistant } from "@/components/AIVoiceAssistant"
import { FeaturesPage } from "@/components/FeaturesPage"
import { MeetingsPage } from "@/components/MeetingsPage"
import { AccountingPage } from "@/components/AccountingPage"
import { MatTrackPage } from "@/components/MatTrackPage"

export default function Index() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <BusinessDashboard onNavigate={setActiveView} />
      case "invoice-creator":
        return <InvoiceCreator />
      case "customer-management":
        return <CustomerManagement />
      case "estimates":
        return <EstimatesPage />
      case "appointments":
        return <AppointmentsPage />
      case "contracts":
        return <ContractsPage />
      case "e-signatures":
        return <ESignaturesPage />
      case "analytics":
        return <Analytics />
      case "settings":
        return <SettingsPage />
      case "work-orders":
        return <WorkOrdersPage />
      case "todo-list":
        return <TodoListPage />
      case "projects":
        return <ProjectsPage />
      case "ai-voice":
        return <AIVoiceAssistant />
      case "features":
        return <FeaturesPage />
      case "meetings":
        return <MeetingsPage />
      case "accounting":
        return <AccountingPage />
      case "mat-track":
        return <MatTrackPage />
      default:
        return <BusinessDashboard onNavigate={setActiveView} />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveView()}
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}
