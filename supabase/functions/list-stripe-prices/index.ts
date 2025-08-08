import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // List active products
    const products = await stripe.products.list({ active: true, limit: 20 });

    // For each product, get its active prices
    const results: any[] = [];
    for (const product of products.data) {
      const prices = await stripe.prices.list({ product: product.id, active: true, limit: 20 });
      results.push({
        id: product.id,
        name: product.name,
        description: product.description,
        metadata: product.metadata || {},
        prices: prices.data.map((p) => ({
          id: p.id,
          currency: p.currency,
          unit_amount: p.unit_amount,
          recurring: p.recurring ? { interval: p.recurring.interval } : null,
        })),
      });
    }

    return new Response(JSON.stringify({ products: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
