
import React from 'react'
import { DollarSign, TrendingUp, CreditCard, Receipt } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'
import { Card, CardContent } from '@/components/ui/card'

export function FinancePage() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,678',
      subtitle: 'This month',
      icon: DollarSign
    },
    {
      title: 'Outstanding Invoices',
      value: '$12,340',
      subtitle: 'Pending collection',
      icon: Receipt
    },
    {
      title: 'Payment Success Rate',
      value: '98.5%',
      subtitle: 'Last 30 days',
      icon: CreditCard
    },
    {
      title: 'Growth Rate',
      value: '12.3%',
      subtitle: 'Month over month',
      icon: TrendingUp
    }
  ]

  return (
    <CleanPageLayout
      title="Finance"
      subtitle="Manage your financial operations and reporting"
      actionLabel="Create Invoice"
      onActionClick={() => {}}
      metrics={metrics}
    >
      <Card>
        <CardContent className="py-12 text-center">
          <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Financial Dashboard</h3>
          <p className="text-muted-foreground">
            Complete financial management and reporting tools
          </p>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
