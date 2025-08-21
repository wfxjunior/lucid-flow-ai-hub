
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'
import { DataAccessGuard } from './DataAccessGuard'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Users, Activity } from 'lucide-react'

export function SecurityDashboard() {
  const {
    securityMetrics,
    securityEvents,
    getRecentSuspiciousActivity,
    loading,
    error
  } = useSecurityMonitoring()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-destructive">Failed to load security metrics</p>
      </div>
    )
  }

  const suspiciousActivity = getRecentSuspiciousActivity()
  const recentEvents = securityEvents.slice(0, 10)

  return (
    <DataAccessGuard requiredRole="admin" dataType="security_dashboard">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">Security Dashboard</h1>
        </div>

        {/* Security Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {securityMetrics ? Math.max(0, 100 - (securityMetrics.suspicious_events_24h * 5)) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {securityMetrics?.total_events_24h || 0}
              </div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspicious Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {securityMetrics?.suspicious_events_24h || 0}
              </div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {securityMetrics?.failed_logins_1h || 0}
              </div>
              <p className="text-xs text-muted-foreground">Last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Suspicious Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Suspicious Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {suspiciousActivity.length === 0 ? (
              <p className="text-muted-foreground">No suspicious activity detected.</p>
            ) : (
              <div className="space-y-3">
                {suspiciousActivity.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">{event.operation}</Badge>
                        <span className="text-sm font-medium">{event.table_name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      User: {event.user_id?.slice(0, 8)}...
                    </Badge>
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
          </CardHeader>
          <CardContent>
            {recentEvents.length === 0 ? (
              <p className="text-muted-foreground">No recent events.</p>
            ) : (
              <div className="space-y-2">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 text-sm border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{event.operation}</Badge>
                      <span>{event.table_name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(event.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DataAccessGuard>
  )
}
