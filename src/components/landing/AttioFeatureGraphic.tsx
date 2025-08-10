import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, Gauge, BarChart3, Cog, FileText } from "lucide-react";

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
    id: "core-business",
    title: "Core Business",
    blurb: "Customers, quotes, invoices — your essential flows in one place.",
    icon: Briefcase,
  },
  {
    id: "productivity",
    title: "Productivity",
    blurb: "Tasks, notes, mentions and shortcuts to keep teams moving.",
    icon: Gauge,
  },
  {
    id: "reporting",
    title: "Reporting",
    blurb: "Live dashboards and KPIs that answer real questions fast.",
    icon: BarChart3,
  },
  {
    id: "operations",
    title: "Operations",
    blurb: "Projects and processes that run reliably at scale.",
    icon: Cog,
  },
  {
    id: "forms",
    title: "Forms",
    blurb: "Collect structured data with simple, flexible forms.",
    icon: FileText,
  },
];

export function AttioFeatureGraphic() {
  return (
    <section aria-label="Essential capabilities" className="relative bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
        <header className="max-w-2xl mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Essential Capabilities
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Small, focused modules with a clean visual style.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {stories.map((s) => (
            <article
              key={s.id}
              className={cn(
                "rounded-xl border bg-card/60 hover:bg-card transition-colors",
                "shadow-sm hover:shadow p-4"
              )}
              aria-label={s.title}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 grid place-items-center rounded-lg bg-muted/60 text-muted-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-foreground">{s.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AttioFeatureGraphic;
