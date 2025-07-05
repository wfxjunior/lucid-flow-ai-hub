
import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingTrustIndicators } from "@/components/landing/LandingTrustIndicators";
import { LandingFeaturesSection } from "@/components/landing/LandingFeaturesSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import { LandingFAQSection } from "@/components/landing/LandingFAQSection";
import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { EssentialSideMenu } from "@/components/EssentialSideMenu";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 flex flex-col">
        <LandingHeroSection />
        <LandingTrustIndicators />
        <LandingFeaturesSection />
        <LandingTestimonialsSection />
        <LandingDashboardPreview />
        <LandingPricingSection />
        <LandingFAQSection />
        <LandingCTASection />
      </main>
      <EssentialSideMenu />
      <LandingFooter />
    </div>
  );
}
