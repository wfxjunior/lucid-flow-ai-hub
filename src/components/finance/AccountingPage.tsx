
import React from 'react'
import { FileSpreadsheet } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function AccountingPage() {
  return (
    <PagePlaceholder
      title="Accounting"
      subtitle="Complete accounting and bookkeeping solution"
      icon={FileSpreadsheet}
      actionLabel="New Entry"
      onActionClick={() => {}}
    />
  )
}
