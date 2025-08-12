
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { SalesContactModal } from "@/components/SalesContactModal";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);

  const pillsRef = useRef<HTMLDivElement>(null);
  const [pillsOverflow, setPillsOverflow] = useState(false);
  const [pillsLogged, setPillsLogged] = useState(false);
  const pillLabels = ["Voices","Estimates","AI & Calc","Assignments","Data","Automations","Pipeline","Productivity","Reporting"];

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  useEffect(() => {
    if (pillsLogged) return;
    const el = pillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('hero_pills_view', pillLabels.slice(0, 4));
          setPillsLogged(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pillsLogged]);


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
      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-md border border-border/50 text-sm text-muted-foreground hover:bg-muted/70 transition-colors cursor-pointer">
          <span>FeatherBiz for desktop is here</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.08] transition-all duration-1000 delay-200 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Business management{" "}
            <span className="text-primary">magic.</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            FeatherBiz is the AI-native platform that builds, scales and grows your business to the next level.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              data-analytics-id="hero_cta_start_click"
              onClick={() => navigate('/signup?trial=7d&source=hero')}
              className="group font-medium"
            >
              <span>Start for free</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button
              data-analytics-id="hero_cta_sales_click"
              variant="outline"
              onClick={() => setShowSalesModal(true)}
              className="font-medium border-border/50 hover:border-border hover:bg-muted/50"
            >
              <Play className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Talk to sales</span>
            </Button>
          </div>

          <div className={`relative transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div
              ref={pillsRef}
              data-analytics-id="hero_pills_view"
              className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center px-4"
              aria-label="FeatherBiz capabilities"
            >
              {pillLabels.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground rounded-md border border-border/50 bg-muted/30 px-3 py-1.5" aria-label={`Capability: ${feature}`}>
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded border border-border/50 flex items-center justify-center">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-muted-foreground" />
                  </span>
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
