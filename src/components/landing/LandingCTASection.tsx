
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Start your smarter business
          <br />
          journey today
        </h2>
        
        <p className="text-xl sm:text-2xl mb-12 text-blue-100 leading-relaxed font-light max-w-3xl mx-auto">
          Join thousands of businesses that have already transformed their operations with FeatherBiz
        </p>
        
        {/* CTA Button */}
        <Button
          onClick={() => navigate('/auth')}
          size="lg"
          className="h-16 px-10 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 mb-8"
        >
          Try Free – No Card Required
          <ArrowRight className="ml-3 w-6 h-6" />
        </Button>
        
        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">Setup in under 2 minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-sm font-medium">Free forever plan available</span>
          </div>
        </div>
        
      </div>
    </section>
  );
};
