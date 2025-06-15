import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ResponsiveCarRentalPage } from '@/components/ResponsiveCarRentalPage'
import { ResponsiveMatTrackPage } from '@/components/ResponsiveMatTrackPage'
import Index from '@/pages/Index'
import Auth from '@/pages/Auth'
import FeaturesOverview from '@/pages/FeaturesOverview'

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
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        {/* Features Overview Page */}
        <Route path="/features-overview" element={<FeaturesOverview />} />
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
      </Routes>
    </Router>
  )
}

export default App
