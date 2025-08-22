
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LanguageProvider } from "@/contexts/LanguageContext"
import Dashboard from "./pages/Dashboard"
import "./styles/dashboard-theme.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App
