import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ResponsiveCarRentalPage } from '@/components/ResponsiveCarRentalPage'
import { ResponsiveMatTrackPage } from '@/components/ResponsiveMatTrackPage'
import { DocumentTrackingProvider } from '@/components/DocumentTrackingProvider'
import Index from '@/pages/Index'
import Auth from '@/pages/Auth'
import Features from '@/pages/Features'
import Integrations from '@/pages/Integrations'
import API from '@/pages/API'
import Security from '@/pages/Security'
import HelpCenter from '@/pages/HelpCenter'
import Documentation from '@/pages/Documentation'
import Community from '@/pages/Community'
import CaseStudies from '@/pages/CaseStudies'
import Guides from '@/pages/Guides'
import Webinars from '@/pages/Webinars'
import About from '@/pages/About'
import Careers from '@/pages/Careers'
import Press from '@/pages/Press'
import Partners from '@/pages/Partners'
import Investors from '@/pages/Investors'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfService from '@/pages/TermsOfService'
import Feedback from '@/pages/Feedback'

import LandingPage from '@/pages/LandingPage'
import GoldPage from '@/pages/GoldPage'
import FeaturesOverview from '@/pages/FeaturesOverview'
import EditionsPage from '@/pages/EditionsPage'
import Pricing from '@/pages/Pricing'
import BlogIndex from '@/pages/BlogIndex'
import BlogPostDetail from '@/pages/BlogPostDetail'
import AdminBlog from '@/pages/AdminBlog'
import TemplatesOverview from '@/pages/admin/docs/TemplatesOverview'
import ApiDocsWhatAndHow from '@/pages/admin/docs/ApiDocsWhatAndHow'
import AdminAPISettings from '@/pages/admin/api/AdminAPISettings'
import OpenAPIPreview from '@/pages/admin/api/OpenAPIPreview'
import OpenAPISkeletonJSON from '@/pages/admin/api/OpenAPISkeletonJSON'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // For now, we'll just return children since we're using the Index page with its own auth
  return <>{children}</>
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    {children}
  </div>
)


function App() {
  // Canonical redirect: any *.lovable* → featherbiz.io (preserve path, query, hash)
  useEffect(() => {
    try {
      const host = window.location.hostname
      const isLovable = host.includes('lovableproject.com') || host.includes('lovable.app')
      if (isLovable) {
        const target = `https://featherbiz.io${window.location.pathname}${window.location.search}${window.location.hash}`
        if (window.location.href !== target) {
          window.location.replace(target)
        }
      }
    } catch (e) {
      console.warn('Canonical redirect skipped:', e)
    }
  }, [])

  return (
    <DocumentTrackingProvider>
      <Router>
        <Routes>
        <Route
          path="/landing"
          element={<LandingPage />}
        />
        <Route path="/gold" element={<GoldPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/features-overview" element={<FeaturesOverview />} />
        <Route path="/editions" element={<EditionsPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route 
          path="/car-rental" 
          element={
            <AuthGuard>
              <Layout>
                <ResponsiveCarRentalPage />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/mat-track" 
          element={
            <AuthGuard>
              <Layout>
                <ResponsiveMatTrackPage />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route path="/features" element={<Features />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/api" element={<API />} />
        <Route path="/security" element={<Security />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/community" element={<Community />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/docs/templates-overview" element={<TemplatesOverview />} />
        <Route path="/admin/docs/api-docs-what-and-how" element={<ApiDocsWhatAndHow />} />
        <Route path="/admin/api" element={<AdminAPISettings />} />
        <Route path="/admin/api/preview" element={<OpenAPIPreview />} />
        <Route path="/admin/api/openapi.json" element={<OpenAPISkeletonJSON />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </DocumentTrackingProvider>
  )
}

export default App
