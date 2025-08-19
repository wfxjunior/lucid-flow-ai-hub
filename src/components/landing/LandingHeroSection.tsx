
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SalesContactModal } from "@/components/SalesContactModal";
import { useSubscription } from "@/hooks/useSubscription";
import { track } from "@/lib/analytics";
import { motion } from "framer-motion";
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
    <section id="hero_headline_v1" data-component-key="hero_headline_v1" className="relative bg-white" style={{ paddingTop: 'var(--hero-pt)', paddingBottom: 'var(--hero-pb)' }}>
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
      
      {/* Announcement Banner - attio-like pill */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/scale')}
          className="group h-7 px-3.5 rounded-full border cursor-pointer inline-flex items-center gap-2 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
          style={{
            borderColor: 'var(--fb-border)',
            backgroundColor: 'var(--fb-bg)',
            fontSize: '13px',
            fontWeight: '500'
          }}
          role="button"
          aria-label="FeatherBiz Scale"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/scale'); } }}
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'hsl(var(--fb-primary))' }}
          />
          <span className="font-medium" style={{ color: 'var(--fb-text)' }}>
            FeatherBiz Scale
          </span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--fb-muted)' }} />
        </motion.div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 
            className="font-black text-foreground px-2 sm:px-4 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none mb-[var(--hero-gap-title-sub)]"
          >
            Business management{" "}
            <span className="text-primary">magic.</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4 text-[var(--hero-sub-fs-d)] leading-[var(--hero-sub-lh)] mb-[var(--hero-gap-sub-ctas)]"
            style={{
              color: 'hsl(var(--hero-sub-color))'
            }}
          >
            FeatherBiz is the AI-native platform that builds, scales and grows your business to the next level.
          </p>

          {/* CTA Buttons - Using consistent moderate rounded style */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 w-full px-4">
            <Button
              onClick={() => navigate('/signup?trial=7d&source=hero')}
              className="w-full sm:w-auto btn btn-primary"
              size="lg"
            >
              Start for free
            </Button>
            <Button
              onClick={() => setShowSalesModal(true)}
              variant="outline"
              className="w-full sm:w-auto btn btn-outline"
              size="lg"
            >
              Talk to sales
            </Button>
          </div>

          {/* Feature Pills Section - Stripe-like Redesign */}
          <div className="relative max-w-5xl mx-auto">            
            <div className="relative px-4 py-8">
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Powerful features included
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto"></div>
              </div>

              <div
                ref={pillsRef}
                data-analytics-id="hero_pills_view"
                className="flex flex-wrap justify-center items-center gap-5 sm:gap-6"
                style={{ rowGap: '16px', columnGap: '20px' }}
                aria-label="FeatherBiz capabilities"
              >
                {pillLabels.map((feature, index) => (
                  <motion.button
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="feature-chip group"
                    aria-label={`${feature} feature`}
                    tabIndex={0}
                  >
                    <div className="feature-chip-icon">
                      <svg
                        aria-hidden="true"
                        className="shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        <use href={`${navglyphsUrl}#glyph-${pillIconMap[feature]}`} />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </motion.button>
                ))}
              </div>
            </div>
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
