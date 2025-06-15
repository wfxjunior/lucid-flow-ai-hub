
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
      case "customer-management":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Customers</h1>
          <p>Customer management coming soon...</p>
        </div>
      case "projects":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>
          <p>Project management coming soon...</p>
        </div>
      case "project-timeline":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Project Timeline</h1>
          <p>Project timeline coming soon...</p>
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
      case "todo-list":
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
      case "pipeline":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Sales Pipeline</h1>
          <p>Sales pipeline coming soon...</p>
        </div>
      case "smart-schedule":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Smart Schedule</h1>
          <p>Smart scheduling coming soon...</p>
        </div>
      case "feather-budget":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">FeatherBudget AI</h1>
          <p>Budget management coming soon...</p>
        </div>
      case "feather-tax":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">FeatherTax</h1>
          <p>Tax management coming soon...</p>
        </div>
      case "easy-calc":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">EasyCalc</h1>
          <p>Calculator coming soon...</p>
        </div>
      case "accounting":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Accounting</h1>
          <p>Accounting management coming soon...</p>
        </div>
      case "quotes":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Quotes</h1>
          <p>Quote management coming soon...</p>
        </div>
      case "estimates":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Estimates</h1>
          <p>Estimate management coming soon...</p>
        </div>
      case "car-rental":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Car Rental</h1>
          <p>Car rental management coming soon...</p>
        </div>
      case "work-orders":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Work Orders</h1>
          <p>Work order management coming soon...</p>
        </div>
      case "mat-track":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">MatTrack</h1>
          <p>Material tracking coming soon...</p>
        </div>
      case "crew-control":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">CrewControl</h1>
          <p>Crew management coming soon...</p>
        </div>
      case "earnsync":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">EarnSync</h1>
          <p>Earnings tracking coming soon...</p>
        </div>
      case "aftercare":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">AfterCare</h1>
          <p>AfterCare management coming soon...</p>
        </div>
      case "feather-forms":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">FeatherForms</h1>
          <p>Form builder coming soon...</p>
        </div>
      case "sales-orders":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Sales Orders</h1>
          <p>Sales order management coming soon...</p>
        </div>
      case "business-proposals":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Business Proposals</h1>
          <p>Business proposal management coming soon...</p>
        </div>
      case "bids":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bids</h1>
          <p>Bid management coming soon...</p>
        </div>
      case "meetings":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Meetings</h1>
          <p>Meeting management coming soon...</p>
        </div>
      case "notes":
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Notes</h1>
          <p>Notes management coming soon...</p>
        </div>
      default:
        return <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
          <p>A página "{activeView}" não foi encontrada.</p>
        </div>
    }
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-6">
      {renderContent()}
    </div>
  )
}
