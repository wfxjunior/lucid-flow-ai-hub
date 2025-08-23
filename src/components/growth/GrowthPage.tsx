
import React from 'react'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import { CleanPageLayout } from '@/components/layouts/CleanPageLayout'
import { Card, CardContent } from '@/components/ui/card'

export function GrowthPage() {
  const metrics = [
    {
      title: 'Revenue Growth',
      value: '23%',
      subtitle: 'Month over month',
      icon: TrendingUp
    },
    {
      title: 'New Customers',
      value: '47',
      subtitle: 'This month',
      icon: Users
    },
    {
      title: 'Revenue Target',
      value: '87%',
      subtitle: 'Goal completion',
      icon: Target
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$12,450',
      subtitle: 'Current MRR',
      icon: DollarSign
    }
  ]

  return (
    <CleanPageLayout
      title="Growth"
      subtitle="Track business growth and performance metrics"
      metrics={metrics}
    >
      <Card>
        <CardContent className="py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Growth Analytics</h3>
          <p className="text-muted-foreground">
            Comprehensive growth tracking and analytics dashboard
          </p>
        </CardContent>
      </Card>
    </CleanPageLayout>
  )
}
