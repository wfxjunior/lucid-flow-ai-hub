
import React from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";

const stats = [
  { number: 12900, label: "Active Users", suffix: "+" },
  { number: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
  { number: 24, label: "Support", suffix: "/7" },
  { number: 150, label: "Integrations", suffix: "+" },
];

export const LandingTrustIndicators = () => (
  <section className="py-8 sm:py-12 border-y bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-lg sm:text-xl font-bold text-primary uppercase tracking-wide animate-fade-in">
          Trusted by <AnimatedNumber value={12900} suffix="+" delay={200} /> businesses worldwide
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              <AnimatedNumber
                value={stat.number}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
                delay={index * 200}
                duration={2000}
              />
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
