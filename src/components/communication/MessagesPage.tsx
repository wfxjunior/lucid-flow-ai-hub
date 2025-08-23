
import React from 'react'
import { MessageSquare } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function MessagesPage() {
  return (
    <PagePlaceholder
      title="Messages"
      subtitle="Send and manage customer communications"
      icon={MessageSquare}
      actionLabel="New Message"
      onActionClick={() => {}}
    />
  )
}
