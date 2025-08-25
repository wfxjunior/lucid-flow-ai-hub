
import { Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { FinancialTools } from "@/components/FinancialTools"
import { ProjectSchedule } from "@/components/ProjectSchedule"
import { Productivity } from "@/components/Productivity"
import { Documentation } from "@/components/Documentation"
import { MatTrackPage } from "@/components/MatTrackPage"
import { FeatherBizAI } from "@/components/FeatherBizAI"

// Stripe-style pages
import { StripeAnalyticsPage } from "@/components/stripe-pages/StripeAnalyticsPage"
import { StripeMessagesPage } from "@/components/stripe-pages/StripeMessagesPage"
import { StripeEmailCenterPage } from "@/components/stripe-pages/StripeEmailCenterPage"
import { StripeInvoicesPage } from "@/components/stripe-pages/StripeInvoicesPage"
import { StripeCustomersPage } from "@/components/stripe-pages/StripeCustomersPage"
import { StripeESignaturesPage } from "@/components/stripe-pages/StripeESignaturesPage"
import { StripeEstimatesPage } from "@/components/stripe-pages/StripeEstimatesPage"
import { StripeContractsPage } from "@/components/stripe-pages/StripeContractsPage"
import { StripeAppointmentsPage } from "@/components/stripe-pages/StripeAppointmentsPage"
import { StripeESignatureTemplatesPage } from "@/components/stripe-pages/StripeESignatureTemplatesPage"
import { StripeCareersPage } from "@/components/stripe-pages/StripeCareersPage"
import { StripeExpensesPage } from "@/components/stripe-pages/StripeExpensesPage"
import { StripeProjectsPage } from "@/components/stripe-pages/StripeProjectsPage"
import { StripeProjectTimelinePage } from "@/components/stripe-pages/StripeProjectTimelinePage"
import { StripeSmartSchedulePage } from "@/components/stripe-pages/StripeSmartSchedulePage"
import { StripeFeatherBudgetPage } from "@/components/stripe-pages/StripeFeatherBudgetPage"
import { StripeFeatherTaxPage } from "@/components/stripe-pages/StripeFeatherTaxPage"
import { StripeEasyCalcPage } from "@/components/stripe-pages/StripeEasyCalcPage"
import { StripeReceiptsPage } from "@/components/stripe-pages/StripeReceiptsPage"
import { StripeDashboardPage } from "@/components/stripe-pages/StripeDashboardPage"

export function Layout() {
  return (
    <div data-theme="stripe-dashboard" className="min-h-screen w-full">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar activeView="dashboard" />
          <main className="flex-1 overflow-auto">
            <Routes>
              {/* General */}
              <Route path="/" element={<StripeDashboardPage />} />
              <Route path="/dashboard" element={<StripeDashboardPage />} />
              <Route path="/careers" element={<StripeCareersPage />} />
              
              {/* Core Business */}
              <Route path="/customers" element={<StripeCustomersPage />} />
              <Route path="/projects" element={<StripeProjectsPage />} />
              <Route path="/project-timeline" element={<StripeProjectTimelinePage />} />
              <Route path="/invoices" element={<StripeInvoicesPage />} />
              <Route path="/estimates" element={<StripeEstimatesPage />} />
              <Route path="/smart-schedule" element={<StripeSmartSchedulePage />} />
              
              {/* Financial Tools */}
              <Route path="/financial-tools" element={<FinancialTools />} />
              <Route path="/feather-budget" element={<StripeFeatherBudgetPage />} />
              <Route path="/feather-tax" element={<StripeFeatherTaxPage />} />
              <Route path="/easy-calc" element={<StripeEasyCalcPage />} />
              <Route path="/receipts" element={<StripeReceiptsPage />} />
              <Route path="/accounting" element={<FinancialTools />} />
              <Route path="/quotes" element={<StripeEstimatesPage />} />
              
              {/* Operations */}
              <Route path="/car-rental" element={<StripeDashboardPage />} />
              <Route path="/work-orders" element={<StripeDashboardPage />} />
              <Route path="/mattrack" element={<MatTrackPage />} />
              <Route path="/crew-control" element={<StripeDashboardPage />} />
              <Route path="/earn-sync" element={<StripeDashboardPage />} />
              <Route path="/after-care" element={<StripeDashboardPage />} />
              
              {/* Documents & Forms */}
              <Route path="/feather-forms" element={<StripeESignatureTemplatesPage />} />
              <Route path="/sales-orders" element={<StripeInvoicesPage />} />
              <Route path="/business-proposals" element={<StripeEstimatesPage />} />
              <Route path="/bids" element={<StripeEstimatesPage />} />
              <Route path="/contracts" element={<StripeContractsPage />} />
              
              {/* Productivity */}
              <Route path="/productivity" element={<Productivity />} />
              <Route path="/meetings" element={<StripeAppointmentsPage />} />
              <Route path="/todo-list" element={<Productivity />} />
              <Route path="/notes" element={<Productivity />} />
              <Route path="/appointments" element={<StripeAppointmentsPage />} />
              
              {/* Communication */}
              <Route path="/messages" element={<StripeMessagesPage />} />
              <Route path="/email-center" element={<StripeEmailCenterPage />} />
              
              {/* Analytics */}
              <Route path="/analytics" element={<StripeAnalyticsPage />} />
              
              {/* System Tools */}
              <Route path="/settings" element={<StripeDashboardPage />} />
              <Route path="/admin-panel" element={<StripeDashboardPage />} />
              
              {/* Legacy routes */}
              <Route path="/project-schedule" element={<ProjectSchedule />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/featherbiz-ai" element={<FeatherBizAI />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
