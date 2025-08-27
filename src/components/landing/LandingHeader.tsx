
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlatformDropdown } from "@/components/navigation/PlatformDropdown";
import { ProductsDropdown } from "@/components/navigation/ProductsDropdown";

export const LandingHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="FeatherBiz home">
            <div className="h-32 flex items-center justify-center">
              <img 
                src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                alt="FeatherBiz" 
                className="h-32 w-auto"
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <PlatformDropdown />
            <ProductsDropdown />
            <a href="#customers" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Customers</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
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
