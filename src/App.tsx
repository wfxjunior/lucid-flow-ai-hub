
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
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelledPage from '@/pages/PaymentCancelledPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
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
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/app" element={<AuthGuard><MainApp /></AuthGuard>} />
          </Routes>
        </BrowserRouter>
      </SessionContextProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
