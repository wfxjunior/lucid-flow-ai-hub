
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
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const { session_id } = await req.json();
    
    if (!session_id) {
      throw new Error("session_id is required");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    console.log('[GET-SESSION] Session retrieved:', session.id);

    // Return relevant session data
    const sessionData = {
      id: session.id,
      customer_email: session.customer_email,
      amount_total: session.amount_total,
      currency: session.currency,
      status: session.status,
      metadata: session.metadata
    };

    return new Response(
      JSON.stringify(sessionData),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('[GET-SESSION] Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: { 
          code: 'session_retrieval_failed', 
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
