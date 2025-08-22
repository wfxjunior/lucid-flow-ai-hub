
/**
 * Enhanced Content Security Policy utilities
 */

// Generate nonce for inline scripts (if needed)
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
};

// Enhanced CSP directives for secure content loading
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
    'block-all-mixed-content': [],
    'upgrade-insecure-requests': []
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

// Enhanced security headers for the application
export const getSecurityHeaders = () => {
  const cspDirectives = getCSPDirectives();
  
  return {
    'Content-Security-Policy': buildCSPHeader(cspDirectives),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), location=(), payment=(), usb=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  };
};

// Apply security headers to the document
export const applySecurityHeaders = () => {
  const headers = getSecurityHeaders();
  
  // Apply CSP via meta tag if not set by server
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = headers['Content-Security-Policy'];
    document.head.appendChild(cspMeta);
  }
  
  // Add other security-related meta tags
  const securityMetas = [
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' }
  ];
  
  securityMetas.forEach(meta => {
    const existingMeta = document.querySelector(
      `meta[${meta.name ? 'name' : 'http-equiv'}="${meta.name || meta.httpEquiv}"]`
    );
    
    if (!existingMeta) {
      const metaElement = document.createElement('meta');
      if (meta.name) {
        metaElement.name = meta.name;
      } else if (meta.httpEquiv) {
        metaElement.httpEquiv = meta.httpEquiv;
      }
      metaElement.content = meta.content;
      document.head.appendChild(metaElement);
    }
  });
};
