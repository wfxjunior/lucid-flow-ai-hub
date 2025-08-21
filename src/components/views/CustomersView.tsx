
import React from 'react'
import { Users } from 'lucide-react'
import { GenericView } from './GenericView'

export function CustomersView() {
  return (
    <GenericView
      title="Customers"
      description="Manage your customer database"
      icon={Users}
    />
  )
}
