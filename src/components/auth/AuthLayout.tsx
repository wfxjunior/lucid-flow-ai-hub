
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-12">
          <div className="mb-8">
            <svg width="48" height="48" viewBox="0 0 200 200" className="h-12 w-12 mx-auto">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#gradient1)" stroke="#1E40AF" strokeWidth="4"/>
              <text x="100" y="115" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="Arial, sans-serif">F</text>
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
        
        <div className="mt-12 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            By proceeding you acknowledge that you have read, understood and agree to our{' '}
            <Link to="/terms-of-service" className="text-foreground underline hover:no-underline">
              Terms and Conditions
            </Link>
            {' '}and{' '}
            <Link to="/privacy-policy" className="text-foreground underline hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 XSenSys Platforms
          </p>
        </div>
      </div>
    </div>
  )
}
