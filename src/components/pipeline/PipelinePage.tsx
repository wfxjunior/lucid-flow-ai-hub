
import React from 'react'
import { Target, TrendingUp, Users, DollarSign } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function PipelinePage() {
  const metrics = [
    {
      title: 'Active Deals',
      value: '23',
      subtitle: 'In pipeline',
      icon: Target
    },
    {
      title: 'Conversion Rate',
      value: '34%',
      subtitle: 'Last 30 days',
      icon: TrendingUp
    },
    {
      title: 'Pipeline Value',
      value: '$89,450',
      subtitle: 'Total potential',
      icon: DollarSign
    }
  ]

  return (
    <PagePlaceholder
      title="Sales Pipeline"
      subtitle="Track and manage your sales opportunities"
      icon={Target}
      actionLabel="Add Deal"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
