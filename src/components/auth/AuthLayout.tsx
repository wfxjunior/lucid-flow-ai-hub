
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
            <div className="h-40 flex items-center justify-center mx-auto">
              <img 
                src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                alt="FeatherBiz" 
                className="h-40 w-auto"
              />
            </div>
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
