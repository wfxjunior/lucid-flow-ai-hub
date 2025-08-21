
import React from 'react'
import { Settings } from 'lucide-react'
import { GenericView } from './GenericView'

export function SettingsView() {
  return (
    <GenericView
      title="Settings"
      description="Configure your application preferences"
      icon={Settings}
    />
  )
}
