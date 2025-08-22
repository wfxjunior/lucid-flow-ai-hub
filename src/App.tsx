
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import Auth from "./pages/Auth";
import { AuthGuard } from "./components/AuthGuard";
import { Dashboard } from "./pages/Dashboard";
import { ClientsPage } from "./components/ClientsPage";
import { ContractsPage } from "./pages/ContractsPage";
import { WorkOrdersPage } from "./pages/WorkOrdersPage";
import { InvoicesPage } from "./pages/InvoicesPage";
import { EstimatesPage } from "./pages/EstimatesPage";
import { MeetingsPage } from "./pages/MeetingsPage";
import { BusinessSettings } from "./pages/BusinessSettings";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect } from "react";
import { ErrorBoundary } from '@/components/security/ErrorBoundary';
import { SessionTimeoutManager } from '@/components/security/SessionTimeoutManager';
import { SecurityAuditLogger } from '@/components/security/SecurityAuditLogger';

function App() {
  // Apply security headers on app load
  useEffect(() => {
    import('@/utils/contentSecurityPolicy').then(({ applySecurityHeaders }) => {
      applySecurityHeaders();
    });
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SecurityAuditLogger>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
              <Route
                path="/clients"
                element={
                  <AuthGuard>
                    <ClientsPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/contracts"
                element={
                  <AuthGuard>
                    <ContractsPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/work-orders"
                element={
                  <AuthGuard>
                    <WorkOrdersPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/invoices"
                element={
                  <AuthGuard>
                    <InvoicesPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/estimates"
                element={
                  <AuthGuard>
                    <EstimatesPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/meetings"
                element={
                  <AuthGuard>
                    <MeetingsPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthGuard>
                    <BusinessSettings />
                  </AuthGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />
            </Routes>
            <SessionTimeoutManager />
            <Toaster />
          </SecurityAuditLogger>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
