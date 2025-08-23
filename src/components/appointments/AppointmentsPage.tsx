
import React from 'react'
import { useAppointmentsQuery } from '@/hooks/business/useAppointmentsQuery'
import { Calendar } from 'lucide-react'
import { PagePlaceholder } from '@/components/PagePlaceholder'

export function AppointmentsPage() {
  const { data: appointments = [] } = useAppointmentsQuery()

  const metrics = [
    {
      title: 'Total Appointments',
      value: appointments.length.toString(),
      subtitle: 'All time',
      icon: Calendar
    }
  ]

  return (
    <PagePlaceholder
      title="Appointments"
      subtitle="Schedule and manage appointments"
      icon={Calendar}
      actionLabel="New Appointment"
      onActionClick={() => {}}
      metrics={metrics}
    />
  )
}
