
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Transforme sua gestão empresarial em uma experiência inteligente e eficiente
            </p>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
