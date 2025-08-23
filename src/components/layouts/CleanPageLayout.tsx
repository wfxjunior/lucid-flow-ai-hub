
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
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-4">
          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground truncate">{title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {actionLabel && onActionClick && (
              <div className="flex-shrink-0">
                <Button onClick={onActionClick} size="sm" className="text-sm w-full sm:w-auto">
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>

          {/* Metrics - Responsive Grid */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-muted-foreground truncate">
                            {metric.title}
                          </p>
                          <p className="text-lg sm:text-xl font-bold text-foreground mt-1 truncate">
                            {metric.value}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {metric.subtitle}
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Main Content - Responsive Container */}
          <div className="flex-1 min-h-0 w-full overflow-hidden">
            <div className="h-full overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
