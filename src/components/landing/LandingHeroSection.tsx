
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

          {/* CTA Buttons - Fixed Responsive Layout */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 w-full px-4">
            <button
              onClick={() => navigate('/signup?trial=7d&source=hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-8 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ 
                backgroundColor: '#1e63ff',
                boxShadow: '0 4px 14px 0 rgba(30, 99, 255, 0.4)'
              }}
            >
              Start for free
            </button>
            <button
              onClick={() => setShowSalesModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-8 rounded-full border font-semibold text-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ 
                borderColor: '#1e63ff',
                color: '#1e63ff',
                backgroundColor: 'white'
              }}
            >
              Talk to sales
            </button>
          </div>

          {/* Feature Pills Section - Improved Layout */}
          <div className="relative max-w-5xl mx-auto">
            {/* Subtle background for pills container */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/20 to-transparent rounded-2xl opacity-50"></div>
            
            <div className="relative px-4 py-8">
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Powerful features included
                </p>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mt-2"></div>
              </div>

              <div
                ref={pillsRef}
                data-analytics-id="hero_pills_view"
                className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
                aria-label="FeatherBiz capabilities"
              >
                {pillLabels.map((feature, index) => (
                  <motion.span
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="inline-flex items-center text-muted-foreground border border-border/60 bg-background/80 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-300 h-10 px-4 text-sm font-medium rounded-full gap-2.5 group cursor-pointer" 
                    aria-label={`Capability: ${feature}`}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <use href={`${navglyphsUrl}#glyph-${pillIconMap[feature]}`} />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </motion.span>
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
