import React, { useState, useEffect } from "react";
import { PricingPlans } from "@/components/PricingPlans";

export const LandingPricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const section = document.getElementById('pricing-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-muted/20">
      <div id="pricing-section" className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <PricingPlans />
      </div>
    </section>
  );
};