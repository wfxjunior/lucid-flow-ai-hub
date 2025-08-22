
// Content Security Policy and Security Headers
export const applySecurityHeaders = () => {
  // Apply security headers through meta tags
  const addMetaTag = (name: string, content: string) => {
    const existing = document.querySelector(`meta[name="${name}"]`);
    if (existing) {
      existing.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  // Prevent clickjacking
  addMetaTag('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  addMetaTag('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  addMetaTag('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (basic)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Relaxed for development
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:"
  ].join('; ');
  
  addMetaTag('Content-Security-Policy', csp);
};

// Enhanced client-side security validations
export const validateClientSideAccess = (resource: string) => {
  // Additional validation for sensitive operations
  const user = JSON.parse(localStorage.getItem('supabase.auth.token') || 'null');
  
  if (!user) {
    console.warn(`Unauthorized access attempt to ${resource}`);
    return false;
  }
  
  return true;
};
