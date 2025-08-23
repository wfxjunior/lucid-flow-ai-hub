
import React from 'react'
import { Clipboard } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function FeatherFormsPage() {
  return (
    <PagePlaceholder
      title="FeatherForms"
      subtitle="Create and manage dynamic forms"
      icon={Clipboard}
      actionLabel="New Form"
      onActionClick={() => {}}
    />
  )
}
