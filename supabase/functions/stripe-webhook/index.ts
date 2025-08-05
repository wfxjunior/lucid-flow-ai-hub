import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } }
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  if (!signature) {
    console.log('[STRIPE-WEBHOOK] No signature provided');
    return new Response("No signature", { status: 400 });
  }

  try {
    console.log('[STRIPE-WEBHOOK] Processing webhook event');
    
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log('[STRIPE-WEBHOOK] Event type:', event.type);

    // Handle successful payment events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('[STRIPE-WEBHOOK] Processing completed checkout session:', session.id);

      // Get customer details
      const customer = await stripe.customers.retrieve(session.customer as string);
      console.log('[STRIPE-WEBHOOK] Retrieved customer:', (customer as any).email);

      // Get subscription details if this is a subscription
      let subscription = null;
      let trialDays = null;
      let nextBillingDate = null;
      
      if (session.subscription) {
        subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        trialDays = subscription.trial_end ? 
          Math.ceil((subscription.trial_end * 1000 - Date.now()) / (1000 * 60 * 60 * 24)) : null;
        nextBillingDate = subscription.current_period_end ? 
          new Date(subscription.current_period_end * 1000).toISOString() : null;
        console.log('[STRIPE-WEBHOOK] Subscription details:', { trialDays, nextBillingDate });
      }

      // Extract metadata
      const planName = session.metadata?.plan_name || 'Professional';
      const billingPeriod = session.metadata?.billing_period || 'monthly';
      const customerName = (customer as any).name || (customer as any).email?.split('@')[0] || 'Cliente';

      console.log('[STRIPE-WEBHOOK] Sending payment confirmation email');

      // Send payment confirmation email
      const emailData = {
        customerEmail: (customer as any).email,
        customerName: customerName,
        planName: planName,
        amount: session.amount_total?.toString() || '0',
        currency: session.currency || 'usd',
        billingPeriod: billingPeriod,
        trialDays: trialDays,
        nextBillingDate: nextBillingDate,
        sessionId: session.id
      };

      const emailResponse = await supabaseClient.functions.invoke('send-payment-confirmation', {
        body: emailData
      });

      if (emailResponse.error) {
        console.error('[STRIPE-WEBHOOK] Error sending payment confirmation email:', emailResponse.error);
      } else {
        console.log('[STRIPE-WEBHOOK] Payment confirmation email sent successfully');
      }

      // Update user subscription status in database
      try {
        const { error: updateError } = await supabaseClient
          .from('user_subscriptions')
          .upsert({
            user_id: session.metadata?.user_id,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            plan_id: session.metadata?.plan_id || 'professional',
            plan_name: planName,
            status: 'active',
            current_period_end: nextBillingDate,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (updateError) {
          console.error('[STRIPE-WEBHOOK] Error updating subscription:', updateError);
        } else {
          console.log('[STRIPE-WEBHOOK] Subscription status updated successfully');
        }
      } catch (dbError) {
        console.error('[STRIPE-WEBHOOK] Database error:', dbError);
      }
    }

    // Handle subscription events
    else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('[STRIPE-WEBHOOK] Processing subscription event:', event.type);

      // Update subscription status
      const status = subscription.status === 'active' ? 'active' : 'inactive';
      const nextBillingDate = subscription.current_period_end ? 
        new Date(subscription.current_period_end * 1000).toISOString() : null;

      const { error: updateError } = await supabaseClient
        .from('user_subscriptions')
        .update({
          status: status,
          current_period_end: nextBillingDate,
          updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', subscription.id);

      if (updateError) {
        console.error('[STRIPE-WEBHOOK] Error updating subscription status:', updateError);
      } else {
        console.log('[STRIPE-WEBHOOK] Subscription status updated:', status);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('[STRIPE-WEBHOOK] Webhook error:', error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});