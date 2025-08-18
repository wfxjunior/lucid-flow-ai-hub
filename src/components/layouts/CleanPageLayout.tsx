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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-base text-muted-foreground">
              {subtitle}
            </p>
          </div>
          
          {actionLabel && (
            <Button 
              onClick={onActionClick}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>

        {/* Metrics Cards */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card border border-border rounded-2xl p-6">
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
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}