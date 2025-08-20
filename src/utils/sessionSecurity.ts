
import { supabase } from '@/integrations/supabase/client';
import { securityEvent, secureError } from './security';

interface DeviceFingerprint {
  userAgent: string;
  language: string;
  platform: string;
  cookieEnabled: boolean;
  timestamp: number;
  screenResolution: string;
  timezone: string;
}

class SessionSecurityManager {
  private static instance: SessionSecurityManager;
  private sessionTimeout: number = 24 * 60 * 60 * 1000; // 24 hours
  private warningTimeout: number = 23 * 60 * 60 * 1000; // 23 hours (1 hour before expiry)
  private checkInterval: NodeJS.Timeout | null = null;
  private warningShown: boolean = false;

  static getInstance(): SessionSecurityManager {
    if (!SessionSecurityManager.instance) {
      SessionSecurityManager.instance = new SessionSecurityManager();
    }
    return SessionSecurityManager.instance;
  }

  startSessionMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Check session every 5 minutes
    this.checkInterval = setInterval(() => {
      this.validateSession();
    }, 5 * 60 * 1000);

    // Initial validation
    this.validateSession();
  }

  stopSessionMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.warningShown = false;
  }

  async validateSession(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        securityEvent('Session validation error', { error: error.message });
        return false;
      }

      if (!session) {
        return true; // No session is valid state
      }

      // Check session expiration and show warning
      const expiresAt = new Date(session.expires_at || 0).getTime();
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;
      
      if (expiresAt < now) {
        securityEvent('Session expired', { 
          expiresAt: session.expires_at,
          userId: session.user.id 
        });
        await this.handleExpiredSession();
        return false;
      }

      // Show warning if session expires in less than 1 hour
      if (timeUntilExpiry < 60 * 60 * 1000 && !this.warningShown) {
        this.showSessionWarning(Math.floor(timeUntilExpiry / (60 * 1000)));
        this.warningShown = true;
      }

      // Check for suspicious activity with enhanced fingerprinting
      if (this.detectSuspiciousActivity()) {
        securityEvent('Suspicious session activity detected', {
          userId: session.user.id,
          timestamp: new Date().toISOString()
        });
      }

      // Call server-side validation
      const { data: isValid } = await supabase.rpc('validate_session_security');
      
      if (!isValid) {
        await this.handleInvalidSession();
        return false;
      }

      return true;
    } catch (error) {
      secureError('Session validation failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return false;
    }
  }

  detectSuspiciousActivity(): boolean {
    const currentFingerprint: DeviceFingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      timestamp: Date.now(),
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const storedFingerprint = localStorage.getItem('device_fingerprint');
    
    if (storedFingerprint) {
      try {
        const stored: DeviceFingerprint = JSON.parse(storedFingerprint);
        
        // Check for significant changes that might indicate session hijacking
        if (stored.userAgent !== currentFingerprint.userAgent ||
            stored.platform !== currentFingerprint.platform ||
            stored.timezone !== currentFingerprint.timezone) {
          return true;
        }
      } catch (error) {
        // Invalid stored fingerprint, create new one
        localStorage.setItem('device_fingerprint', JSON.stringify(currentFingerprint));
      }
    } else {
      // Store fingerprint for future checks
      localStorage.setItem('device_fingerprint', JSON.stringify(currentFingerprint));
    }

    return false;
  }

  private showSessionWarning(minutesRemaining: number) {
    // Create a simple warning toast or modal
    const warningEvent = new CustomEvent('sessionWarning', {
      detail: { minutesRemaining }
    });
    window.dispatchEvent(warningEvent);
  }

  private async handleExpiredSession() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('device_fingerprint');
      window.location.href = '/auth';
    } catch (error) {
      secureError('Failed to handle expired session', { error });
    }
  }

  private async handleInvalidSession() {
    try {
      await supabase.auth.signOut({ scope: 'global' });
      localStorage.removeItem('device_fingerprint');
      window.location.href = '/auth';
    } catch (error) {
      secureError('Failed to handle invalid session', { error });
    }
  }

  async enhancedSignOut() {
    try {
      this.stopSessionMonitoring();
      localStorage.removeItem('device_fingerprint');
      
      // Enhanced cleanup - remove all potentially sensitive data
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('supabase.auth.') || 
        key.includes('sb-') ||
        key.includes('session') ||
        key.includes('token')
      );
      
      keysToRemove.forEach(key => localStorage.removeItem(key));

      await supabase.auth.signOut({ scope: 'global' });
      
      // Force redirect after cleanup
      setTimeout(() => {
        window.location.href = '/auth';
      }, 100);
    } catch (error) {
      secureError('Enhanced sign out failed', { error });
      // Force redirect even on error
      setTimeout(() => {
        window.location.href = '/auth';
      }, 100);
    }
  }
}

export const sessionSecurity = SessionSecurityManager.getInstance();

// Auto-start session monitoring when module loads
if (typeof window !== 'undefined') {
  sessionSecurity.startSessionMonitoring();
  
  // Apply security headers on load
  import('./contentSecurityPolicy').then(({ applySecurityHeaders }) => {
    applySecurityHeaders();
  });
}
