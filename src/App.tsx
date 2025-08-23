
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { EnhancedSecurityHeaders } from "@/components/security/EnhancedSecurityHeaders";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <EnhancedSecurityHeaders />
        <AppRoutes />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
