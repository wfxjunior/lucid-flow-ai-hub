
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { FeatherBizAI } from './FeatherBizAI'
import { ProjectSchedule } from './ProjectSchedule'
import { SmartSchedule } from './SmartSchedule'
import { FinancialTools } from './FinancialTools'
import { Operations } from './Operations'
import { DocumentsForms } from './DocumentsForms'
import { Productivity } from './Productivity'
import { Documentation } from './Documentation'
import { MatTrackPage } from './MatTrackPage'
import { CarRentalPage } from './CarRentalPage'
import { StripeAnalyticsPage } from './stripe-pages/StripeAnalyticsPage'
import { StripeSettingsPage } from './stripe-pages/StripeSettingsPage'
import { StripeCareersPage } from './stripe-pages/StripeCareersPage'
import { StripeAppointmentsPage } from './stripe-pages/StripeAppointmentsPage'
import { StripeTasksPage } from './stripe-pages/StripeTasksPage'
import { StripeMessagesPage } from './stripe-pages/StripeMessagesPage'
import { StripeEmailCenterPage } from './stripe-pages/StripeEmailCenterPage'
import { StripeProductsPage } from './stripe-pages/StripeProductsPage'
import { StripePaymentsPage } from './stripe-pages/StripePaymentsPage'
import { StripeExpensesPage } from './stripe-pages/StripeExpensesPage'
import { StripeContractsPage } from './stripe-pages/StripeContractsPage'
import { StripeESignaturesPage } from './stripe-pages/StripeESignaturesPage'
import { StripeESignatureTemplatesPage } from './stripe-pages/StripeESignatureTemplatesPage'
import { StripeCustomersPage } from './stripe-pages/StripeCustomersPage'
import { StripeInvoicesPage } from './stripe-pages/StripeInvoicesPage'
import { StripeEstimatesPage } from './stripe-pages/StripeEstimatesPage'
import { StripeProjectsPage } from './stripe-pages/StripeProjectsPage'

export function MainContent() {
  return (
    <main className="flex-1 overflow-auto bg-background">
      <Routes>
        <Route path="/" element={<FeatherBizAI />} />
        <Route path="/project-schedule" element={<ProjectSchedule />} />
        <Route path="/smart-schedule" element={<SmartSchedule />} />
        <Route path="/financial-tools" element={<FinancialTools />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/documents-forms" element={<DocumentsForms />} />
        <Route path="/productivity" element={<Productivity />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/mattrack" element={<MatTrackPage />} />
        <Route path="/car-rental" element={<CarRentalPage />} />
        <Route path="/analytics" element={<StripeAnalyticsPage />} />
        <Route path="/settings" element={<StripeSettingsPage />} />
        <Route path="/careers" element={<StripeCareersPage />} />
        <Route path="/appointments" element={<StripeAppointmentsPage />} />
        <Route path="/tasks" element={<StripeTasksPage />} />
        <Route path="/messages" element={<StripeMessagesPage />} />
        <Route path="/email-center" element={<StripeEmailCenterPage />} />
        <Route path="/products" element={<StripeProductsPage />} />
        <Route path="/payments" element={<StripePaymentsPage />} />
        <Route path="/expenses" element={<StripeExpensesPage />} />
        <Route path="/contracts" element={<StripeContractsPage />} />
        <Route path="/e-signatures" element={<StripeESignaturesPage />} />
        <Route path="/e-signature-templates" element={<StripeESignatureTemplatesPage />} />
        <Route path="/customers" element={<StripeCustomersPage />} />
        <Route path="/invoices" element={<StripeInvoicesPage />} />
        <Route path="/estimates" element={<StripeEstimatesPage />} />
        <Route path="/projects" element={<StripeProjectsPage />} />
      </Routes>
    </main>
  )
}
