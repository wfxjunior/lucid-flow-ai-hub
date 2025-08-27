
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
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 1000 1000" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
            >
              <path d="M125 400C125 300 200 225 300 225H700C800 225 875 300 875 400V600C875 700 800 775 700 775H300C200 775 125 700 125 600V400Z" fill="currentColor"/>
              <path d="M200 350L200 500C200 520 216 536 236 536L764 536C784 536 800 520 800 500L800 350C800 330 784 314 764 314L236 314C216 314 200 330 200 350Z" fill="white"/>
              <path d="M180 320C160 320 140 340 140 360C140 380 160 400 180 400L820 400C840 400 860 380 860 360C860 340 840 320 820 320L180 320Z" fill="currentColor"/>
              <path d="M100 200L150 250L200 200L250 250L300 200L350 250L400 200L450 250L500 200L550 250L600 200L650 250L700 200L750 250L800 200L850 250L900 200" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
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
