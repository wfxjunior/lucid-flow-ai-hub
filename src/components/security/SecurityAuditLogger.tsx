
import { useEffect } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { securityEvent } from '@/utils/security';

interface SecurityAuditLoggerProps {
  children: React.ReactNode;
}

export function SecurityAuditLogger({ children }: SecurityAuditLoggerProps) {
  const { user } = useAuthState();

  useEffect(() => {
    if (user) {
      securityEvent('User session started', {
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString()
      });
    }

    return () => {
      if (user) {
        securityEvent('User session ended', {
          userId: user.id,
          timestamp: new Date().toISOString()
        });
      }
    };
  }, [user]);

  return <>{children}</>;
}
