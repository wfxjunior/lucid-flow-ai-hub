
import React from 'react'
import { Video } from 'lucide-react'
import { GenericView } from './GenericView'

export function MeetingsView() {
  return (
    <GenericView
      title="Meetings"
      description="Schedule and manage meetings"
      icon={Video}
    />
  )
}
