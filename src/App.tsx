
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Import all page components
import LandingPage from "@/pages/LandingPage";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Search from "@/pages/Search";
import Help from "@/pages/Help";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCanceled from "@/pages/PaymentCanceled";
import HealthCheck from "@/pages/HealthCheck";
import RouteDebug from "@/pages/RouteDebug";
import RouteDiagnostics from "@/pages/RouteDiagnostics";

// Feature pages
import AIVoicePage from "@/pages/features/AIVoicePage";
import InvoicesFeaturePage from "@/pages/features/InvoicesPage";
import EstimatesFeaturePage from "@/pages/features/EstimatesPage";
import PipelineFeaturePage from "@/pages/features/PipelinePage";
import FeatherTaxFeaturePage from "@/pages/features/FeatherTaxPage";
import EasyCalcFeaturePage from "@/pages/features/EasyCalcPage";
import WorkOrdersFeaturePage from "@/pages/features/WorkOrdersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthGuard>
            <Routes>
              {/* Public Marketing Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="/help" element={<Help />} />

              {/* Content Routes - Placeholders for now */}
              <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Blog Coming Soon</h1><p className="text-gray-600">We're working on our blog. Check back soon!</p></div></div>} />
              <Route path="/blog/:slug" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Blog Post</h1><p className="text-gray-600">Individual blog post will be available soon.</p></div></div>} />
              <Route path="/careers" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Careers Coming Soon</h1><p className="text-gray-600">Join our team! Career opportunities will be posted here.</p></div></div>} />
              <Route path="/careers/:slug" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Job Posting</h1><p className="text-gray-600">Individual job posting will be available soon.</p></div></div>} />
              <Route path="/legal/terms" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Terms of Service</h1><p className="text-gray-600">Terms of service will be available soon.</p></div></div>} />
              <Route path="/legal/privacy" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Privacy Policy</h1><p className="text-gray-600">Privacy policy will be available soon.</p></div></div>} />
              <Route path="/guides/getting-started" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Getting Started Guide</h1><p className="text-gray-600">Step-by-step guide coming soon.</p></div></div>} />
              <Route path="/changelog" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Changelog</h1><p className="text-gray-600">Product updates and changes will be listed here.</p></div></div>} />

              {/* Feature Demo Routes */}
              <Route path="/features/ai-voice" element={<AIVoicePage />} />
              <Route path="/features/invoices" element={<InvoicesFeaturePage />} />
              <Route path="/features/estimates" element={<EstimatesFeaturePage />} />
              <Route path="/features/easycalc" element={<EasyCalcFeaturePage />} />
              <Route path="/features/pipeline" element={<PipelineFeaturePage />} />
              <Route path="/features/feathertax" element={<FeatherTaxFeaturePage />} />
              <Route path="/features/work-orders" element={<WorkOrdersFeaturePage />} />

              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/signup" element={<Navigate to="/auth" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/auth" replace />} />
              <Route path="/reset-password" element={<Navigate to="/auth" replace />} />
              <Route path="/verify-email" element={<Navigate to="/auth" replace />} />

              {/* Checkout Routes (Public) */}
              <Route path="/checkout/success" element={<PaymentSuccess />} />
              <Route path="/checkout/cancel" element={<PaymentCanceled />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-canceled" element={<PaymentCanceled />} />

              {/* Health & Debug Routes */}
              <Route path="/health" element={<HealthCheck />} />
              <Route path="/_debug/routes" element={<RouteDebug />} />
              <Route path="/_debug/diagnostics" element={<RouteDiagnostics />} />

              {/* Authenticated App Routes */}
              <Route path="/dashboard/*" element={<Index />} />

              {/* 404 Fallback */}
              <Route path="/404" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1><p className="text-gray-600">The page you're looking for doesn't exist.</p></div></div>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
