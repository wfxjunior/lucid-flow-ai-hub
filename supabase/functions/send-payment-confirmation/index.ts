import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import React from 'npm:react@18.3.1';
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { PaymentConfirmationEmail } from './_templates/payment-confirmation.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentConfirmationRequest {
  customerEmail: string;
  customerName: string;
  planName: string;
  amount: string;
  currency: string;
  billingPeriod: string;
  trialDays?: number;
  nextBillingDate?: string;
  sessionId?: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatAmount = (amount: string, currency: string): string => {
  const numAmount = parseFloat(amount);
  if (currency.toLowerCase() === 'brl') {
    return `R$ ${(numAmount / 100).toFixed(2).replace('.', ',')}`;
  } else if (currency.toLowerCase() === 'usd') {
    return `$${(numAmount / 100).toFixed(2)}`;
  } else {
    return `${currency.toUpperCase()} ${(numAmount / 100).toFixed(2)}`;
  }
};

const getBillingPeriodText = (period: string): string => {
  switch (period.toLowerCase()) {
    case 'month':
    case 'monthly':
      return 'mês';
    case 'year':
    case 'annual':
    case 'yearly':
      return 'ano';
    default:
      return period;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[PAYMENT-CONFIRMATION] Starting payment confirmation email process');

    const body: PaymentConfirmationRequest = await req.json();
    console.log('[PAYMENT-CONFIRMATION] Request data:', {
      customerEmail: body.customerEmail,
      planName: body.planName,
      amount: body.amount,
      currency: body.currency,
      trialDays: body.trialDays
    });

    const {
      customerEmail,
      customerName,
      planName,
      amount,
      currency,
      billingPeriod,
      trialDays,
      nextBillingDate,
      sessionId
    } = body;

    if (!customerEmail || !customerName || !planName || !amount) {
      throw new Error('Missing required fields: customerEmail, customerName, planName, amount');
    }

    console.log('[PAYMENT-CONFIRMATION] Rendering email template');

    // Format data for display
    const formattedAmount = formatAmount(amount, currency);
    const formattedBillingPeriod = getBillingPeriodText(billingPeriod);
    const formattedNextBillingDate = nextBillingDate ? formatDate(nextBillingDate) : undefined;

    // Generate the email HTML using React Email
    const html = await renderAsync(
      React.createElement(PaymentConfirmationEmail, {
        customerName,
        planName,
        amount: formattedAmount,
        currency,
        billingPeriod: formattedBillingPeriod,
        trialDays,
        nextBillingDate: formattedNextBillingDate,
        invoiceUrl: sessionId ? `https://featherbiz.io/invoice/${sessionId}` : undefined
      })
    );

    console.log('[PAYMENT-CONFIRMATION] Email template rendered successfully');

    // Determine subject based on trial or regular payment
    const subject = trialDays 
      ? `🎉 Seu teste gratuito começou! - FeatherBiz ${planName}`
      : `✅ Pagamento confirmado - FeatherBiz ${planName}`;

    console.log('[PAYMENT-CONFIRMATION] Sending email via Resend');

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz Orders <orders@featherbiz.io>",
      to: [customerEmail],
      subject: subject,
      html: html,
    });

    console.log('[PAYMENT-CONFIRMATION] Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id,
      recipient: customerEmail,
      subject: subject
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('[PAYMENT-CONFIRMATION] Error sending payment confirmation email:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to send payment confirmation email'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});