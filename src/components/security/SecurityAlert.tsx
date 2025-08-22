
import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Shield, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'

interface SecurityAlertProps {
  onDismiss?: () => void
}

export function SecurityAlert({ onDismiss }: SecurityAlertProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [alertType, setAlertType] = useState<'warning' | 'critical' | 'info'>('info')
  const [alertMessage, setAlertMessage] = useState('')
  const { securityMetrics, getRecentSuspiciousActivity } = useSecurityMonitoring()

  useEffect(() => {
    if (!securityMetrics) return

    const suspiciousActivity = getRecentSuspiciousActivity()
    const recentSuspicious = suspiciousActivity.filter(
      event => new Date(event.created_at) > new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
    )

    if (recentSuspicious.length > 0) {
      setAlertType('critical')
      setAlertMessage(`${recentSuspicious.length} suspicious security events detected in the last 30 minutes`)
      setIsVisible(true)
    } else if (securityMetrics.securityScore < 70) {
      setAlertType('warning')
      setAlertMessage(`Security score is ${securityMetrics.securityScore}/100. Review security dashboard for details.`)
      setIsVisible(true)
    } else if (securityMetrics.failed_logins_1h > 5) {
      setAlertType('warning')
      setAlertMessage(`${securityMetrics.failed_logins_1h} failed login attempts in the last hour`)
      setIsVisible(true)
    }
  }, [securityMetrics, getRecentSuspiciousActivity])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <Alert variant={alertType === 'critical' ? 'destructive' : 'default'} className="mb-4">
      <div className="flex items-start gap-2">
        {alertType === 'critical' ? (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        ) : (
          <Shield className="h-4 w-4" />
        )}
        <div className="flex-1">
          <AlertDescription>{alertMessage}</AlertDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-auto p-1">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}
