
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface Metric {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
}

interface CleanPageLayoutProps {
  title: string
  subtitle: string
  actionLabel?: string
  onActionClick?: () => void
  metrics?: Metric[]
  children: React.ReactNode
}

export function CleanPageLayout({
  title,
  subtitle,
  actionLabel,
  onActionClick, 
  metrics = [],
  children
}: CleanPageLayoutProps) {
  return (
    <div className="w-full h-full min-h-screen bg-background">
      <div className="w-full max-w-none px-6 py-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {actionLabel && onActionClick && (
              <Button onClick={onActionClick}>
                {actionLabel}
              </Button>
            )}
          </div>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {metric.title}
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {metric.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {metric.subtitle}
                          </p>
                        </div>
                        <Icon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  )
}
