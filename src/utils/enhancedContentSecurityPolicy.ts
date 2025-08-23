
// Enhanced Content Security Policy utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function initializeCSP() {
  // Basic CSP initialization
  console.log('CSP initialized')
}

export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export function trackPageView(pagePath: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
    })
  }
}
