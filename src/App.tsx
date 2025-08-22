
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Pricing from "./pages/Pricing";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutCancel from "./pages/checkout/CheckoutCancel";
import TestCheckout from "./pages/checkout/TestCheckout";
import HealthCheck from "./pages/HealthCheck";
import RouteDebug from "./pages/RouteDebug";
import ScalePage from "./pages/ScalePage";
import FeaturesOverview from "./pages/FeaturesOverview";

// Public Feature Demo Pages (no auth required)
import AIVoicePage from "./pages/features/AIVoicePage";
import InvoicesPage from "./pages/features/InvoicesPage";
import EstimatesPage from "./pages/features/EstimatesPage";
import EasyCalcPage from "./pages/features/EasyCalcPage";
import PipelinePage from "./pages/features/PipelinePage";
import FeatherTaxPage from "./pages/features/FeatherTaxPage";
import WorkOrdersPage from "./pages/features/WorkOrdersPage";

// Public Guide Pages (no auth required)
import GettingStartedPage from "./pages/GettingStartedPage";
import ChangelogPage from "./pages/ChangelogPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes - no auth required */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/scale" element={<ScalePage />} />
            <Route path="/features" element={<FeaturesOverview />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-canceled" element={<PaymentCanceled />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            <Route path="/health" element={<HealthCheck />} />
            <Route path="/_debug/routes" element={<RouteDebug />} />
            
            {/* Public Feature Demo Pages - no auth required */}
            <Route path="/features/ai-voice" element={<AIVoicePage />} />
            <Route path="/features/invoices" element={<InvoicesPage />} />
            <Route path="/features/estimates" element={<EstimatesPage />} />
            <Route path="/features/easycalc" element={<EasyCalcPage />} />
            <Route path="/features/pipeline" element={<PipelinePage />} />
            <Route path="/features/feathertax" element={<FeatherTaxPage />} />
            <Route path="/features/work-orders" element={<WorkOrdersPage />} />
            
            {/* Public Guide Pages - no auth required */}
            <Route path="/guides/getting-started" element={<GettingStartedPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            
            {/* Protected routes - auth required */}
            <Route path="/dashboard" element={
              <AuthGuard>
                <Index />
              </AuthGuard>
            } />
            <Route path="/pricing/test-checkout" element={
              <AuthGuard>
                <TestCheckout />
              </AuthGuard>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
