
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
      <div className="w-full max-w-none px-4 py-4">
        <div className="space-y-4">
          {/* Header - Compact */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {actionLabel && onActionClick && (
              <Button onClick={onActionClick} size="sm" className="text-sm">
                {actionLabel}
              </Button>
            )}
          </div>

          {/* Metrics - More Compact Grid */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            {metric.title}
                          </p>
                          <p className="text-xl font-bold text-foreground mt-1">
                            {metric.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {metric.subtitle}
                          </p>
                        </div>
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-h-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
