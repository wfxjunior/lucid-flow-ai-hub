
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
    <CleanPageLayout
      title="Project Timeline"
      subtitle="Track project milestones and deadlines"
      actionLabel="Add Milestone"
      onActionClick={() => {}}
      metrics={metrics}
    >
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
          <p className="text-muted-foreground">
            Visual project timeline and milestone tracking coming soon
          </p>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
