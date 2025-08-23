
import React from 'react'
import { UserCheck } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function CrewControlPage() {
  return (
    <PagePlaceholder
      title="CrewControl"
      subtitle="Manage crew scheduling and workforce"
      icon={UserCheck}
      actionLabel="Add Crew Member"
      onActionClick={() => {}}
    />
  )
}
