
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";

import { LandingFeaturesSection } from "@/components/landing/LandingFeaturesSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingNumbersSection } from "@/components/landing/LandingNumbersSection";
import { LandingClientMarquee } from "@/components/landing/LandingClientMarquee";
import { LandingEntrepreneursSection } from "@/components/landing/LandingEntrepreneursSection";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";

import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

import { CookieConsent } from "@/components/landing/CookieConsent";
import { FeatherBot } from "@/components/FeatherBot";

export default function LandingPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 flex flex-col">
        <LandingHeroSection />
        
        <LandingFeaturesSection />
        <LandingTestimonialsSection />
        <LandingNumbersSection />
        <LandingClientMarquee />
        <LandingEntrepreneursSection />
        <LandingDashboardPreview />
        <LandingPricingSection />
        
        <LandingCTASection />
      </main>
      
      <LandingFooter />
      <CookieConsent />
      {/* ✅ ACTIVE CHATBOT: Black FeatherBot - Always visible on landing page */}
      <FeatherBot isVisible={true} />
    </div>
  );
}
