
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SalesContactModal } from "@/components/SalesContactModal";
import { useSubscription } from "@/hooks/useSubscription";
import { track } from "@/lib/analytics";
import navglyphsUrl from "@/assets/navglyphs.svg";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  const [showSalesModal, setShowSalesModal] = useState(false);
  const { isSubscribed, openCustomerPortal } = useSubscription();

  const pillsRef = useRef<HTMLDivElement>(null);
  const [pillsOverflow, setPillsOverflow] = useState(false);
  const pillLabels = ["AI Voice","Estimates","SmartSchedule","EasyCalc","E-sign","Reports","Invoices","Receipts","Bids"];
  
  // Icon mapping for pills
  const pillIconMap: Record<string, string> = {
    "AI Voice": "voice",
    "Estimates": "estimates", 
    "SmartSchedule": "calendar-clock",
    "EasyCalc": "calc",
    "E-sign": "esign",
    "Reports": "bars",
    "Invoices": "invoice",
    "Receipts": "receipt",
    "Bids": "gavel"
  };

  useEffect(() => {
    const el = pillsRef.current;
    const check = () => {
      if (!el) return;
      setPillsOverflow(el.scrollWidth > el.clientWidth + 4);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="hero_headline_v1" data-component-key="hero_headline_v1" className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-background to-muted/20">
      {/* very subtle grid/halo background, disabled on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden sm:block"
        style={{
          backgroundImage: `
            radial-gradient(60% 40% at 50% 0%, hsl(var(--accent) / 0.04), transparent 60%),
            repeating-linear-gradient(0deg, hsl(var(--border) / 0.05) 0px, hsl(var(--border) / 0.05) 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(90deg, hsl(var(--border) / 0.05) 0px, hsl(var(--border) / 0.05) 1px, transparent 1px, transparent 24px)
          `
        }}
      />
      {/* Announcement Banner */}
      <div className="text-center mb-8">
        <div
          className="group gold-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors cursor-pointer shadow-sm hover:shadow-md"
          role="button"
          aria-label="FeatherBiz Gold — Lista de Espera"
          tabIndex={0}
          onClick={() => navigate('/scale')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/scale'); } }}
        >
          <span className="font-medium">FeatherBiz Scale</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.08] px-4">
            Business management{" "}
            <span className="text-primary">magic.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            FeatherBiz is the AI-native platform that builds, scales and grows your business to the next level.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              data-analytics-id="hero_cta_start_click"
              size="xl"
              onClick={() => navigate('/signup?trial=7d&source=hero')}
              className="group font-medium text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 w-full sm:w-auto"
            >
              <span>Start for free</span>
            </Button>
            <Button
              data-analytics-id="hero_cta_sales_click"
              variant="outline"
              size="xl"
              onClick={() => setShowSalesModal(true)}
              className="font-medium text-lg px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 w-full sm:w-auto border-border/50 hover:border-border hover:bg-muted/50"
            >
              <span>Talk to sales</span>
            </Button>
          </div>

          <div className="relative">
            <div
              ref={pillsRef}
              data-analytics-id="hero_pills_view"
              className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center px-4"
              aria-label="FeatherBiz capabilities"
            >
              {pillLabels.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground rounded-md border border-border/50 bg-muted/30 px-3 py-1.5" aria-label={`Capability: ${feature}`}>
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <use href={`${navglyphsUrl}#glyph-${pillIconMap[feature]}`} />
                  </svg>
                  <span className="font-medium">{feature}</span>
                </span>
              ))}
            </div>
            {pillsOverflow && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-12"
                style={{ background: 'linear-gradient(to right, transparent, hsl(var(--background)))' }}
              />
            )}
          </div>

        </div>
      </div>

      <SalesContactModal 
        open={showSalesModal} 
        onOpenChange={setShowSalesModal} 
      />
    </section>
  );
};
