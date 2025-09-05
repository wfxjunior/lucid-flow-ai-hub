
import React from "react";
import { Link } from "react-router-dom";

export const LandingFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo-section">
          <img 
            src="/lovable-uploads/21df0057-3683-4438-add9-9b79e6ee096c.png" 
            alt="FeatherBiz Logo" 
            className="footer-logo"
          />
        </div>

        {/* Main Footer Links */}
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Platform</h4>
            <Link to="/dashboard">CRM Platform</Link>
            <Link to="/dashboard">Automations</Link>
            <Link to="/dashboard">Insights</Link>
          </div>

          <div className="footer-column">
            <h4>Products</h4>
            <a href="#customers">Customers</a>
            <a href="#pricing">Pricing</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/investors">Investors</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/developers">Developers</Link>
            <Link to="/downloads">Downloads</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 FeatherBiz. All rights reserved.</p>
      </div>
    </footer>
  );
};
