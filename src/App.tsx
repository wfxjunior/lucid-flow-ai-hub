
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthGuard } from "@/components/AuthGuard"
import { SecurityHeaders } from "@/components/security/SecurityHeaders"
import { LanguageProvider } from "@/contexts/LanguageContext"
import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SecurityHeaders />
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AuthGuard>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AuthGuard>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App
