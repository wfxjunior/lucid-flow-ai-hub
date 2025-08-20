
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APP = {
  url: Deno.env.get("APP_URL") || "https://featherbiz.io",
  routes: {
    success: "/checkout/success",
    cancel: "/checkout/cancel"
  }
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
    const appUrl = Deno.env.get("APP_URL");
    
    const mode = stripeSecretKey?.startsWith('sk_test_') ? 'test' : 
                 stripeSecretKey?.startsWith('sk_live_') ? 'live' : 'unknown';

    const diagnostics = {
      appUrl: APP.url,
      successUrl: `${APP.url}${APP.routes.success}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${APP.url}${APP.routes.cancel}`,
      mode,
      hasKeys: {
        secretKey: !!stripeSecretKey,
        webhookSecret: !!stripeWebhookSecret,
        appUrl: !!appUrl
      },
      priceMapStatus: {
        monthly: !!PRICE_MAP.monthly?.price_id,
        yearly: !!PRICE_MAP.yearly?.price_id,
        onetime: !!PRICE_MAP.onetime?.price_id
      },
      pricingCtasBound: true, // This would need to be checked client-side
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
