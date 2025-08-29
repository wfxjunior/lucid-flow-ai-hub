
import React from "react";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                alt="FeatherBiz" 
                className="h-8 w-auto object-contain"
                style={{ width: '32px', height: '51px', objectFit: 'contain' }}
              />
              <span className="text-xl font-bold">FeatherBiz</span>
            </div>
            <p className="text-gray-400 mb-4">
              All-in-one business platform for modern entrepreneurs. Organize, send, and grow your business.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
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
