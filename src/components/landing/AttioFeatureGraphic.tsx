import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Database, Workflow, KanbanSquare, Gauge, BarChart3 } from "lucide-react";

// Attio-style feature stories: sticky left copy + horizontal snap gallery
// Lightweight, no external carousel deps. Uses design tokens only.

type Story = {
  id: string
  title: string
  blurb: string
  icon: React.ComponentType<{ className?: string }>
};

const stories: Story[] = [
  {
    id: "data",
    title: "Unified Data",
    blurb: "Bring customer data into a single, trustworthy view with flexible fields and fast search.",
    icon: Database,
  },
  {
    id: "automations",
    title: "Powerful Automations",
    blurb: "Trigger multi‑step workflows that keep teams in sync without manual effort.",
    icon: Workflow,
  },
  {
    id: "pipeline",
    title: "Crystal‑clear Pipeline",
    blurb: "Visualize stages and priorities to move deals forward with zero guesswork.",
    icon: KanbanSquare,
  },
  {
    id: "productivity",
    title: "Team Productivity",
    blurb: "Inbox, notes, tasks and mentions—everything your team needs to move fast.",
    icon: Gauge,
  },
  {
    id: "reporting",
    title: "Real‑time Reporting",
    blurb: "Answer strategic questions with live dashboards and shareable KPIs.",
    icon: BarChart3,
  },
];

export function AttioFeatureGraphic() {
  const [active, setActive] = useState<string>(stories[0].id)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useMemo(() => new Map<string, HTMLElement | null>(), [])

  // Scroll to a specific card when a pill is clicked
  const handleSelect = (id: string) => {
    setActive(id)
    const el = cardRefs.get(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" as any })
    }
  }

  // Observe scroll to update the active pill based on the card closest to center
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onScroll = () => {
      const { scrollLeft, clientWidth } = scroller
      const center = scrollLeft + clientWidth / 2

      let bestId = active
      let bestDist = Number.POSITIVE_INFINITY
      stories.forEach((s) => {
        const node = cardRefs.get(s.id)
        if (!node) return
        const box = node.offsetLeft + node.offsetWidth / 2
        const dist = Math.abs(box - center)
        if (dist < bestDist) {
          bestDist = dist
          bestId = s.id
        }
      })
      if (bestId !== active) setActive(bestId)
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })
    return () => scroller.removeEventListener("scroll", onScroll)
  }, [active, cardRefs])

  return (
    <section aria-label="Product feature stories" className="relative bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left sticky copy */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <header>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                See FeatherBiz in action
              </h2>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-prose">
                Explore how the platform adapts to your workflow. Scroll the gallery or choose a category.
              </p>
            </header>

            {/* Pills */}
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Feature categories">
              {stories.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === s.id}
                  onClick={() => handleSelect(s.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    active === s.id
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/40 border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  <s.icon className="h-4 w-4" />
                  {s.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Right horizontal gallery */}
          <div className="lg:col-span-7">
            <div
              ref={scrollerRef}
              className={cn(
                "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              )}
              aria-label="Feature story gallery"
            >
              {stories.map((s, idx) => (
                <article
                  key={s.id}
                  ref={(el) => cardRefs.set(s.id, el)}
                  className={cn(
                    "snap-center shrink-0 w-[85%] sm:w-[70%] lg:w-[560px]",
                    "rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden"
                  )}
                  aria-labelledby={`story-${s.id}-title`}
                >
                  {/* Visual placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/15 via-primary/10 to-transparent">
                    {/* layered decorative shapes */}
                    <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

                    <div className="absolute inset-0 grid place-items-center">
                      <div className="flex items-center gap-3 rounded-xl border bg-background/70 backdrop-blur-sm px-4 py-2 shadow-sm">
                        <s.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground/90">{s.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="p-5">
                    <h3 id={`story-${s.id}-title`} className="text-base font-medium tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Dots */}
            <div className="mt-2 flex items-center gap-2">
              {stories.map((s) => (
                <span
                  key={`dot-${s.id}`}
                  aria-hidden
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-colors",
                    active === s.id ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AttioFeatureGraphic;
