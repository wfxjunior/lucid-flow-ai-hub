
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { EnhancedSecurityWrapper } from "@/components/security/EnhancedSecurityWrapper";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Investors from "./pages/Investors";
import Auth from "./pages/Auth";
import { AuthGuard } from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <EnhancedSecurityWrapper>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthGuard>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/forgot-password" element={<Auth />} />
                <Route path="/reset-password" element={<Auth />} />
                <Route path="/verify-email" element={<Auth />} />
                <Route path="/dashboard/*" element={<Index />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </AuthGuard>
          </BrowserRouter>
        </EnhancedSecurityWrapper>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
