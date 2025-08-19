
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Price mapping - single source of truth
const PRICE_MAP = {
  free: null,
  monthly: { 
    price_id: "price_1RxyoZLNAKclymUukQbcGNTL", // $26/month
    mode: "subscription" as const 
  },
  yearly: { 
    price_id: "price_yearly_featherbiz", // Create this in Stripe dashboard
    mode: "subscription" as const 
  },
  onetime: { 
    price_id: "price_onetime_featherbiz", // If needed
    mode: "payment" as const 
  }
} as const;

type PlanType = keyof typeof PRICE_MAP;

const validateEnvironment = () => {
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  
  if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  
  return { stripeKey, webhookSecret };
};

const validatePlan = (plan: string): plan is PlanType => {
  return plan in PRICE_MAP;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[CHECKOUT-CREATE] Starting checkout creation process');
    
    // Validate environment
    const { stripeKey } = validateEnvironment();
    
    // Parse request
    const { plan, quantity = 1, coupon, email } = await req.json();
    console.log('[CHECKOUT-CREATE] Request data:', { plan, quantity, coupon, email });
    
    // Validate plan
    if (!validatePlan(plan)) {
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'invalid_plan', 
            message: `Invalid plan: ${plan}. Available plans: ${Object.keys(PRICE_MAP).join(', ')}` 
          } 
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Handle free plan
    if (plan === 'free') {
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'free_plan_no_checkout', 
            message: 'Free plan does not require checkout. Please use signup flow.' 
          } 
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const priceConfig = PRICE_MAP[plan];
    const appUrl = req.headers.get("origin") || "https://featherbiz.io";
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    console.log('[CHECKOUT-CREATE] Creating session with:', { 
      price_id: priceConfig.price_id, 
      mode: priceConfig.mode,
      plan 
    });

    // Create checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: priceConfig.mode,
      line_items: [
        {
          price: priceConfig.price_id,
          quantity: quantity
        }
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      billing_address_collection: "auto",
      customer_creation: "always",
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      metadata: {
        plan,
        source: "pricing_cta"
      }
    };

    // Add customer email if provided
    if (email) {
      sessionConfig.customer_email = email;
    }

    // Add coupon if provided
    if (coupon) {
      sessionConfig.discounts = [{ coupon }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    console.log('[CHECKOUT-CREATE] Session created successfully:', {
      id: session.id,
      url: session.url,
      plan,
      price_id: priceConfig.price_id,
      mode: priceConfig.mode
    });

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }), 
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('[CHECKOUT-CREATE] Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: { 
          code: 'checkout_creation_failed', 
          message: error.message 
        } 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
