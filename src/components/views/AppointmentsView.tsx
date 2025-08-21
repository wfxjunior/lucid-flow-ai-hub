
import React from 'react'
import { Calendar } from 'lucide-react'
import { GenericView } from './GenericView'

export function AppointmentsView() {
  return (
    <GenericView
      title="Appointments"
      description="Schedule and manage appointments"
      icon={Calendar}
    />
  )
}
