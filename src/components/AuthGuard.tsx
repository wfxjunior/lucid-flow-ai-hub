
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { securityEvent } from '@/utils/security';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        securityEvent('Unauthorized access attempt blocked', {
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
        navigate('/auth');
      }
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
