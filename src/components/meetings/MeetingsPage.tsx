
import React from 'react'
import { useMeetingsQuery } from '@/hooks/business/useMeetingsQuery'
import { Video } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function MeetingsPage() {
  const { data: meetings = [] } = useMeetingsQuery()

  const metrics = [
    {
      title: 'Total Meetings',
      value: meetings.length.toString(),
      subtitle: 'All time',
      icon: Video
    }
  ]

  return (
    <PagePlaceholder
      title="Meetings"
      subtitle="Schedule and manage meetings"
      icon={Video}
      actionLabel="Schedule Meeting"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
