
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dashboardImages = [
    "/lovable-uploads/0e5059d6-0019-4810-aa5e-28488bd3ebfe.png",
    "/lovable-uploads/2e975bb9-3a42-496b-8c01-507136c52a4c.png",
    "/lovable-uploads/36da8739-abc7-467e-b8f4-e09735240256.png",
    "/lovable-uploads/5aec6b5d-82e3-44ec-ae90-7c0ac72ba3b4.png",
  ];

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

          {/* Dashboard Preview */}
          <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative rounded-xl overflow-hidden border border-border/20 shadow-2xl bg-background">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {dashboardImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[16/10] w-full">
                        <img
                          src={image}
                          alt={`Dashboard Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
