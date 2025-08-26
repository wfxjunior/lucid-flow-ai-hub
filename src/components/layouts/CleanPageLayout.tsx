
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

interface Metric {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
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
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{subtitle}</p>
          </div>
          {actionLabel && onActionClick && (
            <Button onClick={onActionClick} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>

        {/* Metrics Grid */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                          {metric.title}
                        </p>
                        <p className="text-lg sm:text-2xl font-bold">
                          {typeof metric.value === 'number' ? metric.value.toString() : metric.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                      </div>
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
  )
}
