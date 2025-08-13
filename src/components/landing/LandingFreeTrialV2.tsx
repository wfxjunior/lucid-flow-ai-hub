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

const CircuitPatternDef = ({ id = "circuit-pattern" }: { id?: string }) => (
  <pattern id={id} patternUnits="userSpaceOnUse" width="12" height="12">
    <circle cx="6" cy="6" r="1" fill="hsl(var(--primary) / 0.3)" />
    <line x1="6" y1="0" x2="6" y2="12" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
    <line x1="0" y1="6" x2="12" y2="6" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
  </pattern>
);

const GrowthOrbitsFB = ({ isVisible }: { isVisible: boolean }) => {
  // Create interconnected orbital rings representing business growth and automation
  const orbits = [
    { radius: 40, delay: 0, opacity: 0.9 },
    { radius: 70, delay: 100, opacity: 0.7 },
    { radius: 100, delay: 200, opacity: 0.5 },
  ];
  
  const nodes = [
    { x: 280, y: 180, delay: 300, size: 12, type: 'primary' },
    { x: 220, y: 140, delay: 400, size: 8, type: 'secondary' },
    { x: 340, y: 140, delay: 500, size: 8, type: 'secondary' },
    { x: 180, y: 200, delay: 600, size: 6, type: 'tertiary' },
    { x: 380, y: 200, delay: 700, size: 6, type: 'tertiary' },
    { x: 280, y: 120, delay: 800, size: 6, type: 'tertiary' },
    { x: 280, y: 240, delay: 900, size: 6, type: 'tertiary' },
  ];

  const connections = [
    { from: { x: 280, y: 180 }, to: { x: 220, y: 140 }, delay: 1000 },
    { from: { x: 280, y: 180 }, to: { x: 340, y: 140 }, delay: 1100 },
    { from: { x: 280, y: 180 }, to: { x: 180, y: 200 }, delay: 1200 },
    { from: { x: 280, y: 180 }, to: { x: 380, y: 200 }, delay: 1300 },
    { from: { x: 220, y: 140 }, to: { x: 280, y: 120 }, delay: 1400 },
    { from: { x: 340, y: 140 }, to: { x: 280, y: 120 }, delay: 1500 },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground)/0.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <svg
        role="img"
        aria-label="Illustration showing interconnected business automation and growth network"
        className="w-full h-auto"
        viewBox="0 0 560 360"
        fill="none"
      >
        <defs>
          <CircuitPatternDef id="growth-pattern" />
          <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feMorphology operator="dilate" radius="2" />
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
          </linearGradient>
        </defs>

        {/* Orbital rings */}
        {orbits.map((orbit, i) => (
          <circle
            key={`orbit-${i}`}
            cx="280"
            cy="180"
            r={orbit.radius}
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1"
            strokeDasharray="4 8"
            style={{
              transition: "opacity 800ms ease, stroke-dashoffset 1200ms ease",
              transitionDelay: `${orbit.delay}ms`,
              opacity: isVisible ? orbit.opacity : 0,
              strokeDashoffset: isVisible ? 0 : 100,
            }}
          />
        ))}

        {/* Connection lines */}
        {connections.map((conn, i) => (
          <line
            key={`connection-${i}`}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="1.5"
            style={{
              transition: "opacity 600ms ease, stroke-dashoffset 800ms ease",
              transitionDelay: `${conn.delay}ms`,
              opacity: isVisible ? 1 : 0,
              strokeDasharray: "3 6",
              strokeDashoffset: isVisible ? 0 : 50,
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="url(#nodeGradient)"
              style={{
                transition: "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
                transitionDelay: `${node.delay}ms`,
                transform: isVisible ? "scale(1)" : "scale(0)",
                opacity: isVisible ? 1 : 0,
                filter: node.type === 'primary' ? "url(#glowEffect)" : "none",
              }}
            />
            {node.type === 'primary' && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 4}
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="2"
                style={{
                  transition: "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
                  transitionDelay: `${node.delay + 200}ms`,
                  transform: isVisible ? "scale(1)" : "scale(0.5)",
                  opacity: isVisible ? 1 : 0,
                }}
              />
            )}
          </g>
        ))}

        {/* Growth arrows */}
        <path
          d="M 200 140 L 220 120 L 215 125 M 220 120 L 215 115"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            transition: "opacity 600ms ease, transform 800ms ease",
            transitionDelay: "1600ms",
            opacity: isVisible ? 0.8 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
          }}
        />
        <path
          d="M 360 140 L 340 120 L 345 125 M 340 120 L 345 115"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            transition: "opacity 600ms ease, transform 800ms ease",
            transitionDelay: "1700ms",
            opacity: isVisible ? 0.8 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
          }}
        />

        {/* Floating elements for dynamism */}
        <circle
          cx="160"
          cy="120"
          r="2"
          fill="hsl(var(--primary) / 0.6)"
          style={{
            transition: "opacity 600ms ease, transform 1000ms ease",
            transitionDelay: "1800ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        />
        <circle
          cx="400"
          cy="260"
          r="3"
          fill="hsl(var(--primary) / 0.4)"
          style={{
            transition: "opacity 600ms ease, transform 1000ms ease",
            transitionDelay: "1900ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-15px)",
          }}
        />
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
                className="font-semibold px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 w-full sm:w-auto"
                data-analytics-id="trial_cta_primary_click"
                onClick={onPrimaryClick}
              >
                {copy.primary}
              </Button>

              <Button
                variant="outline"
                className="font-medium px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 w-full sm:w-auto"
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
              <GrowthOrbitsFB isVisible={isVisible} />
            </div>
            <span className="sr-only">
              Illustration showing interconnected business automation and growth network representing your Pro trial journey.
            </span>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LandingFreeTrialV2;
