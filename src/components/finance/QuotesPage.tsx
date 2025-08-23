
import React from 'react'
import { Clipboard } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function QuotesPage() {
  return (
    <PagePlaceholder
      title="Quotes"
      subtitle="Create and manage project quotes"
      icon={Clipboard}
      actionLabel="New Quote"
      onActionClick={() => {}}
    />
  )
}
