
import React from 'react'
import { Calculator } from 'lucide-react'
import { GenericView } from './GenericView'

export function EstimatesView() {
  return (
    <GenericView
      title="Estimates"
      description="Create and manage project estimates"
      icon={Calculator}
    />
  )
}
