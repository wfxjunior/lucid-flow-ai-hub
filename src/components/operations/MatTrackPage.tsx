
import React from 'react'
import { Package } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function MatTrackPage() {
  return (
    <PagePlaceholder
      title="MatTrack"
      subtitle="Material tracking and inventory management"
      icon={Package}
      actionLabel="Add Material"
      onActionClick={() => {}}
    />
  )
}
