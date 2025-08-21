import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QueryClient } from 'react-query'

import LandingPage from '@/pages/LandingPage'
import PricingPage from '@/pages/PricingPage'
import ContactPage from '@/pages/ContactPage'
import AboutPage from '@/pages/AboutPage'
import AuthPage from '@/pages/Auth'
import PaymentSuccessPage from '@/pages/PaymentSuccessPage'
import PaymentCancelledPage from '@/pages/PaymentCancelledPage'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'
import MainApp from '@/pages/MainApp'
import AuthGuard from '@/components/AuthGuard'
import { SecurityDashboard } from '@/components/security/SecurityDashboard'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'
import { SecurityAuditLogger } from '@/components/security/SecurityAuditLogger'

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <AuthGuard>
          <SecurityAuditLogger>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
                <Route path="/payment-canceled" element={<PaymentCancelledPage />} />
                <Route path="/health" element={<div>OK</div>} />
                
                {/* Protected Routes */}
                <Route path="/app" element={<MainApp />} />
                <Route path="/dashboard" element={<MainApp />} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/security" element={
                  <div className="p-6">
                    <SecurityDashboard />
                  </div>
                } />
              </Routes>
            </div>
          </SecurityAuditLogger>
        </AuthGuard>
        <Toaster />
      </BrowserRouter>
    </QueryClient>
  )
}

export default App
