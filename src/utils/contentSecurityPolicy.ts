
/**
 * Content Security Policy utilities
 */

// Generate nonce for inline scripts (if needed)
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// CSP directives for secure content loading
export const getCSPDirectives = (nonce?: string) => {
  const directives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-eval'", // Required for Vite in development
      "https://js.stripe.com",
      "https://checkout.stripe.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-components and CSS-in-JS
      "https://fonts.googleapis.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "blob:"
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com",
      "data:"
    ],
    'connect-src': [
      "'self'",
      "https://tvdromfazjzargvesruq.supabase.co",
      "https://api.stripe.com",
      "wss://tvdromfazjzargvesruq.supabase.co"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com",
      "https://checkout.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'block-all-mixed-content': []
  };

  if (nonce) {
    directives['script-src'].push(`'nonce-${nonce}'`);
  }

  return directives;
};

// Convert CSP directives to header string
export const buildCSPHeader = (directives: Record<string, string[]>): string => {
  return Object.entries(directives)
    .map(([key, values]) => {
      if (values.length === 0) return key;
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
};

// Security headers for the application
export const getSecurityHeaders = () => {
  const cspDirectives = getCSPDirectives();
  
  return {
    'Content-Security-Policy': buildCSPHeader(cspDirectives),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), location=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };
};
