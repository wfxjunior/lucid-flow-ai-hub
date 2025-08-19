
// Stripe configuration with environment-based key management
export const STRIPE_CONFIG = {
  mode: (import.meta.env.VITE_STRIPE_MODE || 'test') as 'test' | 'live',
  publicKey: import.meta.env.VITE_STRIPE_MODE === 'live' 
    ? import.meta.env.VITE_STRIPE_PUBLIC_KEY_LIVE 
    : import.meta.env.VITE_STRIPE_PUBLIC_KEY_TEST,
  appUrl: import.meta.env.VITE_APP_URL || 'https://featherbiz.io',
} as const;

// Single source of truth for pricing
export const PRICE_MAP = {
  free: null,
  monthly: { 
    price_id: "price_1RxyoZLNAKclymUukQbcGNTL", // $26/month - from your existing config
    mode: "subscription" as const 
  },
  yearly: { 
    price_id: "price_yearly_featherbiz", // You'll need to create this in Stripe
    mode: "subscription" as const 
  },
  onetime: { 
    price_id: "price_onetime_featherbiz", // If needed
    mode: "payment" as const 
  }
} as const;

export type PlanType = keyof typeof PRICE_MAP;

// Validation function
export function validatePlan(plan: string): plan is PlanType {
  return plan in PRICE_MAP;
}

export function getPriceConfig(plan: PlanType) {
  const config = PRICE_MAP[plan];
  if (!config) {
    throw new Error(`Invalid plan: ${plan}`);
  }
  return config;
}

// Environment validation
export function validateStripeConfig() {
  const errors: string[] = [];
  
  if (!STRIPE_CONFIG.publicKey) {
    errors.push('Missing Stripe public key');
  }
  
  if (!STRIPE_CONFIG.appUrl) {
    errors.push('Missing APP_URL');
  }
  
  if (errors.length > 0) {
    throw new Error(`Stripe configuration errors: ${errors.join(', ')}`);
  }
}
