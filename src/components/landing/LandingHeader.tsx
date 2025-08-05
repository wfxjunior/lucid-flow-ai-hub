
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingHeader = () => {
  const navigate = useNavigate();
  
  return (
    <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary tracking-tight">FeatherBiz</span>
        </div>
        
        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Testimonials
          </a>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl"
          >
            Get Started
          </Button>
        </div>
        
      </div>
    </header>
  );
};
