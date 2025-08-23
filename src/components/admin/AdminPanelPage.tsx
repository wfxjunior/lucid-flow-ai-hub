
import React from 'react'
import { Shield } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function AdminPanelPage() {
  return (
    <PagePlaceholder
      title="Admin Panel"
      subtitle="System administration and management"
      icon={Shield}
    />
  )
}
