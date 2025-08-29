
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlatformDropdown } from "@/components/navigation/PlatformDropdown";
import { ProductsDropdown } from "@/components/navigation/ProductsDropdown";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const LandingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="FeatherBiz home">
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                alt="FeatherBiz" 
                className="h-48 w-auto md:h-36"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between flex-1">
            <nav className="flex items-center space-x-8 ml-12">
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile navigation links */}
            <div className="space-y-4">
              <div className="pb-2">
                <PlatformDropdown />
              </div>
              <div className="pb-2">
                <ProductsDropdown />
              </div>
              <a href="#customers" className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2">
                Customers
              </a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2">
                Pricing
              </a>
            </div>

            {/* Mobile CTA buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <Link to="/dashboard" className="block">
                <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
