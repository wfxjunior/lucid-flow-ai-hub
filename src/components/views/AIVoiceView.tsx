
import React from 'react'
import { Mic } from 'lucide-react'
import { GenericView } from './GenericView'

export function AIVoiceView() {
  return (
    <GenericView
      title="AI Voice"
      description="Voice-powered business assistant"
      icon={Mic}
    />
  )
}
