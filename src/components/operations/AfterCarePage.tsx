
import React from 'react'
import { Heart } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function AfterCarePage() {
  return (
    <PagePlaceholder
      title="AfterCare"
      subtitle="Post-service customer care and follow-up"
      icon={Heart}
      actionLabel="Schedule Follow-up"
      onActionClick={() => {}}
    />
  )
}
