
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { DocumentTrackingProvider } from '@/components/DocumentTrackingProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AuthGuard } from '@/components/AuthGuard'
import { ErrorFallback } from '@/components/ErrorFallback'

// Import LandingPage directly to avoid module loading issues
import LandingPage from '@/pages/LandingPage'

// Lazy load other pages for better performance
const Index = lazy(() => import('@/pages/Index'))
const Auth = lazy(() => import('@/pages/Auth'))
const TestPDF = lazy(() => import('@/pages/TestPDF'))
const Features = lazy(() => import('@/pages/Features'))
const Integrations = lazy(() => import('@/pages/Integrations'))
const API = lazy(() => import('@/pages/API'))
const Security = lazy(() => import('@/pages/Security'))
const HelpCenter = lazy(() => import('@/pages/HelpCenter'))
const Documentation = lazy(() => import('@/pages/Documentation'))
const Community = lazy(() => import('@/pages/Community'))
const CaseStudies = lazy(() => import('@/pages/CaseStudies'))
const Guides = lazy(() => import('@/pages/Guides'))
const Webinars = lazy(() => import('@/pages/Webinars'))
const About = lazy(() => import('@/pages/About'))
const Careers = lazy(() => import('@/pages/Careers'))
const Press = lazy(() => import('@/pages/Press'))
const Partners = lazy(() => import('@/pages/Partners'))
const Investors = lazy(() => import('@/pages/Investors'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('@/pages/TermsOfService'))
const Feedback = lazy(() => import('@/pages/Feedback'))
const ScalePage = lazy(() => import('@/pages/ScalePage'))
const FeaturesOverview = lazy(() => import('@/pages/FeaturesOverview'))
const EditionsPage = lazy(() => import('@/pages/EditionsPage'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const BlogIndex = lazy(() => import('@/pages/BlogIndex'))
const BlogPostDetail = lazy(() => import('@/pages/BlogPostDetail'))
const AdminBlog = lazy(() => import('@/pages/AdminBlog'))
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'))
const PaymentCanceled = lazy(() => import('@/pages/PaymentCanceled'))

// Admin pages - separate chunk for admin functionality
const TemplatesOverview = lazy(() => import('@/pages/admin/docs/TemplatesOverview'))
const ApiDocsWhatAndHow = lazy(() => import('@/pages/admin/docs/ApiDocsWhatAndHow'))
const AdminAPISettings = lazy(() => import('@/pages/admin/api/AdminAPISettings'))
const OpenAPIPreview = lazy(() => import('@/pages/admin/api/OpenAPIPreview'))
const OpenAPISkeletonJSON = lazy(() => import('@/pages/admin/api/OpenAPISkeletonJSON'))

// Simple components - direct imports to avoid module loading issues
const CarRentalFallback = () => <div className="p-8 text-center">Carregando...</div>
const MatTrackFallback = () => <div className="p-8 text-center">Carregando...</div>

// Remove the dummy AuthGuard since we're importing the real one

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    {children}
  </div>
)

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <ErrorBoundary fallback={<ErrorFallback />}>
      {children}
    </ErrorBoundary>
  </Suspense>
)

function App() {
  const [redirectProcessed, setRedirectProcessed] = useState(false)

  // Debug logging for app mounting
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  // Optimized canonical redirect with loop prevention
  useEffect(() => {
    if (import.meta.env.PROD && !redirectProcessed) {
      try {
        const host = window.location.hostname
        const isLovable = host.includes('lovableproject.com') || host.includes('lovable.app')
        
        if (isLovable) {
          const target = `https://featherbiz.io${window.location.pathname}${window.location.search}${window.location.hash}`
          if (window.location.href !== target) {
            // Add delay and state check to prevent loops
            setTimeout(() => {
              if (!redirectProcessed) {
                setRedirectProcessed(true)
                window.location.replace(target)
              }
            }, 100)
          }
        }
      } catch (e) {
        // Silent fail in production
        if (import.meta.env.DEV) {
          console.warn('Canonical redirect skipped:', e)
        }
      }
    }
  }, [redirectProcessed])

  // Improved security headers implementation
  useEffect(() => {
    // Prevent clickjacking with proper error handling
    try {
      if (window.self !== window.top) {
        // Log but don't redirect to prevent loops
        if (import.meta.env.DEV) {
          console.warn('App loaded in iframe - potential clickjacking')
        }
      }
    } catch (e) {
      // Silently fail for cross-origin restrictions
      if (import.meta.env.DEV) {
        console.warn('Clickjacking prevention skipped due to cross-origin restrictions')
      }
    }
    
    // Disable right-click in production for additional security
    if (import.meta.env.PROD) {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault()
      document.addEventListener('contextmenu', handleContextMenu)
      return () => document.removeEventListener('contextmenu', handleContextMenu)
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
          <Route 
            path="/scale" 
            element={
              <SuspenseWrapper>
                <ScalePage />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/" 
            element={
              <SuspenseWrapper>
                <AuthGuard fallback={<LandingPage />}>
                  <Index />
                </AuthGuard>
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/auth" 
            element={
              <SuspenseWrapper>
                <Auth />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/test-pdf" 
            element={
              <SuspenseWrapper>
                <TestPDF />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/features-overview" 
            element={
              <SuspenseWrapper>
                <FeaturesOverview />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/editions" 
            element={
              <SuspenseWrapper>
                <EditionsPage />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <SuspenseWrapper>
                <Pricing />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/payment/success" 
            element={
              <SuspenseWrapper>
                <PaymentSuccess />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/payment/canceled" 
            element={
              <SuspenseWrapper>
                <PaymentCanceled />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/car-rental" 
            element={
              <SuspenseWrapper>
                <AuthGuard>
                  <Layout>
                    <CarRentalFallback />
                  </Layout>
                </AuthGuard>
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/mat-track" 
            element={
              <SuspenseWrapper>
                <AuthGuard>
                  <Layout>
                    <MatTrackFallback />
                  </Layout>
                </AuthGuard>
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/features" 
            element={
              <SuspenseWrapper>
                <Features />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/integrations" 
            element={
              <SuspenseWrapper>
                <Integrations />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/api" 
            element={
              <SuspenseWrapper>
                <API />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/security" 
            element={
              <SuspenseWrapper>
                <Security />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/help-center" 
            element={
              <SuspenseWrapper>
                <HelpCenter />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/documentation" 
            element={
              <SuspenseWrapper>
                <Documentation />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/community" 
            element={
              <SuspenseWrapper>
                <Community />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/case-studies" 
            element={
              <SuspenseWrapper>
                <CaseStudies />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/guides" 
            element={
              <SuspenseWrapper>
                <Guides />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/webinars" 
            element={
              <SuspenseWrapper>
                <Webinars />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/about" 
            element={
              <SuspenseWrapper>
                <About />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/careers" 
            element={
              <SuspenseWrapper>
                <Careers />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/press" 
            element={
              <SuspenseWrapper>
                <Press />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/partners" 
            element={
              <SuspenseWrapper>
                <Partners />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/investors" 
            element={
              <SuspenseWrapper>
                <Investors />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <SuspenseWrapper>
                <BlogIndex />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/blog/:slug" 
            element={
              <SuspenseWrapper>
                <BlogPostDetail />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/blog" 
            element={
              <SuspenseWrapper>
                <AdminBlog />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/docs/templates-overview" 
            element={
              <SuspenseWrapper>
                <TemplatesOverview />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/docs/api-docs-what-and-how" 
            element={
              <SuspenseWrapper>
                <ApiDocsWhatAndHow />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/api" 
            element={
              <SuspenseWrapper>
                <AdminAPISettings />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/api/preview" 
            element={
              <SuspenseWrapper>
                <OpenAPIPreview />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/admin/api/openapi.json" 
            element={
              <SuspenseWrapper>
                <OpenAPISkeletonJSON />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/privacy-policy" 
            element={
              <SuspenseWrapper>
                <PrivacyPolicy />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/terms-of-service" 
            element={
              <SuspenseWrapper>
                <TermsOfService />
              </SuspenseWrapper>
            } 
          />
          <Route 
            path="/feedback" 
            element={
              <SuspenseWrapper>
                <Feedback />
              </SuspenseWrapper>
            } 
          />
        </Routes>
      </Router>
    </DocumentTrackingProvider>
  )
}

export default App
