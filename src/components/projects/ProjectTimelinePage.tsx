
import React from 'react'
import { Calendar, Clock, CheckCircle } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'
import { Card, CardContent } from '@/components/ui/card'

export function ProjectTimelinePage() {
  const metrics = [
    {
      title: 'Active Projects',
      value: '12',
      subtitle: 'In progress',
      icon: Calendar
    },
    {
      title: 'Milestones This Week',
      value: '8',
      subtitle: 'Due soon',
      icon: Clock
    },
    {
      title: 'Completed Tasks',
      value: '156',
      subtitle: 'This month',
      icon: CheckCircle
    }
  ]

  return (
    <div className="w-full h-full min-h-screen bg-background">
      <div className="w-full max-w-none px-4 py-4">
        <div className="space-y-4">
          {/* Header - More Compact */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Project Timeline</h1>
              <p className="text-sm text-muted-foreground mt-1">Track project milestones and deadlines</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Add Milestone
            </button>
          </div>

          {/* Metrics - Adjusted Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

          {/* Main Content - Adjusted Height */}
          <Card className="flex-1">
            <CardContent className="py-8 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-medium mb-2">Project Timeline</h3>
              <p className="text-sm text-muted-foreground">
                Visual project timeline and milestone tracking coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
