
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';
import { sessionSecurity } from '@/utils/sessionSecurity';

export function SessionTimeoutManager() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const handleSessionWarning = (event: CustomEvent) => {
      setTimeRemaining(event.detail.minutesRemaining);
      setShowWarning(true);
    };

    window.addEventListener('sessionWarning', handleSessionWarning as EventListener);

    return () => {
      window.removeEventListener('sessionWarning', handleSessionWarning as EventListener);
    };
  }, []);

  const handleExtendSession = async () => {
    const success = await sessionSecurity.refreshSession();
    if (success) {
      setShowWarning(false);
    }
  };

  const handleSignOut = () => {
    sessionSecurity.enhancedSignOut();
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Session Expiring Soon
        </AlertTitle>
        <AlertDescription className="mt-2">
          Your session will expire in {timeRemaining} minutes. Would you like to extend your session?
        </AlertDescription>
        <div className="flex gap-2 mt-3">
          <Button size="sm" onClick={handleExtendSession}>
            Extend Session
          </Button>
          <Button size="sm" variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Alert>
    </div>
  );
}
