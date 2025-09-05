
import React from "react";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  return (
    <footer className="footer bg-gray-900 text-white">
      <div className="footer-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="footer-column lg:col-span-1">
            <img 
              src="/lovable-uploads/21df0057-3683-4438-add9-9b79e6ee096c.png" 
              alt="FeatherBiz Logo" 
              className="footer-logo h-20 w-auto mb-4"
            />
            <p className="footer-text text-gray-400 text-sm leading-relaxed max-w-xs">
              All-in-one business platform for modern entrepreneurs. <br />
              Organize, send, and grow your business.
            </p>
          </div>

          {/* Platform Links */}
          <div className="footer-column">
            <h4 className="font-semibold mb-4 text-white">Platform</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">CRM Platform</Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Automations</Link>
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Insights</Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-column">
            <h4 className="font-semibold mb-4 text-white">Products</h4>
            <div className="flex flex-col space-y-3">
              <a href="#customers" className="text-gray-400 hover:text-white transition-colors text-sm">Customers</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm">Testimonials</a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
              <Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link>
              <Link to="/investors" className="text-gray-400 hover:text-white transition-colors text-sm">Investors</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 FeatherBiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
