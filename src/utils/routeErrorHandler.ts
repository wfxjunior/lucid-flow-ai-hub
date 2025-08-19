
// Global route error handler
export const initRouteErrorHandler = () => {
  // Capture route loading errors
  window.addEventListener('error', (event) => {
    const error = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      route: window.location.pathname,
      timestamp: new Date().toISOString()
    }
    
    // Store for debugging
    if (typeof window !== 'undefined') {
      (window as any).__routeError = error
    }
    
    console.error('Route loading error:', error)
    
    // Don't show login modal on public pages
    const publicRoutes = ['/', '/pricing', '/contact', '/about', '/blog']
    const isPublicRoute = publicRoutes.includes(window.location.pathname) || 
                         window.location.pathname.startsWith('/blog/')
    
    if (isPublicRoute) {
      console.log('Error on public route - not showing login modal')
    }
  })
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = {
      reason: event.reason,
      route: window.location.pathname,
      timestamp: new Date().toISOString()
    }
    
    if (typeof window !== 'undefined') {
      (window as any).__routeError = error
    }
    
    console.error('Unhandled promise rejection on route:', error)
  })
}
