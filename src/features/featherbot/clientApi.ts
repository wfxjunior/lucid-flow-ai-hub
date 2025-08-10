// FeatherBot Client API: lightweight helpers exposed globally for the bot and tours
// Keep minimal, no external deps

// Types are intentionally broad to avoid leaking into app types
export function initFeatherBotClientAPI() {
  const w = window as any

  if (w.__featherBotAPIInitialized) return

  // Map simple page ids to routes
  const pageRouteMap: Record<string, string> = {
    dashboard: '/',
    invoices: '/?view=invoices',
    estimates: '/?view=estimates',
    email_center: '/?view=email',
    payments: '/?view=payments',
    notifications: '/?view=notifications',
    support: '/?view=support',
    settings: '/?view=settings',
  }

  const spotlight = (selector: string, opts?: { mask?: boolean; margin?: number; durationMs?: number }) => {
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return false

    const duration = opts?.durationMs ?? 2000
    const originalZ = el.style.zIndex
    el.style.zIndex = '9999'
    el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'rounded-md', 'transition-all')

    let maskEl: HTMLDivElement | null = null
    if (opts?.mask) {
      maskEl = document.createElement('div')
      maskEl.style.position = 'fixed'
      maskEl.style.inset = '0'
      maskEl.style.background = 'rgba(0,0,0,0.5)'
      maskEl.style.zIndex = '9998'
      maskEl.style.pointerEvents = 'none'
      document.body.appendChild(maskEl)
    }

    setTimeout(() => {
      el.style.zIndex = originalZ
      el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'rounded-md', 'transition-all')
      if (maskEl && maskEl.parentNode) maskEl.parentNode.removeChild(maskEl)
    }, duration)

    return true
  }

  const showTooltip = (selector: string, text: string, placement: 'top'|'right'|'bottom'|'left' = 'top', durationMs = 2500) => {
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return false

    const tip = document.createElement('div')
    tip.textContent = text
    tip.style.position = 'absolute'
    tip.style.zIndex = '10000'
    tip.style.padding = '6px 8px'
    tip.style.borderRadius = '6px'
    tip.style.fontSize = '12px'
    tip.style.color = 'white'
    tip.style.background = 'rgba(0,0,0,0.8)'
    tip.style.pointerEvents = 'none'

    const rect = el.getBoundingClientRect()
    const pad = 8
    switch (placement) {
      case 'top':
        tip.style.left = `${rect.left + rect.width / 2}px`
        tip.style.top = `${rect.top - pad}px`
        tip.style.transform = 'translate(-50%, -100%)'
        break
      case 'right':
        tip.style.left = `${rect.right + pad}px`
        tip.style.top = `${rect.top + rect.height / 2}px`
        tip.style.transform = 'translate(0, -50%)'
        break
      case 'bottom':
        tip.style.left = `${rect.left + rect.width / 2}px`
        tip.style.top = `${rect.bottom + pad}px`
        tip.style.transform = 'translate(-50%, 0)'
        break
      case 'left':
        tip.style.left = `${rect.left - pad}px`
        tip.style.top = `${rect.top + rect.height / 2}px`
        tip.style.transform = 'translate(-100%, -50%)'
        break
    }

    document.body.appendChild(tip)
    setTimeout(() => tip.remove(), durationMs)
    return true
  }

  const linkTo = (pageId: string, params?: Record<string, string>) => {
    const base = pageRouteMap[pageId] || '/'
    if (!params) {
      window.location.assign(base)
      return
    }
    const url = new URL(window.location.origin + base)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    window.location.assign(url.toString())
  }

  const openComparePlans = () => window.location.assign('/pricing')
  const openCheckout = (planId?: string) => {
    const url = planId ? `/auth?plan=${encodeURIComponent(planId)}` : '/auth'
    window.location.assign(url)
  }

  const createTicket = (subject: string, body: string, includeTranscript = true) => {
    const text = `Subject: ${subject}\n\n${body}${includeTranscript ? '\n\n(Transcript attached)' : ''}`
    window.open(`mailto:hello@featherbiz.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`)
    return true
  }

  // Minimal tour dispatcher (real UI can be added later)
  const openTour = (tourId: string) => {
    window.dispatchEvent(new CustomEvent('featherbot:openTour', { detail: { tourId } }))
  }

  w.featherBotAPI = {
    spotlight,
    showTooltip,
    linkTo,
    openComparePlans,
    openCheckout,
    openTour,
    createTicket,
  }

  w.__featherBotAPIInitialized = true
}
