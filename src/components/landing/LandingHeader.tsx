
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 1000 1000" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
            >
              <path d="M125 400C125 300 200 225 300 225H700C800 225 875 300 875 400V600C875 700 800 775 700 775H300C200 775 125 700 125 600V400Z" fill="currentColor"/>
              <path d="M200 350L200 500C200 520 216 536 236 536L764 536C784 536 800 520 800 500L800 350C800 330 784 314 764 314L236 314C216 314 200 330 200 350Z" fill="white"/>
              <path d="M180 320C160 320 140 340 140 360C140 380 160 400 180 400L820 400C840 400 860 380 860 360C860 340 840 320 820 320L180 320Z" fill="currentColor"/>
              <path d="M100 200L150 250L200 200L250 250L300 200L350 250L400 200L450 250L500 200L550 250L600 200L650 250L700 200L750 250L800 200L850 250L900 200" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">FeatherBiz</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Testimonials</a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
