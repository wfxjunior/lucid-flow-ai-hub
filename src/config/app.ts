export const APP = {
  url: import.meta.env.VITE_APP_URL || "https://featherbiz.io",
  www: "https://www.featherbiz.io",
  routes: {
    createCheckout: "/api/checkout/create",
    success: "/checkout/success",
    cancel: "/checkout/cancel", 
    pricing: "/pricing",
    portal: "/api/billing/portal"
  },
  stripe: {
    mode: import.meta.env.VITE_STRIPE_MODE || "test",
    // Only keep public key in frontend - secret keys moved to backend
    pk: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    // SECURITY FIX: Removed hardcoded secret keys from frontend
    // These are now handled securely in Supabase edge functions
  }
};

// Helper functions
export const getAbsoluteUrl = (path: string) => `${APP.url}${path}`;
export const getSuccessUrl = (sessionId?: string) => 
  `${APP.url}${APP.routes.success}${sessionId ? `?session_id=${sessionId}` : '?session_id={CHECKOUT_SESSION_ID}'}`;
export const getCancelUrl = () => `${APP.url}${APP.routes.cancel}`;
