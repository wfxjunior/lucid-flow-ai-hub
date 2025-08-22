
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthGuard } from "@/components/AuthGuard"
import { SecurityHeaders } from "@/components/security/SecurityHeaders"
import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
