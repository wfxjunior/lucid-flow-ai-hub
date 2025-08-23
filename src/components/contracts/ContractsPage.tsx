
import React from 'react'
import { useContractsQuery } from '@/hooks/business/useContractsQuery'
import { PenTool } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function ContractsPage() {
  const { data: contracts = [] } = useContractsQuery()

  const metrics = [
    {
      title: 'Total Contracts',
      value: contracts.length.toString(),
      subtitle: 'All time',
      icon: PenTool
    }
  ]

  return (
    <PagePlaceholder
      title="Contracts"
      subtitle="Manage legal contracts and agreements"
      icon={PenTool}
      actionLabel="New Contract"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
