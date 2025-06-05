import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
import { CrewControlPage } from "@/components/CrewControlPage"
import { EarnSyncPage } from "@/components/EarnSyncPage"
import { UserGreeting } from "@/components/UserGreeting"
import { NotesPage } from "@/components/NotesPage"

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
      case "notes":
        return <NotesPage />
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
      case "crew-control":
        return <CrewControlPage />
      case "earnsync":
        return <EarnSyncPage />
      default:
        return <BusinessDashboard onNavigate={setActiveView} />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-auto">
          <div className="p-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between">
            <SidebarTrigger className="h-8 w-8" />
            <UserGreeting />
          </div>
          <div className="p-6">
            {renderActiveView()}
          </div>
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}
