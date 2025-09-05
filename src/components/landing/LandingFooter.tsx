
import React from "react";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/21df0057-3683-4438-add9-9b79e6ee096c.png" 
              alt="FeatherBiz" 
              className="h-20 w-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              All-in-one business platform for modern entrepreneurs. Organize, send, and grow your business.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors text-sm">CRM Platform</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors text-sm">Automations</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors text-sm">Insights</Link></li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#customers" className="hover:text-white transition-colors text-sm">Customers</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors text-sm">Testimonials</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FeatherBiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
