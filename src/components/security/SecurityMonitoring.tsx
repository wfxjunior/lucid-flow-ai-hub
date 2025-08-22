
import { useEffect, useState } from 'react'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'
import { useUserRole } from '@/hooks/useUserRole'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Shield, Activity, Users, Database, Clock } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function SecurityMonitoring() {
  const { isAdmin } = useUserRole()
  const {
    securityMetrics,
    securityEvents,
    loading,
    error,
    refreshMetrics,
    getRecentSuspiciousActivity
  } = useSecurityMonitoring()

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Access Denied</h3>
        <p className="text-muted-foreground">Admin privileges required to view security monitoring</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading security metrics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  const suspiciousActivity = getRecentSuspiciousActivity()
  const securityScore = securityMetrics?.securityScore || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Monitoring</h2>
          <p className="text-muted-foreground">Monitor system security and suspicious activities</p>
        </div>
        <Button onClick={refreshMetrics} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </CardTitle>
          <CardDescription>Overall system security health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">
              {securityScore}/100
            </div>
            <Badge variant={securityScore >= 80 ? 'default' : securityScore >= 60 ? 'secondary' : 'destructive'}>
              {securityScore >= 80 ? 'Good' : securityScore >= 60 ? 'Fair' : 'Poor'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Security Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Events (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics?.total_events_24h || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Suspicious (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {securityMetrics?.suspicious_events_24h || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Failed Logins (1h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics?.failed_logins_1h || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Admin Actions (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics?.admin_actions_24h || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Suspicious Activity */}
      {suspiciousActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Suspicious Activity
            </CardTitle>
            <CardDescription>Security events that require attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suspiciousActivity.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive" className="text-xs">
                        {event.operation}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(event.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Table: {event.table_name} | Record: {event.record_id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest system security activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {securityEvents.slice(0, 10).map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-2 rounded border">
                <Badge variant="outline" className="text-xs">
                  {event.operation}
                </Badge>
                <span className="text-sm flex-1">{event.table_name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(event.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
