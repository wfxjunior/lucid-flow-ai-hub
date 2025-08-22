
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelledPage from '@/pages/PaymentCancelledPage';
import Blog from '@/pages/Blog';
import BlogPostDetail from '@/pages/BlogPostDetail';
import AdminBlog from '@/pages/AdminBlog';
import MainApp from '@/pages/MainApp';
import { AuthGuard } from '@/components/AuthGuard';
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";

const Auth = lazy(() => import("@/pages/Auth"));
const Upgrade = lazy(() => import("@/pages/Upgrade"));
const Clients = lazy(() => import("@/pages/Clients"));
const Invoices = lazy(() => import("@/pages/Invoices"));
const WorkOrders = lazy(() => import("@/pages/WorkOrders"));
const Estimates = lazy(() => import("@/pages/Estimates"));
const Contracts = lazy(() => import("@/pages/Contracts"));
const FeatherBudget = lazy(() => import("@/pages/FeatherBudget"));
const Settings = lazy(() => import("@/pages/Settings"));

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/app" element={<AuthGuard><MainApp /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><MainApp /></Suspense></AuthGuard>} />
            <Route path="/upgrade" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Upgrade /></Suspense></AuthGuard>} />
            <Route path="/clients" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Clients /></Suspense></AuthGuard>} />
            <Route path="/invoices" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Invoices /></Suspense></AuthGuard>} />
            <Route path="/work-orders" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><WorkOrders /></Suspense></AuthGuard>} />
            <Route path="/estimates" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Estimates /></Suspense></AuthGuard>} />
            <Route path="/contracts" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Contracts /></Suspense></AuthGuard>} />
            <Route path="/budget" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><FeatherBudget /></Suspense></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Suspense fallback={<div>Loading...</div>}><Settings /></Suspense></AuthGuard>} />
          </Routes>
        </BrowserRouter>
      </SessionContextProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
