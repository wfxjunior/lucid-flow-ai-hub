
import React from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LandingFooter = () => (
  <footer className="bg-background border-t py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 sm:mb-12">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-start">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-blue-900">FeatherBiz</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The complete business management platform designed for modern entrepreneurs and growing companies.
          </p>
          <div className="flex items-center space-x-4 mb-2">
            <LanguageSelector />
          </div>
        </div>
        {/* Platform */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="/features-overview" className="text-muted-foreground hover:text-primary transition-colors">
                {useLanguage().t("featuresOverview.link")}
              </Link>
            </li>
            <li>
              <Link to="/integrations" className="text-muted-foreground hover:text-primary transition-colors">
                Integrations
              </Link>
            </li>
            <li>
              <Link to="/api" className="text-muted-foreground hover:text-primary transition-colors">
                API
              </Link>
            </li>
            <li>
              <Link to="/security" className="text-muted-foreground hover:text-primary transition-colors">
                Security
              </Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help-center" className="text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/referrals" className="text-muted-foreground hover:text-primary transition-colors">
                Referrals
              </Link>
            </li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                Guides
              </Link>
            </li>
            <li>
              <Link to="/webinars" className="text-muted-foreground hover:text-primary transition-colors">
                Webinars
              </Link>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/press" className="text-muted-foreground hover:text-primary transition-colors">
                Press
              </Link>
            </li>
            <li>
              <Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors">
                Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-muted-foreground text-sm text-center sm:text-left">
          © 2025 FeatherBiz. By FX American Group.
        </p>
        <div className="flex items-center space-x-6">
          <a href="https://www.instagram.com/featherbiz/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
