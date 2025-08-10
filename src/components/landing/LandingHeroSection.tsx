
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { SalesContactModal } from "@/components/SalesContactModal";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-background to-muted/20">
      {/* Announcement Banner */}
      <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50 text-sm text-muted-foreground hover:bg-muted/70 transition-colors cursor-pointer">
          <span>FeatherBiz for desktop is here</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1] transition-all duration-1000 delay-200 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Business management{" "}
            <span className="text-muted-foreground">magic.</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            FeatherBiz is the AI-native platform that builds, scales and grows your business to the next level.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 py-3 rounded-lg text-base"
            >
              Start for free
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSalesModal(true)}
              className="font-medium px-8 py-3 rounded-lg text-base border-border/50 hover:border-border hover:bg-muted/50"
            >
              <Play className="h-4 w-4 mr-2" />
              Talk to sales
            </Button>
          </div>

          {/* Feature Tags */}
          <div className={`flex flex-wrap justify-center gap-3 sm:gap-6 mb-16 px-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {["Data", "Automations", "Pipeline", "Productivity", "Reporting"].map((feature, index) => (
              <div key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded border border-border/50 flex items-center justify-center">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-muted-foreground" />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <SalesContactModal 
        open={showSalesModal} 
        onOpenChange={setShowSalesModal} 
      />
    </section>
  );
};
