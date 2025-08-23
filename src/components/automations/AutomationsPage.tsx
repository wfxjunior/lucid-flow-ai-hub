
import React from 'react'
import { Zap, Play, Clock, CheckCircle } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function AutomationsPage() {
  const metrics = [
    {
      title: 'Active Automations',
      value: '8',
      subtitle: 'Currently running',
      icon: Play
    },
    {
      title: 'Tasks Automated',
      value: '1,247',
      subtitle: 'This month',
      icon: CheckCircle
    },
    {
      title: 'Time Saved',
      value: '45h',
      subtitle: 'This week',
      icon: Clock
    }
  ]

  return (
    <PagePlaceholder
      title="Automations"
      subtitle="Streamline workflows with intelligent automation"
      icon={Zap}
      actionLabel="Create Automation"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
