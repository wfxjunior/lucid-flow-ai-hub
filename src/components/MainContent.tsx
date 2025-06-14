import { MessagesPage } from "@/components/MessagesPage"
import { EmailSettingsPage } from "@/components/EmailSettingsPage"
import { CareersPage } from "@/components/CareersPage"
import { Dashboard } from "@/components/Dashboard"
import { CustomersPage } from "@/components/CustomersPage"
import { ProjectsPage } from "@/components/ProjectsPage"
import { AppointmentsPage } from "@/components/AppointmentsPage"
import { InvoicesPage } from "@/components/InvoicesPage"
import { TasksPage } from "@/components/TasksPage"
import { ProductsPage } from "@/components/ProductsPage"
import { PaymentsPage } from "@/components/PaymentsPage"
import { ExpensesPage } from "@/components/ExpensesPage"
import { ContractsPage } from "@/components/ContractsPage"
import { EsignaturesPage } from "@/components/EsignaturesPage"
import { EsignatureTemplatesPage } from "@/components/EsignatureTemplatesPage"

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "customers":
        return <CustomersPage />
      case "projects":
        return <ProjectsPage />
      case "appointments":
        return <AppointmentsPage />
      case "invoices":
        return <InvoicesPage />
      case "tasks":
        return <TasksPage />
      case "products":
        return <ProductsPage />
      case "payments":
        return <PaymentsPage />
      case "expenses":
        return <ExpensesPage />
      case "contracts":
        return <ContractsPage />
      case "esignatures":
        return <EsignaturesPage />
      case "esignature-templates":
        return <EsignatureTemplatesPage />
      case "messages":
        return <MessagesPage />
      case "email-settings":
        return <EmailSettingsPage />
      case "careers":
        return <CareersPage />
      default:
        return <div>Página não encontrada</div>
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-6">
      {renderContent()}
    </div>
  )
}
