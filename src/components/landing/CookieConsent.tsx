import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
      <Card className="max-w-4xl mx-auto p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              We use cookies
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
              You can manage your preferences or learn more about our cookie policy in our{" "}
              <a 
                href="/privacy-policy" 
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </a>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Accept All Cookies
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="border-border hover:bg-muted"
              >
                Decline
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href="/privacy-policy">Cookie Settings</a>
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};