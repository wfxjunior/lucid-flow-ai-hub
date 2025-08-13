export type AnalyticsEvent =
  | 'nav_megamenu_open'
  | 'nav_megamenu_click'
  | 'nav_whatsnew_view'
  | 'nav_whatsnew_click'

export function track(event: AnalyticsEvent, payload: Record<string, any> = {}) {
  try {
    // Basic console logging for visibility during development
    // eslint-disable-next-line no-console
    console.log('[analytics]', event, payload)
    // Dispatch a browser event for any listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('analytics', { detail: { event, payload } }))
    }
  } catch {
    // noop
  }
}
