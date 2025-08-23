
import React from 'react'
import { TrendingUp } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function SalesOrdersPage() {
  return (
    <PagePlaceholder
      title="Sales Orders"
      subtitle="Manage sales orders and fulfillment"
      icon={TrendingUp}
      actionLabel="New Sales Order"
      onActionClick={() => {}}
    />
  )
}
