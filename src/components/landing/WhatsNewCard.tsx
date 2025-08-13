import React, { useEffect, useMemo, useRef } from 'react'
import { track } from '@/lib/analytics'

interface WhatsNewCardProps {
  menuId: 'header_megamenu_platform' | 'header_megamenu_resources' | 'header_megamenu_customers'
  locale?: string
  title?: string
  description?: string
}

export function WhatsNewCard({ menuId, locale, title = "What's new", description = 'Fresh updates to help you move faster' }: WhatsNewCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const hasViewed = useRef(false)
  const lang = useMemo(() => locale || (typeof navigator !== 'undefined' ? navigator.language : 'en'), [locale])

  useEffect(() => {
    if (!ref.current || hasViewed.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasViewed.current) {
            hasViewed.current = true
            track('nav_whatsnew_view', { menu_id: menuId, locale: lang })
          }
        })
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lang, menuId])

  return (
    <div ref={ref} className="group rounded-lg border border-border/60 bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative w-full h-[160px] md:h-[180px]">
        {/* Radial grid background - proprietary, very subtle */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'repeating-radial-gradient(circle at 60% 40%, hsl(var(--foreground)/0.04) 0px, hsl(var(--foreground)/0.04) 1px, transparent 1px, transparent 8px)'
          }}
        />
        {/* Mini window with animated rounded bars */}
        <div className="absolute left-4 top-4 right-4 bottom-6 rounded-md border border-border/60 bg-background/70 backdrop-blur-sm shadow-sm overflow-hidden ring-1 ring-primary/10">
          <div className="h-6 border-b border-border/60 bg-muted/50" />
          <div className="p-4 space-y-3">
            <div className="h-2.5 rounded-full bg-primary/20 origin-left wn-grow" />
            <div className="h-2.5 rounded-full bg-primary/30 origin-left wn-grow [animation-delay:120ms]" />
            <div className="h-2.5 rounded-full bg-primary/40 origin-left wn-grow [animation-delay:240ms]" />
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
      </div>
      <style>{`
        @keyframes wn-grow { from { transform: scaleX(1);} to { transform: scaleX(1.12);} }
        .wn-grow { animation: wn-grow 600ms ease-in-out infinite alternate; }
      `}</style>
    </div>
  )
}
