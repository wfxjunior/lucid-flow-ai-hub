
import { MessagesPage } from "@/components/MessagesPage"
import { EmailSettingsPage } from "@/components/EmailSettingsPage"
import { CareersPage } from "@/components/CareersPage"
import { ImprovedDashboard } from "@/components/ImprovedDashboard"

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={onNavigate} />
      case "customers":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Customers</h1>
          <p>Customer management coming soon...</p>
        </div>
      case "projects":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>
          <p>Project management coming soon...</p>
        </div>
      case "appointments":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Appointments</h1>
          <p>Appointment scheduling coming soon...</p>
        </div>
      case "invoices":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Invoices</h1>
          <p>Invoice management coming soon...</p>
        </div>
      case "tasks":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Tasks</h1>
          <p>Task management coming soon...</p>
        </div>
      case "products":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <p>Product catalog coming soon...</p>
        </div>
      case "payments":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Payments</h1>
          <p>Payment tracking coming soon...</p>
        </div>
      case "expenses":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Expenses</h1>
          <p>Expense management coming soon...</p>
        </div>
      case "contracts":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Contracts</h1>
          <p>Contract management coming soon...</p>
        </div>
      case "esignatures":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">E-Signatures</h1>
          <p>Document signing coming soon...</p>
        </div>
      case "esignature-templates":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">E-Signature Templates</h1>
          <p>Document templates coming soon...</p>
        </div>
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
