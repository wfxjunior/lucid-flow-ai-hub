
import React from "react";

export const LandingTrustIndicators = () => (
  <section className="py-8 sm:py-12 border-y bg-muted/30 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-lg sm:text-xl font-bold text-primary uppercase tracking-wide">
          Trusted by Innovative Companies
        </p>
      </div>
      <div className="relative w-full">
        <div className="animate-scroll-right">
          <img
            src="/lovable-uploads/9213baaa-a963-4cd9-974c-b7ebfdd1f554.png"
            alt="Trusted by companies like Google, Oracle, Amazon, IBM, PayPal, eBay, Shopify, Stripe, SAP, Microsoft, Salesforce, Adobe"
            className="h-12 sm:h-16 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  </section>
)
