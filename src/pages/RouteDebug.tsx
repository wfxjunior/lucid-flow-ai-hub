
import { useEffect } from 'react';

export default function RouteDebug() {
  useEffect(() => {
    document.title = 'Route Debug';
  }, []);

  const routeData = {
    routes: [
      { path: '/', guarded: false, component: 'LandingPage' },
      { path: '/pricing', guarded: false, component: 'Pricing' },
      { path: '/blog', guarded: false, component: 'BlogIndex' },
      { path: '/blog/:slug', guarded: false, component: 'BlogPost' },
      { path: '/payment-success', guarded: false, component: 'PaymentSuccess' },
      { path: '/payment-canceled', guarded: false, component: 'PaymentCanceled' },
      { path: '/health', guarded: false, component: 'HealthCheck' },
      { path: '/_debug/routes', guarded: false, component: 'RouteDebug' },
      { path: '/dashboard', guarded: true, component: 'Index' },
      { path: '/checkout/success', guarded: true, component: 'CheckoutSuccess' },
      { path: '/pricing/test-checkout', guarded: true, component: 'TestCheckout' }
    ],
    currentPath: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <pre>{JSON.stringify(routeData, null, 2)}</pre>
    </div>
  );
}
