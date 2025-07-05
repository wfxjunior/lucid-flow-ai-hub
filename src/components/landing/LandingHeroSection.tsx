
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="lg:col-span-6">
              <div className="max-w-2xl mx-auto lg:mx-0">
                
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  All-in-One Business Platform
                </div>
                
                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                  Build Smarter.
                  <br />
                  <span className="text-blue-600">Run Faster.</span>
                  <br />
                  Grow Stronger.
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-10 font-light">
                  An all-in-one AI-powered platform to manage quotes, appointments, 
                  smart schedules, and full project workflows.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="h-14 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
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
                    className="h-14 px-8 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    View Pricing
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
            
            {/* Right Column - Dashboard Mockup */}
            <div className="lg:col-span-6 mt-16 lg:mt-0">
              <div className="relative">
                {/* Dashboard mockup placeholder */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">FeatherBiz Dashboard</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-6 bg-gray-200 rounded w-32"></div>
                        <div className="h-8 bg-blue-100 rounded-lg w-24"></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="h-4 bg-blue-200 rounded w-16 mb-2"></div>
                          <div className="h-8 bg-blue-300 rounded w-12"></div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="h-4 bg-green-200 rounded w-16 mb-2"></div>
                          <div className="h-8 bg-green-300 rounded w-12"></div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="h-4 bg-purple-200 rounded w-16 mb-2"></div>
                          <div className="h-8 bg-purple-300 rounded w-12"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
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
