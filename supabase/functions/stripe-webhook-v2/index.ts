
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

// Processed events store for idempotency
const processedEvents = new Set<string>();

const logWebhook = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[STRIPE-WEBHOOK-V2] ${timestamp} - ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  
  if (!signature) {
    logWebhook('No signature provided');
    return new Response("No signature", { status: 400 });
  }

  try {
    logWebhook('Processing webhook event');
    
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    logWebhook('Event received', { type: event.type, id: event.id });

    // Idempotency check
    if (processedEvents.has(event.id)) {
      logWebhook('Event already processed', { id: event.id });
      return new Response(JSON.stringify({ received: true, status: 'already_processed' }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      logWebhook('Processing checkout completion', {
        sessionId: session.id,
        mode: session.mode,
        customerEmail: session.customer_email,
        plan: session.metadata?.plan
      });

      if (session.mode === 'subscription') {
        await handleSubscriptionCreated(session);
      } else if (session.mode === 'payment') {
        await handlePaymentCompleted(session);
      }
    }

    // Handle subscription events
    else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdate(subscription, event.type);
    }

    // Handle invoice events
    else if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
    }

    // Mark event as processed
    processedEvents.add(event.id);
    
    return new Response(JSON.stringify({ received: true, event_type: event.type }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    logWebhook('Webhook error', { error: error.message });
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  logWebhook('Handling subscription creation', { sessionId: session.id });

  try {
    const customerEmail = session.customer_email;
    const plan = session.metadata?.plan || 'unknown';
    
    if (!customerEmail) {
      throw new Error('No customer email found');
    }

    // Update user subscription status
    const { error: updateError } = await supabaseClient
      .from('user_subscriptions')
      .upsert({
        user_email: customerEmail,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan_id: plan,
        plan_name: plan === 'monthly' ? 'Pro Monthly' : 'Pro Yearly',
        status: 'active',
        session_id: session.id,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_email' });

    if (updateError) {
      logWebhook('Error updating subscription', updateError);
      throw updateError;
    }

    logWebhook('Subscription provisioned successfully', { 
      email: customerEmail, 
      plan,
      sessionId: session.id 
    });

  } catch (error) {
    logWebhook('Error in handleSubscriptionCreated', { error: error.message });
    throw error;
  }
}

async function handlePaymentCompleted(session: Stripe.Checkout.Session) {
  logWebhook('Handling payment completion', { sessionId: session.id });

  try {
    const customerEmail = session.customer_email;
    const plan = session.metadata?.plan || 'unknown';
    
    if (!customerEmail) {
      throw new Error('No customer email found');
    }

    // Record one-time payment
    const { error: insertError } = await supabaseClient
      .from('payments')
      .insert({
        user_email: customerEmail,
        stripe_customer_id: session.customer,
        session_id: session.id,
        plan_id: plan,
        amount_total: session.amount_total,
        currency: session.currency,
        status: 'paid',
        created_at: new Date().toISOString()
      });

    if (insertError) {
      logWebhook('Error recording payment', insertError);
      throw insertError;
    }

    logWebhook('Payment recorded successfully', { 
      email: customerEmail, 
      plan,
      amount: session.amount_total 
    });

  } catch (error) {
    logWebhook('Error in handlePaymentCompleted', { error: error.message });
    throw error;
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription, eventType: string) {
  logWebhook('Handling subscription update', { 
    subscriptionId: subscription.id, 
    status: subscription.status,
    eventType 
  });

  try {
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
      logWebhook('Error updating subscription status', updateError);
      throw updateError;
    }

    logWebhook('Subscription updated successfully', { 
      subscriptionId: subscription.id,
      status 
    });

  } catch (error) {
    logWebhook('Error in handleSubscriptionUpdate', { error: error.message });
    throw error;
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  logWebhook('Handling invoice paid', { 
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription 
  });

  try {
    if (invoice.subscription) {
      // Ensure subscription is marked as active when invoice is paid
      const { error: updateError } = await supabaseClient
        .from('user_subscriptions')
        .update({
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', invoice.subscription);

      if (updateError) {
        logWebhook('Error updating subscription on invoice paid', updateError);
        throw updateError;
      }
    }

    logWebhook('Invoice payment processed successfully', { 
      invoiceId: invoice.id 
    });

  } catch (error) {
    logWebhook('Error in handleInvoicePaid', { error: error.message });
    throw error;
  }
}
