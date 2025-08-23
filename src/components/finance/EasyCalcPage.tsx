
import React from 'react'
import { Calculator, Plus, History, Save } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function EasyCalcPage() {
  const metrics = [
    {
      title: 'Calculations',
      value: '156',
      subtitle: 'This month',
      icon: Calculator
    },
    {
      title: 'Saved Formulas',
      value: '23',
      subtitle: 'Custom calculations',
      icon: Save
    },
    {
      title: 'Recent',
      value: '8',
      subtitle: 'Last calculations',
      icon: History
    }
  ]

  return (
    <PagePlaceholder
      title="EasyCalc"
      subtitle="Advanced calculator with business formulas"
      icon={Calculator}
      actionLabel="New Calculation"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
