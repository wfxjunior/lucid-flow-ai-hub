
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICE_MAP = {
  free: null,
  monthly: { 
    price_id: "price_1RxyoZLNAKclymUukQbcGNTL", // $26/month
    mode: "subscription" as const 
  },
  yearly: { 
    price_id: "price_yearly_featherbiz", // Create this in Stripe
    mode: "subscription" as const 
  },
  onetime: { 
    price_id: "price_onetime_featherbiz", // If needed
    mode: "payment" as const 
  }
} as const;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    
    const mode = stripeSecretKey?.startsWith('sk_test_') ? 'test' : 
                 stripeSecretKey?.startsWith('sk_live_') ? 'live' : 'unknown';

    const diagnostics = {
      mode,
      hasKeys: {
        secretKey: !!stripeSecretKey,
        webhookSecret: !!stripeWebhookSecret,
        supabaseUrl: !!supabaseUrl
      },
      priceMapStatus: {
        monthly: !!PRICE_MAP.monthly?.price_id,
        yearly: !!PRICE_MAP.yearly?.price_id,
        onetime: !!PRICE_MAP.onetime?.price_id
      },
      urls: {
        successUrl: "APP_URL/checkout/success?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: "APP_URL/pricing?canceled=true"
      },
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(diagnostics, null, 2),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
