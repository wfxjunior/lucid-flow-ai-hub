
import React from 'react'
import { useWorkOrdersQuery } from '@/hooks/business/useWorkOrdersQuery'
import { useBusinessMutations } from '@/hooks/business/useBusinessMutations'
import { Package, Plus, Calendar, CheckCircle } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function WorkOrdersPage() {
  const { data: workOrders = [] } = useWorkOrdersQuery()
  const { createWorkOrder } = useBusinessMutations()

  const metrics = [
    {
      title: 'Total Work Orders',
      value: workOrders.length.toString(),
      subtitle: 'All time',
      icon: Package
    },
    {
      title: 'Active',
      value: workOrders.filter(wo => wo.status === 'in_progress').length.toString(),
      subtitle: 'In progress',
      icon: Calendar
    },
    {
      title: 'Completed',
      value: workOrders.filter(wo => wo.status === 'completed').length.toString(),
      subtitle: 'This month',
      icon: CheckCircle
    }
  ]

  return (
    <PagePlaceholder
      title="Work Orders"
      subtitle="Manage service requests and work orders"
      icon={Package}
      actionLabel="New Work Order"
      onActionClick={() => createWorkOrder({
        title: 'New Work Order',
        description: 'Work order description',
        status: 'pending',
        priority: 'medium'
      })}
      metrics={metrics}
    />
  )
}
