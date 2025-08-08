
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export const LandingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onPricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLanding = location.pathname === '/landing' || location.pathname === '/';
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <header className="w-full border-b border-border/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-foreground tracking-tight">FeatherBiz</span>
        </div>
        
        {/* Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <span className="font-medium">Platform</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <span className="font-medium">Resources</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Customers
          </a>
          <a href="/landing#pricing" onClick={onPricingClick} className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Pricing
          </a>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="text-muted-foreground hover:text-foreground font-medium px-4"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 rounded-lg"
          >
            Start for free
          </Button>
        </div>
        
      </div>
    </header>
  );
};
