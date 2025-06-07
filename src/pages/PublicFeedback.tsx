
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { PublicFeedbackForm } from '@/components/aftercare/PublicFeedbackForm'

const PublicFeedback = () => {
  const [searchParams] = useSearchParams()
  
  const clientName = searchParams.get('client') || 'Valued Client'
  const projectService = searchParams.get('project') || 'Recent Service'
  const businessId = searchParams.get('business') || ''

  if (!businessId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Invalid Link</h1>
          <p className="text-muted-foreground">This feedback link is not valid or has expired.</p>
        </div>
      </div>
    )
  }

  return (
    <PublicFeedbackForm 
      clientName={clientName}
      projectService={projectService}
      businessId={businessId}
    />
  )
}

export default PublicFeedback
