
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, type RouteInfo, GUARD_DESCRIPTIONS } from '@/utils/routeInventory';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export default function RouteDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthState();
  const { isSubscribed } = useSubscription();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Route Diagnostics - FeatherBiz';
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setLoading(true);
    const results: RouteInfo[] = [];

    for (const route of ROUTES) {
      const result: RouteInfo = { ...route };
      
      try {
        // Check if route exists by attempting navigation simulation
        const issues: string[] = [];
        
        // Analyze guard requirements vs current user state
        const currentGuard = analyzeCurrentGuard(route.path, user, isSubscribed);
        result.guardActual = currentGuard;
        
        if (currentGuard !== route.guard) {
          issues.push(`Guard mismatch: expected ${route.guard}, got ${currentGuard}`);
        }

        // Check component existence (simplified check)
        result.exists = checkComponentExists(route.component);
        if (!result.exists) {
          issues.push(`Component ${route.component} not found`);
        }

        result.issues = issues;
        result.statusCode = issues.length > 0 ? 500 : 200;
      } catch (error) {
        result.exists = false;
        result.statusCode = 404;
        result.issues = [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`];
      }

      results.push(result);
    }

    setDiagnostics(results);
    setLoading(false);
  };

  const analyzeCurrentGuard = (path: string, user: any, isSubscribed: boolean): string => {
    // Analyze what guard is currently applied based on path and auth state
    if (path.startsWith('/dashboard') && path.includes('/team|/automation|/workflows')) {
      return user && isSubscribed ? 'auth-paid' : 'auth-free';
    }
    if (path.startsWith('/dashboard')) {
      return user ? 'auth-free' : 'public';
    }
    if (['/login', '/signup', '/auth', '/forgot-password', '/reset-password', '/verify-email'].includes(path)) {
      return 'public-auth';
    }
    return 'public';
  };

  const checkComponentExists = (componentName: string): boolean => {
    // Simplified component existence check
    const existingComponents = [
      'LandingPage', 'Pricing', 'Auth', 'Index', 'PaymentSuccess', 'PaymentCanceled',
      'HealthCheck', 'RouteDebug', 'CheckoutSuccess', 'AIVoiceFeature', 'InvoicesFeature',
      'EstimatesFeature', 'EasyCalcFeature', 'PipelineFeature', 'FeatherTaxFeature', 'WorkOrdersFeature'
    ];
    return existingComponents.includes(componentName);
  };

  const getStatusIcon = (route: RouteInfo) => {
    if (route.issues && route.issues.length > 0) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    if (route.exists) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getGuardBadgeColor = (guard: string, actual?: string) => {
    if (actual && guard !== actual) return 'destructive';
    switch (guard) {
      case 'public': return 'secondary';
      case 'public-auth': return 'outline';
      case 'auth-free': return 'default';
      case 'auth-paid': return 'destructive';
      default: return 'secondary';
    }
  };

  const summary = {
    total: diagnostics.length,
    healthy: diagnostics.filter(r => !r.issues || r.issues.length === 0).length,
    issues: diagnostics.filter(r => r.issues && r.issues.length > 0).length,
    missing: diagnostics.filter(r => !r.exists).length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Route Diagnostics</h1>
          <p className="text-muted-foreground">Platform-wide route audit and health check</p>
        </div>
        <Button onClick={runDiagnostics} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Healthy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summary.healthy}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summary.issues}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{summary.missing}</div>
          </CardContent>
        </Card>
      </div>

      {/* Guard Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Guard Reference</CardTitle>
          <CardDescription>Authentication guard types and their requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(GUARD_DESCRIPTIONS).map(([guard, description]) => (
              <div key={guard} className="flex items-center space-x-2">
                <Badge variant={getGuardBadgeColor(guard)}>{guard}</Badge>
                <span className="text-sm text-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Details */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Detailed analysis of each route</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Running diagnostics...</p>
              </div>
            ) : (
              diagnostics.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(route)}
                    <div>
                      <div className="font-medium">{route.path}</div>
                      <div className="text-sm text-muted-foreground">{route.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getGuardBadgeColor(route.guard, route.guardActual)}>
                      {route.guard}
                    </Badge>
                    {route.guardActual && route.guardActual !== route.guard && (
                      <Badge variant="outline">actual: {route.guardActual}</Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{route.component}</span>
                    {route.issues && route.issues.length > 0 && (
                      <div className="text-xs text-red-600 max-w-xs truncate">
                        {route.issues.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Location Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div><strong>Path:</strong> {location.pathname}</div>
            <div><strong>Search:</strong> {location.search || 'None'}</div>
            <div><strong>Hash:</strong> {location.hash || 'None'}</div>
            <div><strong>User:</strong> {user ? `Authenticated (${user.email})` : 'Not authenticated'}</div>
            <div><strong>Subscription:</strong> {isSubscribed ? 'Active' : 'Free/None'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
