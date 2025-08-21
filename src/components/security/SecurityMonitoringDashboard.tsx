
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, Activity, Users, RefreshCw } from 'lucide-react'
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring'

interface SecurityMetrics {
  total_events_24h: number
  suspicious_events_24h: number
  failed_logins_1h: number
  admin_actions_24h: number
  last_updated: string
}

export function SecurityMonitoringDashboard() {
  const { securityMetrics, loading, refreshMetrics, isAdmin } = useSecurityMonitoring()
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (!autoRefresh || !isAdmin) return

    const interval = setInterval(() => {
      refreshMetrics()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, isAdmin, refreshMetrics])

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground">Admin privileges required to view security metrics.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getSecurityScore = (metrics: SecurityMetrics | null) => {
    if (!metrics) return 0
    
    const base = 100
    const suspiciousPenalty = Math.min(metrics.suspicious_events_24h * 5, 50)
    const failedLoginPenalty = Math.min(metrics.failed_logins_1h * 10, 30)
    
    return Math.max(0, base - suspiciousPenalty - failedLoginPenalty)
  }

  const securityScore = getSecurityScore(securityMetrics)
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Security Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time security metrics and threat detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshMetrics}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <Activity className="h-4 w-4 mr-2" />
            {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
          </Button>
        </div>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Score
          </CardTitle>
          <CardDescription>
            Overall security health based on recent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}
            </div>
            <div className="flex-1">
              <Badge variant={getScoreBadgeVariant(securityScore)}>
                {securityScore >= 80 ? 'Excellent' : 
                 securityScore >= 60 ? 'Good' : 'Needs Attention'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {securityMetrics?.last_updated ? 
                  new Date(securityMetrics.last_updated).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {securityMetrics && securityMetrics.suspicious_events_24h > 10 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>High Suspicious Activity Detected</AlertTitle>
          <AlertDescription>
            {securityMetrics.suspicious_events_24h} suspicious events in the last 24 hours. 
            Please review security logs immediately.
          </AlertDescription>
        </Alert>
      )}

      {securityMetrics && securityMetrics.failed_logins_1h > 5 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Multiple Failed Login Attempts</AlertTitle>
          <AlertDescription>
            {securityMetrics.failed_logins_1h} failed login attempts in the last hour. 
            Consider implementing additional security measures.
          </AlertDescription>
        </Alert>
      )}

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityMetrics?.total_events_24h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              All security events logged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Events (24h)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {securityMetrics?.suspicious_events_24h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Rate limits, invalid sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins (1h)</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {securityMetrics?.failed_logins_1h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Authentication failures
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Actions (24h)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityMetrics?.admin_actions_24h || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Administrative operations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity (placeholder for future enhancement) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>
            Latest security-related activities and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <p>Security event details will be displayed here</p>
            <p className="text-sm">Feature coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
