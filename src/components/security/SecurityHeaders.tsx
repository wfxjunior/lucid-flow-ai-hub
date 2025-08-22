
import { useEffect } from 'react'
import { applySecurityHeaders } from '@/utils/contentSecurityPolicy'

export function SecurityHeaders() {
  useEffect(() => {
    applySecurityHeaders()
  }, [])

  return null // This component only applies security headers
}
