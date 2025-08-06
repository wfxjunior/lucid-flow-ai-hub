
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  
  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className={`lg:col-span-6 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              <div className="max-w-2xl mx-auto lg:mx-0">
                
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  All-in-One Business Platform
                </div>
                
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                  The business platform behind
                  <br />
                  <span className="text-blue-600">thousands of companies.</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 font-light">
                  FeatherBiz is the AI-powered platform to manage quotes, appointments, 
                  smart schedules, and full project workflows.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="h-12 px-6 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200"
                  >
                    Start for free
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const pricingSection = document.getElementById("pricing");
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="h-12 px-6 text-base font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    Talk to sales
                  </Button>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Free forever plan
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    2-minute setup
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Dashboard Carousel */}
            <div className={`lg:col-span-6 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              <div className="relative">
                {/* Dashboard carousel */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">FeatherBiz Dashboard</div>
                  </div>
                  
                  <div className="p-0">
                    <Carousel
                      plugins={[
                        Autoplay({
                          delay: 4000,
                        }),
                      ]}
                      className="w-full"
                    >
                      <CarouselContent>
                        <CarouselItem>
                          <img
                            src="/lovable-uploads/d2be4c9e-3be5-4c4a-9024-0684a9c097c9.png"
                            alt="Dashboard Overview - Quick Actions Grid"
                            className="w-full h-auto object-cover"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src="/lovable-uploads/fdbb83e9-5346-40f8-aaca-92a742f58384.png"
                            alt="Client Projects Management"
                            className="w-full h-auto object-cover"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src="/lovable-uploads/eac2b331-42fb-4a74-aae1-148fca28691a.png"
                            alt="Sales Pipeline Overview"
                            className="w-full h-auto object-cover"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src="/lovable-uploads/2e975bb9-3a42-496b-8c01-507136c52a4c.png"
                            alt="Smart Schedule System"
                            className="w-full h-auto object-cover"
                          />
                        </CarouselItem>
                        <CarouselItem>
                          <img
                            src="/lovable-uploads/921ec0de-4f91-49eb-9f68-bdfefce23f2b.png"
                            alt="Export to Tax Software"
                            className="w-full h-auto object-cover"
                          />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-xl opacity-20 blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500 rounded-xl opacity-20 blur-xl"></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
