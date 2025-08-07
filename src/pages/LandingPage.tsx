
import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";

import { LandingFeaturesSection } from "@/components/landing/LandingFeaturesSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingClientMarquee } from "@/components/landing/LandingClientMarquee";
import { LandingEntrepreneursSection } from "@/components/landing/LandingEntrepreneursSection";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import { LandingFAQSection } from "@/components/landing/LandingFAQSection";
import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

import { CookieConsent } from "@/components/landing/CookieConsent";
import { FeatherBot } from "@/components/FeatherBot";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 flex flex-col">
        <LandingHeroSection />
        
        <LandingFeaturesSection />
        <LandingTestimonialsSection />
        <LandingClientMarquee />
        <LandingEntrepreneursSection />
        <LandingDashboardPreview />
        <LandingPricingSection />
        <LandingFAQSection />
        <LandingCTASection />
      </main>
      
      <LandingFooter />
      <CookieConsent />
      {/* ✅ ACTIVE CHATBOT: Black FeatherBot - Always visible on landing page */}
      <FeatherBot isVisible={true} />
    </div>
  );
}
