
import React from 'react'
import { StickyNote } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function NotesPage() {
  return (
    <PagePlaceholder
      title="Notes"
      subtitle="Create and organize notes"
      icon={StickyNote}
      actionLabel="New Note"
      onActionClick={() => {}}
    />
  )
}
