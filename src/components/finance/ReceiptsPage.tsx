
import React from 'react'
import { Receipt } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function ReceiptsPage() {
  return (
    <PagePlaceholder
      title="Receipts"
      subtitle="Manage and organize business receipts"
      icon={Receipt}
      actionLabel="Add Receipt"
      onActionClick={() => {}}
    />
  )
}
