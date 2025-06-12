
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating unsubscribed state");
      await supabaseClient.from("user_subscriptions").upsert({
        user_id: user.id,
        stripe_customer_id: null,
        plan_id: "free",
        plan_name: "Free",
        status: "inactive",
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
      return new Response(JSON.stringify({ 
        subscribed: false, 
        plan_id: "free",
        plan_name: "Free",
        current_period_end: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });

    // Also check for trialing subscriptions
    const trialingSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "trialing",
      limit: 10,
    });

    const allActiveSubscriptions = [...subscriptions.data, ...trialingSubscriptions.data];
    const hasActiveSub = allActiveSubscriptions.length > 0;
    let planName = "Free";
    let planId = "free";
    let currentPeriodEnd = null;

    if (hasActiveSub) {
      const subscription = allActiveSubscriptions[0];
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { 
        subscriptionId: subscription.id, 
        endDate: currentPeriodEnd,
        status: subscription.status
      });
      
      // Get price information to determine plan
      const priceId = subscription.items.data[0].price.id;
      const price = await stripe.prices.retrieve(priceId);
      const amount = price.unit_amount || 0;
      const isAnnual = price.recurring?.interval === 'year';
      
      logStep("Price details", { priceId, amount, interval: price.recurring?.interval });
      
      // Improved plan determination logic
      if (amount >= 29000) { // $290 annual
        planName = "Professional Annual";
        planId = "professional-annual";
      } else if (amount >= 2900) { // $29 monthly
        planName = "Professional Monthly";
        planId = "professional-monthly";
      } else if (amount >= 999) { // Any other plan above $9.99
        planName = isAnnual ? "Basic Annual" : "Basic Monthly";
        planId = isAnnual ? "basic-annual" : "basic-monthly";
      } else {
        // Default to professional if we can't determine
        planName = isAnnual ? "Professional Annual" : "Professional Monthly";
        planId = isAnnual ? "professional-annual" : "professional-monthly";
      }
      
      logStep("Determined subscription plan", { priceId, amount, planName, planId });

      await supabaseClient.from("user_subscriptions").upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        plan_id: planId,
        plan_name: planName,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    } else {
      logStep("No active subscription found");
      await supabaseClient.from("user_subscriptions").upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        plan_id: "free",
        plan_name: "Free",
        status: "inactive",
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }

    logStep("Updated database with subscription info", { subscribed: hasActiveSub, planName, planId });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      plan_id: planId,
      plan_name: planName,
      current_period_end: currentPeriodEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
