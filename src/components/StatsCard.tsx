
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppIcon } from "@/components/ui/AppIcon"
import * as LucideIcons from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: keyof typeof LucideIcons
  trend: 'up' | 'down'
}

export function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  return (
    <Card className="stripe-card dashboard-card">
      <CardHeader className="stripe-card-header flex flex-row items-center justify-between space-y-0">
        <CardTitle className="stripe-meta kpi-label">
          {title}
        </CardTitle>
        <AppIcon name={icon} size="sm" tone="default" />
      </CardHeader>
      <CardContent className="stripe-card-content">
        <div className="stripe-metric dashboard-number kpi-number">{value}</div>
        <p className={`stripe-meta text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}
