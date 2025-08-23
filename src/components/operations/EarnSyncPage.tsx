
import React from 'react'
import { Target } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function EarnSyncPage() {
  return (
    <PagePlaceholder
      title="EarnSync"
      subtitle="Synchronize earnings and performance tracking"
      icon={Target}
      actionLabel="Sync Earnings"
      onActionClick={() => {}}
    />
  )
}
