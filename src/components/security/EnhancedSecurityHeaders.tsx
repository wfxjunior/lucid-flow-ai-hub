
import { useEffect } from 'react'
import { applyEnhancedSecurityHeaders, validateDomainSecurity, monitorClientSideThreats } from '@/utils/enhancedContentSecurityPolicy'
import { securityEvent } from '@/utils/security'

export function EnhancedSecurityHeaders() {
  useEffect(() => {
    // Apply enhanced security headers
    applyEnhancedSecurityHeaders()

    // Validate domain security
    const domainValidation = validateDomainSecurity()
    if (!domainValidation.isValid) {
      securityEvent('Domain security validation failed', {
        warnings: domainValidation.warnings,
        domain: window.location.hostname
      })
    }

    // Start client-side threat monitoring
    const stopMonitoring = monitorClientSideThreats()

    // Log security initialization
    securityEvent('Enhanced security headers applied', {
      domain: window.location.hostname,
      protocol: window.location.protocol,
      userAgent: navigator.userAgent
    })

    return () => {
      stopMonitoring()
    }
  }, [])

  return null // This component only applies security headers
}
