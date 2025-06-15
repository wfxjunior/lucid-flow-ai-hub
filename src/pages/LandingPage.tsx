import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroSection } from "@/components/landing/LandingHeroSection";
import { LandingTrustIndicators } from "@/components/landing/LandingTrustIndicators";
import { LandingFeaturesSection } from "@/components/landing/LandingFeaturesSection";
import { LandingTestimonialsSection } from "@/components/landing/LandingTestimonialsSection";
import { LandingPricingSection } from "@/components/landing/LandingPricingSection";
import { LandingCTASection } from "@/components/landing/LandingCTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { EssentialSideMenu } from "@/components/EssentialSideMenu";
import { LandingBusinessMetricsSection } from "@/components/landing/LandingBusinessMetricsSection";
import { LandingClientsSection } from "@/components/landing/LandingClientsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 flex flex-col">
        <LandingHeroSection />
        <LandingTrustIndicators />
        <LandingFeaturesSection />
        <LandingTestimonialsSection />
        <LandingBusinessMetricsSection />
        {/* Bloco de logos de clientes/parceiros */}
        <LandingClientsSection />
        <LandingPricingSection />
        <LandingCTASection />
      </main>
      <EssentialSideMenu />
      <LandingFooter />
    </div>
  );
}
