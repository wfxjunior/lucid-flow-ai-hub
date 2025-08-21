
import React from 'react'
import { MessageSquare } from 'lucide-react'
import { GenericView } from './GenericView'

export function MessagesView() {
  return (
    <GenericView
      title="Messages"
      description="Send emails and SMS to clients"
      icon={MessageSquare}
    />
  )
}
