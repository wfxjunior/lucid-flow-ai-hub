
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as HotToaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import BlogIndex from "./pages/BlogIndex";
import AdminBlog from "./pages/AdminBlog";
import { AdminGuard } from "./components/AdminGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route 
                path="/admin/blog" 
                element={
                  <AdminGuard>
                    <AdminBlog />
                  </AdminGuard>
                } 
              />
            </Routes>
          </div>
        </Router>
        <Toaster />
        <HotToaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
