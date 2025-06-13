import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from './components/Account'
import Home from './components/Home'
import ClientsPage from './components/ClientsPage'
import InvoicesPage from './components/InvoicesPage'
import EstimatesPage from './components/EstimatesPage'
import ContractsPage from './components/ContractsPage'
import WorkOrdersPage from './components/WorkOrdersPage'
import FeatherFormsPage from './components/FeatherFormsPage'
import ProjectTimelinePage from './components/ProjectTimelinePage'
import PaymentsPage from './components/PaymentsPage'
import AccountingPage from './components/AccountingPage'
import { AIVoiceAssistant } from './components/AIVoiceAssistant'
import { DocumentSignaturesPage } from './components/DocumentSignaturesPage'
import { ResponsiveCarRentalPage } from '@/components/ResponsiveCarRentalPage'
import { ResponsiveMatTrackPage } from '@/components/ResponsiveMatTrackPage'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  if (!session) {
    return <Navigate to="/" />
  }
  return children
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="container" style={{ padding: '50px 0 100px 0' }}>
    {children}
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Auth
                supabaseClient={useSupabaseClient()}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'github']}
              />
            </Home>
          }
        />
        <Route
          path="/account"
          element={
            <AuthGuard>
              <Layout>
                <Account
                  supabaseClient={useSupabaseClient()}
                  session={useSession()}
                />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/clients"
          element={
            <AuthGuard>
              <Layout>
                <ClientsPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/invoices"
          element={
            <AuthGuard>
              <Layout>
                <InvoicesPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/estimates"
          element={
            <AuthGuard>
              <Layout>
                <EstimatesPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/contracts"
          element={
            <AuthGuard>
              <Layout>
                <ContractsPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/work-orders"
          element={
            <AuthGuard>
              <Layout>
                <WorkOrdersPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/feather-forms"
          element={
            <AuthGuard>
              <Layout>
                <FeatherFormsPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/project-timeline"
          element={
            <AuthGuard>
              <Layout>
                <ProjectTimelinePage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/payments"
          element={
            <AuthGuard>
              <Layout>
                <PaymentsPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/accounting"
          element={
            <AuthGuard>
              <Layout>
                <AccountingPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/ai-voice"
          element={
            <AuthGuard>
              <Layout>
                <AIVoiceAssistant />
              </Layout>
            </AuthGuard>
          }
        />
        <Route
          path="/e-signatures"
          element={
            <AuthGuard>
              <Layout>
                <DocumentSignaturesPage />
              </Layout>
            </AuthGuard>
          }
        />
        <Route 
          path="/car-rental" 
          element={
            <AuthGuard>
              <Layout>
                <ResponsiveCarRentalPage />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/mat-track" 
          element={
            <AuthGuard>
              <Layout>
                <ResponsiveMatTrackPage />
              </Layout>
            </AuthGuard>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
