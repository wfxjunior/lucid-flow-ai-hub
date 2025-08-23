
import React from 'react'
import { PiggyBank, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function FeatherBudgetPage() {
  const metrics = [
    {
      title: 'Monthly Budget',
      value: '$25,000',
      subtitle: 'Current allocation',
      icon: PiggyBank
    },
    {
      title: 'Spent This Month',
      value: '$18,450',
      subtitle: '74% of budget',
      icon: TrendingDown
    },
    {
      title: 'Savings',
      value: '$6,550',
      subtitle: 'Remaining budget',
      icon: TrendingUp
    }
  ]

  return (
    <PagePlaceholder
      title="FeatherBudget AI"
      subtitle="AI-powered budgeting and financial planning"
      icon={PiggyBank}
      actionLabel="Create Budget"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
