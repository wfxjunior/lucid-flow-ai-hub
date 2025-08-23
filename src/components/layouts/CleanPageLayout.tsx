
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, Plus } from "lucide-react"

interface MetricCard {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
}

interface CleanPageLayoutProps {
  title: string
  subtitle: string
  actionLabel?: string
  onActionClick?: () => void
  metrics?: MetricCard[]
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
    <div className="w-full h-full bg-background">
      <div className="w-full h-full overflow-y-auto">
        <div className="fb-container py-6 fb-space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1 pr-4">
              <h1 className="fb-h1 text-foreground break-words leading-tight fb-mb-4">
                {title}
              </h1>
              <p className="fb-body-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            {actionLabel && (
              <div className="flex-shrink-0">
                <Button 
                  onClick={onActionClick}
                  className="fb-button bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                  size="sm"
                >
                  <Plus className="fb-icon-sm mr-2" />
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>

          {/* Metrics Cards */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 fb-card-grid">
              {metrics.map((metric, index) => (
                <Card key={index} className="fb-card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 fb-mb-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <metric.icon className="fb-icon-sm text-muted-foreground" />
                        </div>
                        <p className="fb-metric-label">
                          {metric.title}
                        </p>
                      </div>
                      <div className="fb-metric-value text-foreground mb-1">
                        {metric.value}
                      </div>
                      <p className="fb-body-sm text-muted-foreground">
                        {metric.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="w-full fb-space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
