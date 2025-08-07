import React from 'react'
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

import LandingPage from '@/pages/LandingPage'
import FeaturesOverview from '@/pages/FeaturesOverview'
import EditionsPage from '@/pages/EditionsPage'

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
  return (
    <DocumentTrackingProvider>
      <Router>
        <Routes>
        <Route
          path="/landing"
          element={<LandingPage />}
        />
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/features-overview" element={<FeaturesOverview />} />
        <Route path="/editions" element={<EditionsPage />} />
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
        </Routes>
      </Router>
    </DocumentTrackingProvider>
  )
}

export default App
