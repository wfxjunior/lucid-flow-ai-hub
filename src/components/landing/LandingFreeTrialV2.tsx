import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// 7-Day Free Trial Section (section_free_trial_v2)
// - Original illustration: trial_flow_chevrons_fb (5 tiles, only 4th hatched)
// - Idempotent component; can be safely rendered multiple times but intended once
// - Uses design system tokens via Tailwind + CSS variables

const useLocaleCopy = () => {
  const isPT = useMemo(() => {
    if (typeof window === "undefined") return false;
    const langAttr = document.documentElement.getAttribute("lang") || "";
    const navLang = navigator.language || (navigator as any).userLanguage || "";
    return (langAttr.toLowerCase().startsWith("pt") || navLang.toLowerCase().startsWith("pt"));
  }, []);

  if (isPT) {
    return {
      headline: "Comece com um teste grátis de 7 dias do Pro.",
      subheadline: "Sem cartão de crédito. Cancele quando quiser. Todos os recursos incluídos.",
      primary: "Começar grátis",
      secondary: "Ver planos",
    } as const;
  }
  return {
    headline: "Start with a 7-day free trial of Pro.",
    subheadline: "No credit card required. Cancel anytime. All features included.",
    primary: "Start for free",
    secondary: "See our plans",
  } as const;
};

function tryOpenSignupModal() {
  try {
    // 1) If a global modal opener exists, use it
    // @ts-ignore - optional global present in some builds
    if (typeof window !== "undefined" && typeof (window as any).openSignupModal === "function") {
      (window as any).openSignupModal({ source: "trial-cta", trial: "7d" });
      return true;
    }
    // 2) Dispatch a custom event some apps listen for
    if (typeof window !== "undefined") {
      const ev = new CustomEvent("open-signup-modal", { detail: { source: "trial-cta", trial: "7d" } });
      window.dispatchEvent(ev);
      // No reliable way to confirm, assume listener handles it if present
      // Consumers can call event.preventDefault if needed
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

const HatchedPatternDef = ({ id = "hatched-45" }: { id?: string }) => (
  <pattern id={id} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
    {/* Use brand tokens via CSS variables for color; very light */}
    <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--primary) / 0.25)" strokeWidth="1" />
  </pattern>
);

const TrialFlowChevronsFB = ({ isVisible }: { isVisible: boolean }) => {
  // Create 5 tiles (rounded rhomboids) using rotated rounded rects
  // Only tile index 3 (4th) uses hatch fill; others are transparent fill
  const tiles = [0, 1, 2, 3, 4];
  return (
    <div className="relative w-full h-full">
      {/* Faint grid background using brand tokens */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--muted-foreground)/0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)/0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px, 22px 22px",
          backgroundPosition: "-1px -1px",
        }}
      />

      <svg
        role="img"
        aria-label="Illustration of a forward setup flow representing a quick start to your Pro trial."
        className="w-full h-auto"
        viewBox="0 0 560 360"
        fill="none"
      >
        <defs>
          <HatchedPatternDef id="trial-hatch" />
          <filter id="subtleShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(var(--foreground) / 0.10)" />
          </filter>
        </defs>

        {tiles.map((i) => {
          // Layout: stagger tiles along a subtle diagonal
          const baseX = 110 + i * 70;
          const baseY = 110 + i * 10;
          const w = 120;
          const h = 68;
          const rx = 16; // rounded corners consistent with DS
          const delayMs = 60 + i * 70; // 60–90ms+ between
          const isHatched = i === 3;

          return (
            <g
              key={i}
              style={{
                transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease",
                transitionDelay: `${delayMs}ms`,
                transform: isVisible ? "translateX(0px)" : "translateX(16px)",
                opacity: isVisible ? 1 : 0,
                filter: "url(#subtleShadow)",
              }}
            >
              <rect
                x={baseX}
                y={baseY}
                width={w}
                height={h}
                rx={rx}
                ry={rx}
                transform={`rotate(45 ${baseX + w / 2} ${baseY + h / 2})`}
                fill={isHatched ? "url(#trial-hatch)" : "none"}
                stroke="hsl(var(--primary))"
                strokeWidth={1.75}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const LandingFreeTrialV2: React.FC = () => {
  const copy = useLocaleCopy();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        setIsVisible(nowVisible);
        if (nowVisible && !tracked) {
          // Track a view event (custom event + data-attribute also present)
          try {
            // @ts-ignore optional analytics
            if (window?.analytics?.track) {
              // @ts-ignore
              window.analytics.track("trial_section_v2_view");
            }
          } catch {}
          try {
            window.dispatchEvent(
              new CustomEvent("analytics:track", { detail: { id: "trial_section_v2_view" } })
            );
          } catch {}
          setTracked(true);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [tracked]);

  const onPrimaryClick = () => {
    // Analytics attribute is on the element; also attempt programmatic tracking
    try {
      // @ts-ignore optional
      window?.dispatchEvent?.(new CustomEvent("analytics:click", { detail: { id: "trial_cta_primary_click" } }));
    } catch {}

    const opened = tryOpenSignupModal();
    if (!opened) {
      window.location.href = "/signup?trial=7d&source=trial-cta";
    }
  };

  return (
    <section
      id="section_free_trial_v2"
      ref={sectionRef}
      data-analytics-id="trial_section_v2_view"
      className="w-full bg-background"
      aria-labelledby="section_free_trial_v2_title"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-24 lg:py-[96px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy + CTAs */}
          <div>
            <header className="mb-6">
              <h2
                id="section_free_trial_v2_title"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
              >
                {copy.headline}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-prose">
                {copy.subheadline}
              </p>
            </header>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                className="font-semibold"
                data-analytics-id="trial_cta_primary_click"
                onClick={onPrimaryClick}
              >
                {copy.primary}
              </Button>

              <Button
                variant="outline"
                className="font-medium"
                data-analytics-id="trial_cta_secondary_click"
                asChild
              >
                <a href="/pricing" aria-label={copy.secondary}>{copy.secondary}</a>
              </Button>
            </div>
          </div>

          {/* Right: Illustration */}
          <aside className="relative">
            <div className="relative w-full aspect-[7/5] rounded-2xl border border-border bg-card p-4 md:p-6">
              <TrialFlowChevronsFB isVisible={isVisible} />
            </div>
            <span className="sr-only">
              Illustration of a forward setup flow representing a quick start to your Pro trial.
            </span>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LandingFreeTrialV2;
