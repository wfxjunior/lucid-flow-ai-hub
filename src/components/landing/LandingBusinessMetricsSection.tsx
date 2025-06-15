
import React from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Award, Zap, LayoutGrid } from "lucide-react";

const metrics = [
  {
    icon: Award,
    label: "Industry Leader",
    number: 1,
    suffix: "",
    description: "Ranked #1 for Small Biz Solutions",
    animate: true,
  },
  {
    icon: Zap,
    label: "99% Uptime",
    number: 99.9,
    suffix: "%",
    description: "Reliability you can count on",
    animate: true,
  },
  {
    icon: LayoutGrid,
    label: "Organized Workspaces",
    number: 3000,
    suffix: "+",
    description: "Businesses powered by us",
    animate: true,
  },
];

export const LandingBusinessMetricsSection = () => (
  <section className="w-full py-12 px-4 bg-background flex flex-col items-center">
    <div className="max-w-5xl w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-2">
          Our Business Impact
        </h2>
        <p className="text-md text-muted-foreground">
          Proven results, reliability, and organization for every business size.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={metric.label}
            className="flex flex-col items-center bg-muted/40 rounded-xl p-6 md:p-8 shadow-sm transition hover:scale-105 hover:shadow-lg group"
          >
            <span className="mb-2">
              <metric.icon
                className={`
                  w-10 h-10 
                  text-black
                  group-hover:text-blue-700
                  transition-all 
                  ${idx === 1 ? "animate-bounce" : "animate-none"}
                  opacity-95`}
                strokeWidth={2.5}
              />
            </span>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-3xl font-extrabold text-foreground">
                <AnimatedNumber 
                  value={metric.number} 
                  decimals={metric.suffix === "%" ? 1 : 0} 
                  duration={1800} 
                  suffix={metric.suffix} 
                />
              </span>
            </div>
            <span className="uppercase text-xs font-bold tracking-wider text-muted-foreground mb-1">
              {metric.label}
            </span>
            <p className="text-xs text-muted-foreground text-center">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
