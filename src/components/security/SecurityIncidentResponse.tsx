
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Shield, Zap } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { securityEvent, secureError } from '@/utils/security'
import { useUserRole } from '@/hooks/useUserRole'

export function SecurityIncidentResponse() {
  const [isLockdownActive, setIsLockdownActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isAdmin } = useUserRole()

  if (!isAdmin) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Access denied. Admin privileges required for incident response.
        </AlertDescription>
      </Alert>
    )
  }

  const triggerEmergencyLockdown = async () => {
    if (!confirm('Are you sure you want to trigger emergency security lockdown? This is irreversible and should only be used during active security incidents.')) {
      return
    }

    setLoading(true)
    try {
      // Call the emergency lockdown function
      const { error } = await supabase.rpc('emergency_security_lockdown')
      
      if (error) {
        secureError('Emergency lockdown failed', { error: error.message })
        throw error
      }

      setIsLockdownActive(true)
      securityEvent('Emergency security lockdown activated', {
        triggeredBy: 'admin_manual',
        timestamp: new Date().toISOString()
      })
      
      alert('Emergency security lockdown has been activated. All suspicious activities will be logged and monitored.')
    } catch (error) {
      secureError('Failed to trigger emergency lockdown', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
      alert('Failed to activate emergency lockdown. Please check the logs.')
    } finally {
      setLoading(false)
    }
  }

  const runSecurityDiagnostics = async () => {
    setLoading(true)
    try {
      // Run comprehensive security checks
      const { data: securityStatus, error } = await supabase.rpc('get_security_status')
      
      if (error) {
        throw error
      }

      // Log the diagnostics results
      securityEvent('Security diagnostics completed', {
        results: securityStatus,
        timestamp: new Date().toISOString()
      })

      const failedChecks = securityStatus?.filter((check: any) => check.status === 'FAIL') || []
      
      if (failedChecks.length > 0) {
        alert(`Security diagnostics completed. ${failedChecks.length} issues found. Check the security logs for details.`)
      } else {
        alert('Security diagnostics completed successfully. All security checks passed.')
      }
    } catch (error) {
      secureError('Security diagnostics failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
      alert('Failed to run security diagnostics. Please check the logs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Security Incident Response</span>
          </CardTitle>
          <CardDescription>
            Emergency security controls for incident response and threat mitigation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLockdownActive && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Emergency security lockdown is currently active. All activities are being monitored.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={triggerEmergencyLockdown}
              disabled={loading || isLockdownActive}
              variant="destructive"
              className="h-20"
            >
              <div className="text-center">
                <Zap className="h-6 w-6 mx-auto mb-2" />
                <div>Emergency Lockdown</div>
                <div className="text-xs opacity-75">Activate during security incidents</div>
              </div>
            </Button>

            <Button
              onClick={runSecurityDiagnostics}
              disabled={loading}
              variant="outline"
              className="h-20"
            >
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2" />
                <div>Run Diagnostics</div>
                <div className="text-xs opacity-75">Check system security status</div>
              </div>
            </Button>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> These are emergency security controls. Only use during confirmed security incidents. 
              All actions are logged and monitored.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
