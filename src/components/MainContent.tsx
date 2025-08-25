
import { ImprovedDashboard } from "./ImprovedDashboard"
import { FeatherBudgetPage } from "./FeatherBudgetPage"
import { FeatherTaxPage } from "./FeatherTaxPage"
import { MatTrackPage } from "./MatTrackPage"
import { StripeCustomersPage } from "./stripe-pages/StripeCustomersPage"
import { StripeAnalyticsPage } from "./stripe-pages/StripeAnalyticsPage"
import { StripeProjectsPage } from "./stripe-pages/StripeProjectsPage"
import { StripeInvoicesPage } from "./stripe-pages/StripeInvoicesPage"
import { StripeEstimatesPage } from "./stripe-pages/StripeEstimatesPage"
import { StripeSettingsPage } from "./stripe-pages/StripeSettingsPage"
import { StripeCareersPage } from "./stripe-pages/StripeCareersPage"
import { StripeAppointmentsPage } from "./stripe-pages/StripeAppointmentsPage"
import { StripeTasksPage } from "./stripe-pages/StripeTasksPage"
import { StripeMessagesPage } from "./stripe-pages/StripeMessagesPage"
import { StripeEmailCenterPage } from "./stripe-pages/StripeEmailCenterPage"
import { StripeProductsPage } from "./stripe-pages/StripeProductsPage"
import { StripePaymentsPage } from "./stripe-pages/StripePaymentsPage"
import { StripeExpensesPage } from "./stripe-pages/StripeExpensesPage"
import { StripeContractsPage } from "./stripe-pages/StripeContractsPage"
import { StripeESignaturesPage } from "./stripe-pages/StripeESignaturesPage"
import { StripeESignatureTemplatesPage } from "./stripe-pages/StripeESignatureTemplatesPage"

interface MainContentProps {
  activeView: string
  onNavigate: (view: string) => void
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  // Apply Stripe theme to the entire main content area
  return (
    <div data-theme="stripe-dashboard" className="flex-1 min-h-screen bg-background">
      {activeView === "dashboard" && <ImprovedDashboard onNavigate={onNavigate} />}
      {activeView === "customers" && <StripeCustomersPage />}
      {activeView === "analytics" && <StripeAnalyticsPage />}
      {activeView === "projects" && <StripeProjectsPage />}
      {activeView === "invoices" && <StripeInvoicesPage />}
      {activeView === "estimates" && <StripeEstimatesPage />}
      {activeView === "settings" && <StripeSettingsPage />}
      {activeView === "careers" && <StripeCareersPage />}
      {activeView === "appointments" && <StripeAppointmentsPage />}
      {activeView === "tasks" && <StripeTasksPage />}
      {activeView === "messages" && <StripeMessagesPage />}
      {activeView === "email-center" && <StripeEmailCenterPage />}
      {activeView === "products" && <StripeProductsPage />}
      {activeView === "payments" && <StripePaymentsPage />}
      {activeView === "expenses" && <StripeExpensesPage />}
      {activeView === "contracts" && <StripeContractsPage />}
      {activeView === "esignatures" && <StripeESignaturesPage />}
      {activeView === "esignature-templates" && <StripeESignatureTemplatesPage />}
      {activeView === "feather-budget" && <FeatherBudgetPage />}
      {activeView === "feather-tax" && <FeatherTaxPage />}
      {activeView === "mat-track" && <MatTrackPage />}
      
      {/* Default fallback for other views that haven't been converted yet */}
      {![
        "dashboard", "customers", "analytics", "projects", 
        "invoices", "estimates", "settings", "careers", "appointments",
        "tasks", "messages", "email-center", "products", "payments",
        "expenses", "contracts", "esignatures", "esignature-templates",
        "feather-budget", "feather-tax", "mat-track"
      ].includes(activeView) && (
        <div className="stripe-content">
          <div className="stripe-page-header">
            <h1 className="capitalize">{activeView.replace('-', ' ')}</h1>
            <p className="stripe-page-description">
              This page is under development. All navigation and functionality are preserved.
            </p>
          </div>
          
          <div className="stripe-card">
            <div className="stripe-card-header">
              <h3 className="stripe-card-title">Coming Soon</h3>
              <p className="stripe-card-description">
                This section will be available in a future update. Your navigation and all existing features remain fully functional.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
