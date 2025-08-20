
import React, { useEffect } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingPlans } from "@/components/PricingPlans";
import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";

function setMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function Pricing() {
  useEffect(() => {
    document.title = "FeatherBiz Pricing Plans | Monthly & Annual";
    setMeta(
      "description",
      "Compare FeatherBiz pricing plans: Free, Starter, Pro, and Enterprise with monthly or annual billing."
    );

    // Set canonical URL
    const href = `https://featherbiz.io/pricing`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <LandingHeader />
      <main className="flex-1">
        <section className="py-16 sm:py-20">
          <PricingHeader />
          <PricingPlans />
          <PricingComparison />
          <PricingFAQ />
          
          {/* Legal microcopy */}
          <div className="max-w-7xl mx-auto px-4 mt-12">
            <p className="text-center text-xs text-gray-500">
              Prices exclude tax where applicable.
            </p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
