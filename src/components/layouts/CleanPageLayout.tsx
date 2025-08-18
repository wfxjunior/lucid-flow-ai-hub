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
    <div className="w-full h-full bg-background overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8 pb-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 pr-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 break-words leading-tight">
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          {actionLabel && (
            <div className="flex-shrink-0">
              <Button 
                onClick={onActionClick}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {actionLabel}
              </Button>
            </div>
          )}
        </div>

        {/* Metrics Cards */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card border border-border rounded-2xl p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-muted rounded-lg">
                        <metric.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                    </div>
                    <div className="text-3xl font-semibold text-foreground mb-1">
                      {metric.value}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {metric.subtitle}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="w-full space-y-4 md:space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}