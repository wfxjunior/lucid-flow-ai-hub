
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import { EnhancedSecurityHeaders } from "@/components/security/EnhancedSecurityHeaders";
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuthState();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSecurityHeaders />
      {user && <SecurityAlert />}
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/*"
          element={user ? <Index /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
