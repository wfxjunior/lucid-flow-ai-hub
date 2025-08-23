
import React from 'react'
import { Mail } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function EmailCenterPage() {
  return (
    <PagePlaceholder
      title="Email Center"
      subtitle="Manage email campaigns and communications"
      icon={Mail}
      actionLabel="Compose Email"
      onActionClick={() => {}}
    />
  )
}
