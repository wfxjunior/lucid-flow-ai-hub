
import React from 'react'
import { FileText } from 'lucide-react'
import { GenericView } from './GenericView'

export function ContractsView() {
  return (
    <GenericView
      title="Contracts"
      description="Manage legal agreements"
      icon={FileText}
    />
  )
}
