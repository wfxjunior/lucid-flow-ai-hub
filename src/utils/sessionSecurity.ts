
import { supabase } from '@/integrations/supabase/client';
import { securityEvent, secureError } from './security';
import { secureStorage } from './secureStorage';

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
      if (await this.detectSuspiciousActivity()) {
        securityEvent('Suspicious session activity detected', {
          userId: session.user.id,
          timestamp: new Date().toISOString()
        });
      }

      // Call enhanced server-side validation
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

  async detectSuspiciousActivity(): Promise<boolean> {
    const currentFingerprint: DeviceFingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      timestamp: Date.now(),
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const storedFingerprint = await secureStorage.getItem('device_fingerprint', true);
    
    if (storedFingerprint) {
      try {
        // Check for significant changes that might indicate session hijacking
        if (storedFingerprint.userAgent !== currentFingerprint.userAgent ||
            storedFingerprint.platform !== currentFingerprint.platform ||
            storedFingerprint.timezone !== currentFingerprint.timezone) {
          
          securityEvent('Device fingerprint mismatch', {
            stored: storedFingerprint,
            current: currentFingerprint
          });
          
          return true;
        }
      } catch (error) {
        secureError('Fingerprint comparison failed', { error });
      }
    } else {
      // Store encrypted fingerprint for future checks
      await secureStorage.setItem('device_fingerprint', currentFingerprint, { 
        encrypt: true,
        expiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      });
    }

    return false;
  }

  private showSessionWarning(minutesRemaining: number) {
    // Create a simple warning toast or modal
    const warningEvent = new CustomEvent('sessionWarning', {
      detail: { minutesRemaining }
    });
    window.dispatchEvent(warningEvent);
    
    securityEvent('Session expiry warning shown', { minutesRemaining });
  }

  private async handleExpiredSession() {
    try {
      securityEvent('Handling expired session');
      await this.enhancedSignOut();
    } catch (error) {
      secureError('Failed to handle expired session', { error });
    }
  }

  private async handleInvalidSession() {
    try {
      securityEvent('Handling invalid session');
      await this.enhancedSignOut();
    } catch (error) {
      secureError('Failed to handle invalid session', { error });
    }
  }

  async enhancedSignOut() {
    try {
      this.stopSessionMonitoring();
      
      // Enhanced cleanup with secure storage
      await secureStorage.emergencyClear();
      
      // Enhanced cleanup - remove all potentially sensitive data
      const keysToRemove = Object.keys(localStorage).filter(key => 
        key.startsWith('supabase.auth.') || 
        key.includes('sb-') ||
        key.includes('session') ||
        key.includes('token')
      );
      
      keysToRemove.forEach(key => localStorage.removeItem(key));

      await supabase.auth.signOut({ scope: 'global' });
      
      securityEvent('Enhanced sign out completed');
      
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

  // Enhanced session refresh with security checks
  async refreshSession(): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        securityEvent('Session refresh failed', { error: error.message });
        return false;
      }
      
      if (data.session) {
        securityEvent('Session refreshed successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      secureError('Session refresh error', { error });
      return false;
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
  
  // Set up session warning listener
  window.addEventListener('sessionWarning', (event: CustomEvent) => {
    console.warn(`Session expires in ${event.detail.minutesRemaining} minutes`);
    // You can integrate with your toast/notification system here
  });
}
