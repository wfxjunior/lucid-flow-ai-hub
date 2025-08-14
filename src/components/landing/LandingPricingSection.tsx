
import React from "react";
import { PricingPlans } from "@/components/PricingPlans";

export const LandingPricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-muted/20">
      <div>
        <PricingPlans />
      </div>
    </section>
  );
};
