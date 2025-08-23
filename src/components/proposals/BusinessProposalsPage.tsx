
import React from 'react'
import { Clipboard } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function BusinessProposalsPage() {
  return (
    <PagePlaceholder
      title="Business Proposals"
      subtitle="Create and track business proposals"
      icon={Clipboard}
      actionLabel="New Proposal"
      onActionClick={() => {}}
    />
  )
}
