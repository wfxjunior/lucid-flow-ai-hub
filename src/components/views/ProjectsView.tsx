
import React from 'react'
import { Briefcase } from 'lucide-react'
import { GenericView } from './GenericView'

export function ProjectsView() {
  return (
    <GenericView
      title="Projects"
      description="Track ongoing projects"
      icon={Briefcase}
    />
  )
}
