
import React from 'react'
import { File } from 'lucide-react'
import { GenericView } from './GenericView'

export function DocumentsView() {
  return (
    <GenericView
      title="Documents"
      description="Manage documents for e-signature"
      icon={File}
    />
  )
}
