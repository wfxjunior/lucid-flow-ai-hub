
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";

import { FeatherBizShowcase } from "@/components/landing/FeatherBizShowcase";
import LogoMarquee from "@/components/LogoMarquee";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingNumbersSection } from "@/components/landing/LandingNumbersSection";

import { LandingEntrepreneursSection } from "@/components/landing/LandingEntrepreneursSection";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import TrialGrowthSection from "@/components/TrialGrowthSection";

import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

import { CookieConsent } from "@/components/landing/CookieConsent";
import { FeatherBot } from "@/components/FeatherBot";
import SEO from "@/components/SEO";

export default function LandingPage() {
  const location = useLocation();
  
  // Debug logging
  useEffect(() => {
    console.log('LandingPage mounted, location:', location.pathname);
  }, []);
  
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
    <div className="min-h-screen w-full flex flex-col bg-white overflow-x-hidden">
      <SEO
        title="FeatherBiz — AI business management platform"
        description="AI-native platform to build, scale and grow your business: data, automations, pipeline, productivity, reporting."
        canonicalPath="/landing"
        ogImage="/og/landing-og.jpg"
      />
      <LandingHeader />
      <main className="flex-1 flex flex-col w-full">
        <LandingHeroSection />
        
        <div className="w-full">
          <FeatherBizShowcase />
          <LogoMarquee className="mt-6 sm:mt-10" />
          <LandingTestimonialsSection />
          <TrialGrowthSection />
          <LandingNumbersSection />
          
          <LandingEntrepreneursSection />
          <LandingDashboardPreview />
          <LandingPricingSection />
          
          <LandingCTASection />
        </div>
      </main>
      
      <LandingFooter />
      <CookieConsent />
      {/* ✅ ACTIVE CHATBOT: Black FeatherBot - Always visible on landing page */}
      <FeatherBot isVisible={true} theme="gray" />
    </div>
  );
}
