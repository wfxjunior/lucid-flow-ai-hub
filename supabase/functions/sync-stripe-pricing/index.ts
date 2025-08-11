import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SyncBody {
  plan: string; // e.g., "pro"
  currency: string; // e.g., "USD"
  amount: number; // cents, e.g., 2500
  includes?: string[]; // feature slugs for metadata
}

const toStripeCurrency = (c: string) => (c || "USD").toLowerCase();

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const body = (await req.json()) as SyncBody;
    const planName = (body.plan || "pro").toUpperCase();
    const amount = Number(body.amount || 0);
    const currency = toStripeCurrency(body.currency);
    const includes = (body.includes || []).join(",");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Find or create Product "PRO"
    const prodList = await stripe.products.list({ active: true, limit: 100 });
    let product = prodList.data.find((p) => (p.name || "").toUpperCase() === planName);

    if (!product) {
      product = await stripe.products.create({ name: planName });
      console.log(`[SYNC] Created product ${planName}:`, product.id);
    } else {
      console.log(`[SYNC] Found product ${planName}:`, product.id);
    }

    // Ensure a single correct active monthly price
    const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
    const monthlyActive = prices.data.filter((p) => p.recurring?.interval === "month");

    // Deactivate mismatched active monthly prices
    for (const p of monthlyActive) {
      const mismatch = (p.unit_amount !== amount) || ((p.currency || "").toLowerCase() !== currency);
      if (mismatch) {
        await stripe.prices.update(p.id, { active: false });
        console.log(`[SYNC] Deactivated mismatched price ${p.id}`);
      }
    }

    // Find correct price if it now exists
    const refreshed = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
    let activeMonthly = refreshed.data.find(
      (p) => p.recurring?.interval === "month" && p.unit_amount === amount && (p.currency || "").toLowerCase() === currency
    );

    // Create if missing
    if (!activeMonthly) {
      activeMonthly = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency,
        recurring: { interval: "month" },
        metadata: {
          plan: body.plan || "pro",
          includes: includes || "",
        },
      });
      console.log(`[SYNC] Created price ${activeMonthly.id}`);
    } else {
      // Make sure metadata is up-to-date
      await stripe.prices.update(activeMonthly.id, {
        metadata: {
          plan: body.plan || "pro",
          includes: includes || "",
        },
      });
    }

    // Validation
    const mismatches: string[] = [];
    if (activeMonthly.unit_amount !== amount) mismatches.push(`unit_amount mismatch: ${activeMonthly.unit_amount} !== ${amount}`);
    if ((activeMonthly.currency || '').toUpperCase() !== body.currency.toUpperCase()) mismatches.push(`currency mismatch: ${(activeMonthly.currency || '').toUpperCase()} !== ${body.currency.toUpperCase()}`);
    if (!activeMonthly.recurring || activeMonthly.recurring.interval !== 'month') mismatches.push(`recurring interval mismatch`);

    if (mismatches.length > 0) {
      console.error('[SYNC] Validation failed', { mismatches });
      return new Response(JSON.stringify({ status: 'mismatch', mismatches }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log('OK: Stripe is in sync with pricing.json for PRO ($25/month).');

    return new Response(
      JSON.stringify({
        status: 'ok',
        priceMap: {
          pro: {
            productId: product.id,
            priceId: activeMonthly.id,
            currency: body.currency.toUpperCase(),
            amount: amount,
          },
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('[SYNC] Error', error);
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ status: 'error', error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
