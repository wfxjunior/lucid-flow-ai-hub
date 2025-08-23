
import React from 'react'
import { DollarSign } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function BidsPage() {
  return (
    <PagePlaceholder
      title="Bids"
      subtitle="Manage project bids and competitive proposals"
      icon={DollarSign}
      actionLabel="New Bid"
      onActionClick={() => {}}
    />
  )
}
