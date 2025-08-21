
import React from 'react'
import { Mail } from 'lucide-react'
import { GenericView } from './GenericView'

export function EmailCenterView() {
  return (
    <GenericView
      title="Email Center"
      description="Manage email communications"
      icon={Mail}
    />
  )
}
