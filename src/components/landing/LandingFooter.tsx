
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export const LandingFooter = () => {
  const location = useLocation();
  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/landing' || location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('pricing');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-foreground">FeatherBiz</h3>
            <div className="pt-4">
              <LanguageSelector />
            </div>
          </div>

          {/* Link Groups - force 2 columns on mobile, 3 on md+ */}
          <nav aria-label="Footer navigation" className="col-span-2 md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Platform */}
            <div className="grid grid-cols-[auto,1fr] items-start gap-x-6 gap-y-2 md:block">
              <h4 className="text-sm font-semibold text-muted-foreground md:text-base mb-1 md:mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                <li><Link to={location.pathname === '/landing' || location.pathname === '/' ? '#pricing' : '/landing#pricing'} onClick={handlePricingClick} className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Pricing</Link></li>
                <li><Link to="/features" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Features</Link></li>
                <li><Link to="/integrations" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Integrations</Link></li>
                <li><Link to="/api" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">API</Link></li>
                <li><Link to="/security" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Security</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="grid grid-cols-[auto,1fr] items-start gap-x-6 gap-y-2 md:block">
              <h4 className="text-sm font-semibold text-muted-foreground md:text-base mb-1 md:mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                <li><Link to="/help-center" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Help Center</Link></li>
                <li><Link to="/documentation" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Documentation</Link></li>
                <li><Link to="/guides" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Guides</Link></li>
                <li><Link to="/community" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Community</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="grid grid-cols-[auto,1fr] items-start gap-x-6 gap-y-2 md:block">
              <h4 className="text-sm font-semibold text-muted-foreground md:text-base mb-1 md:mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                <li><Link to="/about" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">About</Link></li>
                <li><Link to="/careers" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Careers</Link></li>
                <li><Link to="/press" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Press</Link></li>
                <li><Link to="/partners" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Partners</Link></li>
                <li><Link to="/investors" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Investors</Link></li>
                <li><Link to="/blog" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Blog</Link></li>
              </ul>
            </div>
          </div>
          </nav>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col items-center gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            © 2025 FeatherBiz. By XSenSys
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover-scale text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover-scale text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover-scale text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover-scale text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="hover-scale text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <Link to="/privacy-policy" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Terms of Service</Link>
          <Link to="/feedback" className="text-foreground/90 hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">Feedback</Link>
        </div>
      </div>
    </footer>
  );
};
