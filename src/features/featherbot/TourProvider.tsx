import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'

type TourStep = {
  selector: string
  title: string
  body: string
  nextLabel?: string
  prevLabel?: string
}

type ToursMap = Record<string, TourStep[]>

const TOURS: ToursMap = {
  invoices_basics: [
    { selector: '[data-kb-id="invoices.create"]', title: 'Create an invoice', body: 'Click Create → fill items and customer.' },
    { selector: '[data-kb-id="invoices.preview"]', title: 'Preview', body: 'Use Preview to review PDF before sending.' },
    { selector: '[data-kb-id="invoices.send"]', title: 'Send', body: 'Send the invoice to your client via email.' },
    { selector: '[data-kb-id="invoices.track"]', title: 'Track status', body: 'Track views and payments here.' },
  ],
  estimates_esign: [
    { selector: '[data-kb-id="estimates.create"]', title: 'Create estimate', body: 'Start a new estimate for your client.' },
    { selector: '[data-kb-id="esign.signnow.send_invite"]', title: 'Send for e-sign', body: 'Send with SignNow for approval.' },
    { selector: '[data-kb-id="estimates.timeline"]', title: 'View timeline', body: 'See status updates and signatures.' },
  ],
  email_center_setup: [
    { selector: '[data-kb-id="email.sendgrid.verify_sender"]', title: 'Verify sender', body: 'Verify a sender identity with SendGrid.' },
    { selector: '[data-kb-id="email.compose"]', title: 'Compose', body: 'Write your first email to a contact.' },
    { selector: '[data-kb-id="email.logs"]', title: 'View logs', body: 'Check deliveries and opens in logs.' },
  ],
  payments_stripe: [
    { selector: '[data-kb-id="payments.checkout"]', title: 'Open Checkout', body: 'Open a Stripe Checkout session.' },
    { selector: '[data-kb-id="payments.prices"]', title: 'Update prices', body: 'Adjust prices for your products.' },
    { selector: '[data-kb-id="payments.test"]', title: 'Test payment', body: 'Use test cards to simulate payments.' },
    { selector: '[data-kb-id="payments.receipts"]', title: 'Receipts', body: 'Find customer receipts here.' },
  ],
  notifications_twilio: [
    { selector: '[data-kb-id="notifications.twilio.add_number"]', title: 'Add number', body: 'Connect a Twilio phone number.' },
    { selector: '[data-kb-id="notifications.twilio.template"]', title: 'Template', body: 'Create an SMS template.' },
    { selector: '[data-kb-id="notifications.twilio.test"]', title: 'Test SMS', body: 'Send a test message to yourself.' },
  ],
  support_zendesk: [
    { selector: '[data-kb-id="support.zendesk.widget"]', title: 'Open widget', body: 'Open the Zendesk widget.' },
    { selector: '[data-kb-id="support.zendesk.search"]', title: 'Search article', body: 'Search the help center.' },
    { selector: '[data-kb-id="support.zendesk.ticket"]', title: 'Create ticket', body: 'Create a support ticket.' },
  ],
  settings_security: [
    { selector: '[data-kb-id="settings.security.2fa"]', title: 'Enable 2FA', body: 'Enable two-factor authentication.' },
    { selector: '[data-kb-id="settings.security.roles"]', title: 'Roles', body: 'Manage user roles and permissions.' },
    { selector: '[data-kb-id="settings.security.export"]', title: 'Export data', body: 'Export your account data.' },
  ],
}

export function TourProvider() {
  const [open, setOpen] = useState(false)
  const [tourId, setTourId] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)

  const steps = tourId ? TOURS[tourId] || [] : []
  const step = steps[stepIndex]

  useEffect(() => {
    const handler = (e: Event) => {
      const { tourId } = (e as CustomEvent).detail || {}
      if (tourId && TOURS[tourId]) {
        setTourId(tourId)
        setStepIndex(0)
        setOpen(true)
        ;(window as any).featherBotAPI?.spotlight?.(TOURS[tourId][0].selector, { mask: true })
      }
    }
    window.addEventListener('featherbot:openTour', handler as EventListener)
    return () => window.removeEventListener('featherbot:openTour', handler as EventListener)
  }, [])

  useEffect(() => {
    if (open && step) {
      ;(window as any).featherBotAPI?.spotlight?.(step.selector, { mask: true })
    }
  }, [open, stepIndex, tourId])

  if (!open || !step) return null

  return createPortal(
    <div className="fixed inset-0 z-[10001] pointer-events-none">
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(560px,90vw)] rounded-lg border bg-popover text-popover-foreground shadow-lg pointer-events-auto p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-sm mt-1 text-muted-foreground">{step.body}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Close</Button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={stepIndex === 0}>
            {step.prevLabel || 'Back'}
          </Button>
          <div className="text-xs text-muted-foreground">{stepIndex + 1} / {steps.length}</div>
          {stepIndex < steps.length - 1 ? (
            <Button size="sm" onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}>
              {step.nextLabel || 'Next'}
            </Button>
          ) : (
            <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
