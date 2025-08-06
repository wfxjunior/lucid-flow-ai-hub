
import React from "react";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="bg-background border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">FeatherBiz</h3>
            <p className="text-muted-foreground leading-relaxed">
              The AI-native business platform that builds, scales and grows your company to the next level.
            </p>
            <div className="pt-4">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link to="/api" className="hover:text-foreground transition-colors">API</Link></li>
              <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/help-center" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
              <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-foreground transition-colors">Press</Link></li>
              <li><Link to="/partners" className="hover:text-foreground transition-colors">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 FeatherBiz. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link>
        </div>
      </div>
    </footer>
  );
};
