
import React from 'react'
import { Clock, Calendar, Users, CheckCircle } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'

export function SmartSchedulePage() {
  const metrics = [
    {
      title: 'Scheduled Today',
      value: '12',
      subtitle: 'Appointments',
      icon: Calendar
    },
    {
      title: 'Utilization Rate',
      value: '87%',
      subtitle: 'This week',
      icon: Clock
    },
    {
      title: 'No-Shows',
      value: '3',
      subtitle: 'This month',
      icon: Users
    }
  ]

  return (
    <CleanPageLayout
      title="Smart Schedule"
      subtitle="AI-powered scheduling and calendar management"
      actionLabel="Schedule Appointment"
      onActionClick={() => {}}
      metrics={metrics}
    >
      <div className="flex items-center justify-center h-64 bg-muted/20 rounded-lg border border-dashed border-border">
        <div className="text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Smart Schedule</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            AI-powered scheduling and calendar management system coming soon.
          </p>
        </div>
      </div>
    </CleanPageLayout>
  )
}
