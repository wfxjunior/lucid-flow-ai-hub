
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Clock, Star } from "lucide-react";

export const LandingCTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta-section" className="py-24 lg:py-32 bg-white border-t border-[#E9EEF5] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div>
          
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1]">
            Ready to transform{" "}
            <span className="text-muted-foreground">your business?</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using FeatherBiz to streamline operations, boost productivity, and drive growth.
          </p>
          
          {/* CTA Button */}
          <div className="mb-8">
            <Button
              onClick={() => navigate('/auth')}
              className="bg-foreground text-background hover:bg-foreground/90 px-12 py-4 rounded-lg font-medium text-lg"
            >
              Start your free trial
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Free forever plan available</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
