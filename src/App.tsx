import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Home } from "@/pages/Home";
import { Auth } from "@/pages/Auth";
import { Pricing } from "@/pages/Pricing";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Dashboard } from "@/pages/Dashboard";
import { Company } from "@/pages/Company";
import { FeatherBot } from "@/pages/FeatherBot";
import { Security } from "@/pages/Security";
import { NotFound } from "@/pages/NotFound";
import { SecurityProvider } from '@/contexts/SecurityContext'
import { EnhancedSecurityHeaders } from '@/components/security/EnhancedSecurityHeaders'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SecurityProvider>
        <EnhancedSecurityHeaders />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company" element={<Company />} />
              <Route path="/featherbot" element={<FeatherBot />} />
              <Route path="/security" element={<Security />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SecurityProvider>
    </QueryClientProvider>
  )
}

export default App
