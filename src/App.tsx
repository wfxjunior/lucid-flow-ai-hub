
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Blog from "./pages/Blog"
import BlogIndex from "./pages/BlogIndex"
import AdminBlog from "./pages/AdminBlog"
import AdminPage from "./pages/AdminPage"
import Contact from "./pages/Contact"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog-old" element={<Blog />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
