
import React from 'react'
import { Wrench } from 'lucide-react'
import { GenericView } from './GenericView'

export function WorkOrdersView() {
  return (
    <GenericView
      title="Work Orders"
      description="Manage work orders and tasks"
      icon={Wrench}
    />
  )
}
