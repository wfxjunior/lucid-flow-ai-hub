
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, Eye, Activity, RefreshCw } from 'lucide-react'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'
import { formatDistanceToNow } from 'date-fns'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function SecurityMonitoringDashboard() {
  const {
    securityMetrics,
    securityEvents,
    loading,
    error,
    isAdmin,
    getRecentSuspiciousActivity,
    refreshMetrics
  } = useSecurityMonitoring()

  if (!isAdmin) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Access denied. Admin privileges required to view security monitoring dashboard.
        </AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading security metrics...</span>
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
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Security Monitoring</h2>
        <Button onClick={refreshMetrics} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}/100
            </div>
            <p className="text-xs text-muted-foreground">
              Overall security health
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityMetrics?.total_events_24h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Total security events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {securityMetrics?.suspicious_events_24h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Suspicious activities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins (1h)</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {securityMetrics?.failed_logins_1h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Authentication failures
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Suspicious Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Activity</CardTitle>
          <CardDescription>
            Security events that require attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {suspiciousActivity.length === 0 ? (
            <p className="text-muted-foreground">No suspicious activity detected recently.</p>
          ) : (
            <div className="space-y-3">
              {suspiciousActivity.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="font-medium">{event.operation}</p>
                      <p className="text-sm text-muted-foreground">
                        Table: {event.table_name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>
            Latest security-related activities in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {securityEvents.length === 0 ? (
            <p className="text-muted-foreground">No recent security events.</p>
          ) : (
            <div className="space-y-3">
              {securityEvents.slice(0, 15).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">{event.operation}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.table_name} {event.record_id && `• ID: ${event.record_id.substring(0, 8)}...`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">
                      {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
