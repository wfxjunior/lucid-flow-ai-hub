
import React, { useEffect, useState } from "react";
import { LucideIcon, Users, Workflow, KanbanSquare, CreditCard, Mic, Plug, Shield, BarChart3, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureStories } from "@/components/landing/FeatureStories";




// High‑engagement visual mosaic to replace testimonials
// Keeps the same export/name and anchor id to avoid breaking existing links

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  col?: string; // responsive col span classes
  row?: string; // responsive row span classes
};

const features: Feature[] = [
  {
    id: "crm",
    title: "Smart CRM",
    description: "Visual pipeline, segmentation, and a 360° customer view.",
    icon: Users,
    col: "lg:col-span-2",
    row: "lg:row-span-2",
  },
  {
    id: "automations",
    title: "Automations",
    description: "No‑code flows, triggers, and multichannel actions.",
    icon: Workflow,
  },
  {
    id: "projects",
    title: "Projects",
    description: "Kanban boards, sprints, and clear dependencies.",
    icon: KanbanSquare,
  },
  {
    id: "billing",
    title: "Billing",
    description: "Invoices, billing, and simplified reconciliation.",
    icon: CreditCard,
    col: "lg:col-span-2",
  },
  {
    id: "ai-voice",
    title: "AI Voice",
    description: "AI‑assisted calls and auto‑generated scripts.",
    icon: Mic,
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect your favorite tools in minutes.",
    icon: Plug,
  },
  {
    id: "security",
    title: "Security",
    description: "Encryption, RBAC, and real‑time auditing.",
    icon: Shield,
  },
  {
    id: "reports",
    title: "Reports",
    description: "Executive‑level KPIs and deep insights.",
    icon: BarChart3,
    row: "lg:row-span-2",
  },
];

// (section updated to Attio-style stories; testimonials data removed)

export const LandingTestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("testimonials-section");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Reveal only once to avoid flicker caused by internal carousel transforms
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Feature Stories (Attio-style) */}
      <FeatureStories />

      {/* Features Mosaic */}
      <section aria-label="Product highlights" className="py-16 sm:py-24 lg:py-32 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <header className={cn(
            "mb-10 sm:mb-14 text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Features that stand out
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              A visual mosaic to explore what FeatherBiz can do for your business.
            </p>
          </header>

          {/* Mosaic grid */}
          <div
            className={cn(
              "grid auto-rows-[160px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-4",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
              "transition-opacity duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {features.map((f, idx) => (
              <article
                key={f.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm",
                  "focus-within:ring-2 focus-within:ring-primary/40",
                  "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                  f.col,
                  f.row,
                  // staggered reveal
                  isVisible ? "animate-in fade-in slide-in-from-bottom-2 duration-700" : "opacity-0",
                )}
                style={{ animationDelay: `${idx * 50}ms` as React.CSSProperties["animationDelay"] }}
              >
                {/* subtle background glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

                <div className="relative z-10 h-full p-6 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border bg-background/60 backdrop-blur-sm">
                      <f.icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-medium leading-none tracking-tight">{f.title}</h3>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground max-w-[48ch]">
                    {f.description}
                  </p>

                  <div className="mt-auto pt-4">
                    <button
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      aria-label={`Explore ${f.title}`}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* decorative corner */}
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
