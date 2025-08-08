import React, { useEffect, useMemo, useRef, useState, forwardRef } from "react";

// Types
export interface NumbersMetric {
  value: number;
  display?: string; // e.g., "+", "%"
  label: string;
  notation?: "compact" | "standard"; // number formatting style
}

export interface NumbersChartData {
  labels: string[];
  values: number[]; // same length as labels
}

export interface NumbersDataPayload {
  metrics: NumbersMetric[];
  chart: NumbersChartData;
}

// Public helper to update metrics live
export function updateFeatherBizMetrics(data: NumbersDataPayload) {
  window.dispatchEvent(new CustomEvent<NumbersDataPayload>("fbz:update-metrics", { detail: data }));
}

// Easing functions
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// Slight overshoot similar to easeOutBack
const easeOutBack = (t: number, s = 1.1015) => {
  return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useInViewOnce(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  const seenRef = useRef(false);
  useEffect(() => {
    if (!ref.current || seenRef.current) return;
    const obs = new IntersectionObserver(
      (entries, observer) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            seenRef.current = true;
            setInView(true);
            observer.disconnect(); // once: true
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function formatNumberForLocale(value: number, locale: string, notation: "compact" | "standard", maximumFractionDigits = 2) {
  return new Intl.NumberFormat(locale, {
    notation,
    maximumFractionDigits,
  }).format(value);
}

// Animated Counter
interface AnimatedCounterProps {
  value: number;
  display?: string;
  notation?: "compact" | "standard";
  duration?: number; // ms
  delay?: number; // ms
  locale: string;
  reducedMotion?: boolean;
  ariaLabelSuffix?: string; // e.g., "documents generated"
}

function AnimatedCounter({
  value,
  display,
  notation = value >= 10000 ? "compact" : "standard",
  duration = 1400,
  delay = 0,
  locale,
  reducedMotion,
  ariaLabelSuffix,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(reducedMotion ? value : 0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setCurrent(value);
      return;
    }
    let active = true;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = Math.min(Math.max((ts - startRef.current - delay) / duration, 0), 1);
      const eased = easeOutCubic(t);
      const next = value * eased;
      if (active) setCurrent(next);
      if (t < 1 && active) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, delay, reducedMotion]);

  const formatted = useMemo(() => formatNumberForLocale(current, locale, notation), [current, locale, notation]);
  const fullFormatted = useMemo(() => formatNumberForLocale(value, locale, "standard"), [value, locale]);

  return (
    <span aria-label={`${fullFormatted}${display ? display : ""}${ariaLabelSuffix ? ` ${ariaLabelSuffix}` : ""}`}> 
      <span className="font-semibold tracking-tight">{formatted}</span>
      {display ? <span aria-hidden="true">{display}</span> : null}
    </span>
  );
}

// Growth Chart (SVG, no external libs)
interface GrowthChartProps {
  data: NumbersChartData;
  reducedMotion?: boolean;
  accentHsl: string; // e.g., "211 100% 65%"
  accent2Hsl: string; // e.g., "148 54% 66%"
  gridHsl: string; // e.g., "219 52% 94% / 0.12"
}

function GrowthChart({ data, reducedMotion, accentHsl, accent2Hsl, gridHsl }: GrowthChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const width = 560;
  const height = 320;
  const padding = 28;
  const gridLines = 5;

  const values = data.values;
  const labels = data.labels;
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  function getPoints(progress = 1) {
    // overshoot near the end
    const t = reducedMotion ? 1 : easeOutBack(progress);
    return values.map((v, i) => {
      const x = padding + (i * (width - padding * 2)) / (values.length - 1);
      // interpolate from baseline (min) to v with overshoot, then clamp
      const targetYVal = minVal + (v - minVal) * Math.min(t, 1);
      const y = padding + (1 - (targetYVal - minVal) / range) * (height - padding * 2);
      return { x, y };
    });
  }

  function pathFromPoints(pts: { x: number; y: number }[]) {
    if (pts.length === 0) return "";
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    // Smooth with cubic Beziers using a simple control points approach
    const d = pts.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const p0 = arr[i - 1];
      const p1 = p;
      const dx = (p1.x - p0.x) * 0.3;
      const cp1x = p0.x + dx;
      const cp1y = p0.y;
      const cp2x = p1.x - dx;
      const cp2y = p1.y;
      return acc + ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }, "");
    return d;
  }

  // Animate path
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  useEffect(() => {
    setMounted(true);
    if (reducedMotion) return;
    let raf: number;
    let start: number | null = null;
    const duration = 1800; // ms
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, values.join(",")]);

  const pts = useMemo(() => getPoints(progress), [progress, values.join(",")]);
  const d = useMemo(() => pathFromPoints(pts), [pts]);

  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) => padding + (i * (height - padding * 2)) / gridLines);
  const xTicks = Array.from({ length: Math.min(values.length, 6) }, (_, i) => padding + (i * (width - padding * 2)) / (Math.min(values.length, 6) - 1));

  return (
    <svg
      id="fbz-growth-chart"
      ref={svgRef}
      role="img"
      aria-label="Growth chart"
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="fbzLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={`hsl(${accentHsl})`} />
          <stop offset="100%" stopColor={`hsl(${accent2Hsl})`} />
        </linearGradient>
      </defs>

      {/* Grid */}
      {yTicks.map((y, i) => (
        <line key={`y-${i}`} x1={padding} x2={width - padding} y1={y} y2={y} stroke={`hsl(${gridHsl})`} strokeWidth={1} />
      ))}
      {xTicks.map((x, i) => (
        <line key={`x-${i}`} y1={padding} y2={height - padding} x1={x} x2={x} stroke={`hsl(${gridHsl})`} strokeWidth={1} />
      ))}

      {/* Path */}
      <path d={d} fill="none" stroke="url(#fbzLineGrad)" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />

      {/* Current point */}
      {mounted && pts.length > 0 ? (
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={4} fill={`hsl(${accent2Hsl})`} />
      ) : null}
    </svg>
  );
}

interface LandingNumbersSectionProps {
  data?: NumbersDataPayload;
}

export const LandingNumbersSection = forwardRef<HTMLDivElement, LandingNumbersSectionProps>(function LandingNumbersSection(
  { data }: LandingNumbersSectionProps,
  ref
) {
  // Defaults per spec
  const defaultData: NumbersDataPayload = useMemo(
    () => ({
      metrics: [
        { value: 120000, display: "+", label: "Documents generated", notation: "compact" },
        { value: 72, display: "+", label: "Countries", notation: "standard" },
        { value: 3500, display: "+", label: "Businesses", notation: "compact" },
        { value: 99.95, display: "%", label: "Uptime", notation: "standard" },
      ],
      chart: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        values: [5,8,13,21,34,55,89,144,160,190,220,260],
      },
    }),
    []
  );

  const [payload, setPayload] = useState<NumbersDataPayload>(data ?? defaultData);

  // Listen for live updates
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<NumbersDataPayload>;
      if (ce.detail) setPayload(ce.detail);
    };
    window.addEventListener("fbz:update-metrics", handler as EventListener);
    return () => window.removeEventListener("fbz:update-metrics", handler as EventListener);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const inView = useInViewOnce(sectionRef, "0px 0px -10% 0px");

  const locale = useMemo(() => {
    if (typeof document !== "undefined") {
      const htmlLang = document.documentElement.getAttribute("lang");
      return htmlLang || navigator.language || "en";
    }
    return "en";
  }, []);

  // Two column layout, metrics left, chart right
  const metrics = payload.metrics;
  const chart = payload.chart;

  // Durations and stagger per spec
  const baseDurationRange: [number, number] = [1200, 1600];
  const staggerMs = 120;

  // Theme HSL variables from design system (landing palette)
  const { accentHsl, accent2Hsl, gridHsl } = useMemo(() => {
    if (typeof document === 'undefined') {
      return {
        accentHsl: '222 100% 60%',
        accent2Hsl: '200 94% 55%',
        gridHsl: '220 9% 46% / 0.12',
      };
    }
    const root = getComputedStyle(document.documentElement);
    const primary = root.getPropertyValue('--primary').trim();
    const accent = (root.getPropertyValue('--accent') || primary).trim();
    const mutedFg = (root.getPropertyValue('--muted-foreground') || root.getPropertyValue('--foreground')).trim();
    return {
      accentHsl: primary || '222 100% 60%',
      accent2Hsl: accent || primary || '222 100% 60%',
      gridHsl: `${mutedFg || '220 9% 46%'} / 0.12`,
    };
  }, []);

  return (
    <section
      id="fbz-metrics"
      ref={sectionRef}
      aria-labelledby="fbz-metrics-title"
      className="w-full bg-background text-foreground"
    >
      <div ref={containerRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <header className="mb-10 sm:mb-12">
          <h2 id="fbz-metrics-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            FeatherBiz by the numbers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Proof we’re built for growing small businesses.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Metrics */}
          <div className="fbz-metrics-grid grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((m, idx) => {
              const duration = Math.round(
                baseDurationRange[0] + Math.random() * (baseDurationRange[1] - baseDurationRange[0])
              );
              const delay = idx * staggerMs;
              return (
                <article key={idx} className="rounded-lg border border-border/10 p-4 sm:p-5 bg-background/5" aria-label={`${m.label}`}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-none">
                    {inView ? (
                      <AnimatedCounter
                        value={m.value}
                        display={m.display}
                        notation={m.notation ?? (m.value >= 10000 ? "compact" : "standard")}
                        duration={duration}
                        delay={delay}
                        locale={locale}
                        reducedMotion={reducedMotion}
                        ariaLabelSuffix={m.label}
                      />
                    ) : (
                      <span>
                        {formatNumberForLocale(m.value, locale, m.notation ?? (m.value >= 10000 ? "compact" : "standard"))}
                        {m.display ?? ""}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    {m.label}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Chart */}
          <figure className="relative w-full overflow-hidden rounded-xl border border-border/10 bg-background/5 p-4 sm:p-6">
            <figcaption className="sr-only">Growth over time</figcaption>
            {inView ? (
              <GrowthChart data={chart} reducedMotion={reducedMotion} accentHsl={accentHsl} accent2Hsl={accent2Hsl} gridHsl={gridHsl} />
            ) : (
              <div className="aspect-[7/4] w-full" aria-hidden="true" />
            )}

            {/* Hidden table for screen readers */}
            <div className="sr-only" aria-hidden={false} role="region" aria-label="Growth chart data table">
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {chart.labels.map((label, i) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{chart.values[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <noscript>
              <div className="text-sm">JavaScript disabled. Static chart preview:</div>
              <img src="/placeholder.svg" alt="Static growth chart preview" className="mt-2 w-full h-auto" />
            </noscript>
          </figure>
        </div>
      </div>
    </section>
  );
});

export default LandingNumbersSection;
