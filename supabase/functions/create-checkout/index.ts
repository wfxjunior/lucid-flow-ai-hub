
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Configuração para múltiplas moedas baseada na localização
const getCurrencyByCountry = (country?: string) => {
  const currencyMap: { [key: string]: string } = {
    'BR': 'brl',
    'US': 'usd',
    'CA': 'cad',
    'GB': 'gbp',
    'EU': 'eur',
    'DE': 'eur',
    'FR': 'eur',
    'IT': 'eur',
    'ES': 'eur',
    'AU': 'aud',
    'JP': 'jpy',
    'MX': 'mxn',
    'AR': 'ars',
    'CL': 'clp',
    'CO': 'cop',
    'PE': 'pen',
  };
  
  return currencyMap[country?.toUpperCase() || ''] || 'usd';
};

// Multiplicadores de preço por moeda (baseado no poder de compra)
const getPriceMultiplier = (currency: string) => {
  const multipliers: { [key: string]: number } = {
    'usd': 1,
    'brl': 5.2,  // Real brasileiro
    'eur': 0.92, // Euro
    'gbp': 0.79, // Libra esterlina
    'cad': 1.36, // Dólar canadense
    'aud': 1.52, // Dólar australiano
    'jpy': 149,  // Iene japonês
    'mxn': 17,   // Peso mexicano
    'ars': 350,  // Peso argentino
    'clp': 900,  // Peso chileno
    'cop': 4000, // Peso colombiano
    'pen': 3.7,  // Sol peruano
  };
  
  return multipliers[currency] || 1;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    const { priceAmount, priceId, planName, planId, recurring, trialPeriodDays, annualBilling, country } = await req.json();
    
    console.log('Checkout request:', { priceAmount, priceId, planName, planId, recurring, trialPeriodDays, annualBilling, country });
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Detect currency based on country (used for metadata and payment methods only)
    const currency = getCurrencyByCountry(country);

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('Found existing customer:', customerId);
    } else {
      console.log('No existing customer found, will create new one');
    }

    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      mode: recurring ? "subscription" : "payment",
      success_url: `${req.headers.get("origin")}/?view=payment-success&plan=${planId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?view=pricing&canceled=true`,
      metadata: {
        user_id: user.id,
        plan_id: planId,
        plan_name: planName,
        billing_period: annualBilling ? 'annual' : 'monthly',
        currency: currency,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      automatic_tax: { enabled: true },
      payment_method_types: ['card'],
      ...(currency === 'brl' && { payment_method_types: ['card', 'boleto'] }),
      ...(currency === 'eur' && { payment_method_types: ['card', 'sepa_debit', 'ideal', 'bancontact'] }),
    };

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Missing priceId. Dynamic amounts are not allowed.' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    sessionConfig.line_items = [
      {
        price: priceId,
        quantity: 1,
      },
    ];

    // Add trial period for subscriptions
    if (recurring && trialPeriodDays && trialPeriodDays > 0) {
      sessionConfig.subscription_data = {
        trial_period_days: trialPeriodDays,
        metadata: {
          user_id: user.id,
          plan_id: planId,
          plan_name: planName,
          currency: currency,
        }
      };
      console.log('Added trial period:', trialPeriodDays, 'days');
    }

    console.log('Creating Stripe checkout session with config:', JSON.stringify(sessionConfig, null, 2));

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('Stripe session created successfully:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
