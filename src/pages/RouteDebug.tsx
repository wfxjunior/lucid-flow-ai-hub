
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/routeInventory';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ArrowLeft } from 'lucide-react';

export default function RouteDebug() {
  useEffect(() => {
    document.title = 'Route Debug - FeatherBiz';
  }, []);

  const routeData = {
    routes: ROUTES.map(route => ({
      path: route.path,
      guard: route.guard,
      component: route.component,
      description: route.description
    })),
    currentPath: window.location.pathname,
    currentSearch: window.location.search,
    currentHash: window.location.hash,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    totalRoutes: ROUTES.length,
    routesByGuard: {
      public: ROUTES.filter(r => r.guard === 'public').length,
      'public-auth': ROUTES.filter(r => r.guard === 'public-auth').length,
      'auth-free': ROUTES.filter(r => r.guard === 'auth-free').length,
      'auth-paid': ROUTES.filter(r => r.guard === 'auth-paid').length
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Route Debug Information</h1>
          <p className="text-muted-foreground">Raw route data for debugging purposes</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/_debug/diagnostics">
              <ExternalLink className="h-4 w-4 mr-2" />
              Full Diagnostics
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Location</CardTitle>
            <CardDescription>Information about the current page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Path:</strong> {routeData.currentPath}</div>
              <div><strong>Search:</strong> {routeData.currentSearch || 'None'}</div>
              <div><strong>Hash:</strong> {routeData.currentHash || 'None'}</div>
              <div><strong>Timestamp:</strong> {routeData.timestamp}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Statistics</CardTitle>
            <CardDescription>Overview of route distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Total Routes:</strong> {routeData.totalRoutes}</div>
              <div><strong>Public:</strong> {routeData.routesByGuard.public}</div>
              <div><strong>Public Auth:</strong> {routeData.routesByGuard['public-auth']}</div>
              <div><strong>Auth Free:</strong> {routeData.routesByGuard['auth-free']}</div>
              <div><strong>Auth Paid:</strong> {routeData.routesByGuard['auth-paid']}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Raw Route Data</CardTitle>
          <CardDescription>Complete route configuration (JSON format)</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(routeData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
