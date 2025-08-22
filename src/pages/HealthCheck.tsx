
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Database, Shield, Zap } from 'lucide-react';

interface HealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime?: number;
  error?: string;
  details?: Record<string, any>;
}

export default function HealthCheck() {
  const [healthData, setHealthData] = useState<HealthStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Health Check - FeatherBiz';
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setLoading(true);
    const checks: HealthStatus[] = [];

    // Supabase Database Check
    try {
      const start = Date.now();
      const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
      const responseTime = Date.now() - start;
      
      checks.push({
        service: 'Supabase Database',
        status: error ? 'down' : 'healthy',
        responseTime,
        error: error?.message,
        details: { query: 'SELECT count FROM user_profiles LIMIT 1' }
      });
    } catch (error) {
      checks.push({
        service: 'Supabase Database',
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Supabase Auth Check
    try {
      const start = Date.now();
      const { data, error } = await supabase.auth.getSession();
      const responseTime = Date.now() - start;
      
      checks.push({
        service: 'Supabase Auth',
        status: error ? 'degraded' : 'healthy',
        responseTime,
        error: error?.message,
        details: { hasSession: !!data.session }
      });
    } catch (error) {
      checks.push({
        service: 'Supabase Auth',
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Browser Environment Check
    checks.push({
      service: 'Browser Environment',
      status: 'healthy',
      details: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        online: navigator.onLine,
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined'
      }
    });

    // Application State Check
    const appState = {
      route: window.location.pathname,
      origin: window.location.origin,
      timestamp: new Date().toISOString(),
      buildMode: import.meta.env.MODE,
      reactVersion: '18.3.1' // from package.json
    };

    checks.push({
      service: 'Application State',
      status: 'healthy',
      details: appState
    });

    setHealthData(checks);
    setLoading(false);
  };

  const getStatusIcon = (status: HealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getServiceIcon = (service: string) => {
    if (service.includes('Database')) return <Database className="h-5 w-5" />;
    if (service.includes('Auth')) return <Shield className="h-5 w-5" />;
    return <Zap className="h-5 w-5" />;
  };

  const getStatusBadge = (status: HealthStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'down':
        return <Badge className="bg-red-100 text-red-800">Down</Badge>;
    }
  };

  const overallStatus = healthData.every(h => h.status === 'healthy') 
    ? 'healthy' 
    : healthData.some(h => h.status === 'down') 
    ? 'down' 
    : 'degraded';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">System Health Check</h1>
        <p className="text-muted-foreground">Real-time status of FeatherBiz services</p>
        
        <div className="flex items-center justify-center mt-4 space-x-2">
          {getStatusIcon(overallStatus)}
          <span className="text-xl font-semibold">Overall Status: </span>
          {getStatusBadge(overallStatus)}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Running health checks...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {healthData.map((health, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getServiceIcon(health.service)}
                    <CardTitle>{health.service}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {health.responseTime && (
                      <span className="text-sm text-muted-foreground">
                        {health.responseTime}ms
                      </span>
                    )}
                    {getStatusBadge(health.status)}
                  </div>
                </div>
                {health.error && (
                  <CardDescription className="text-red-600">
                    Error: {health.error}
                  </CardDescription>
                )}
              </CardHeader>
              
              {health.details && (
                <CardContent>
                  <div className="bg-muted p-3 rounded text-sm">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(health.details, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleString()}</p>
        <p>Environment: {import.meta.env.MODE}</p>
      </div>
    </div>
  );
}
