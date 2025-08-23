
import React from 'react'
import { Calculator, FileText, DollarSign, Calendar } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function FeatherTaxPage() {
  const metrics = [
    {
      title: 'Tax Liability',
      value: '$8,450',
      subtitle: 'Estimated quarterly',
      icon: DollarSign
    },
    {
      title: 'Deductions',
      value: '$12,340',
      subtitle: 'This year',
      icon: Calculator
    },
    {
      title: 'Documents',
      value: '34',
      subtitle: 'Tax-related files',
      icon: FileText
    }
  ]

  return (
    <PagePlaceholder
      title="FeatherTax"
      subtitle="Automated tax preparation and compliance"
      icon={Calculator}
      actionLabel="Start Tax Return"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
