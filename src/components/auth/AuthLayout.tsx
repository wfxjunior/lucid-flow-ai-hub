
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface AuthLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-12">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">FeatherBiz</h1>
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
            <a href="/terms-of-service" className="text-foreground underline hover:no-underline">
              Terms and Conditions
            </a>
            {' '}and{' '}
            <a href="/privacy-policy" className="text-foreground underline hover:no-underline">
              Privacy Policy
            </a>
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
