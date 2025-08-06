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
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="p-4 shadow-lg bg-background border border-border">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies to improve your experience.
            You can opt out of certain cookies.{" "}
            <a 
              href="/privacy-policy" 
              className="text-foreground hover:underline font-medium"
            >
              Find out more in our privacy policy
            </a>.
          </p>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAccept}
              size="sm"
              className="bg-foreground hover:bg-foreground/90 text-background font-medium flex-1"
            >
              Continue
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDecline}
              size="sm"
              className="border-border hover:bg-muted flex-1"
            >
              Reject
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};