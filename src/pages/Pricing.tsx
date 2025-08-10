import React, { useEffect } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { PricingPlans } from "@/components/PricingPlans";

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
    <div className="min-h-screen w-full flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground animate-fade-in">
              FeatherBiz Pricing Plans
            </h1>
            <p className="text-muted-foreground mt-3">
              Simple, transparent pricing for every stage of your business.
            </p>
          </div>
          <PricingPlans />
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
