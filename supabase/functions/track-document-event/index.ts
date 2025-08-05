import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface TrackEventRequest {
  token: string;
  eventType: 'viewed' | 'payment_link_clicked' | 'payment_received' | 'receipt_viewed';
  clientInfo?: {
    ip?: string;
    userAgent?: string;
  };
  paymentInfo?: {
    amount?: number;
    method?: string;
    reference?: string;
  };
}

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[TRACK-DOCUMENT-EVENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { token, eventType, clientInfo, paymentInfo }: TrackEventRequest = await req.json();
    logStep("Received tracking request", { token, eventType });

    if (!token || !eventType) {
      throw new Error("Token and eventType are required");
    }

    // Find the document by tracking token
    const { data: documents, error: docError } = await supabaseClient
      .from('invoices')
      .select(`
        id, user_id, invoice_number, title, amount, status,
        client_id, 
        clients(name, email)
      `)
      .eq('tracking_token', token)
      .limit(1);

    if (docError) {
      logStep("Error finding document", { error: docError });
      throw new Error(`Failed to find document: ${docError.message}`);
    }

    let document = documents?.[0];
    let documentType = 'invoice';

    // If not found in invoices, check other document types
    if (!document) {
      const tables = [
        { table: 'estimates', numberField: 'estimate_number' },
        { table: 'quotes', numberField: 'quote_number' },
        { table: 'contracts', numberField: 'contract_number' },
        { table: 'work_orders', numberField: 'work_order_number' },
        { table: 'bids', numberField: 'bid_number' },
        { table: 'business_proposals', numberField: 'proposal_number' }
      ];

      for (const { table, numberField } of tables) {
        const { data, error } = await supabaseClient
          .from(table)
          .select(`
            id, user_id, ${numberField} as document_number, title, amount, status,
            client_id,
            clients(name, email)
          `)
          .eq('tracking_token', token)
          .limit(1);

        if (!error && data?.[0]) {
          document = data[0];
          documentType = table.slice(0, -1); // Remove 's' from table name
          break;
        }
      }
    }

    if (!document) {
      logStep("Document not found", { token });
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    logStep("Document found", { documentId: document.id, documentType });

    // Get document owner info
    const { data: ownerData, error: ownerError } = await supabaseClient.auth.admin.getUserById(document.user_id);
    if (ownerError) {
      logStep("Error getting owner info", { error: ownerError });
      throw new Error(`Failed to get owner info: ${ownerError.message}`);
    }

    const ownerEmail = ownerData.user?.email;
    if (!ownerEmail) {
      throw new Error("Owner email not found");
    }

    // Insert tracking event
    const eventData = {
      user_id: document.user_id,
      document_id: document.id,
      document_type: documentType,
      document_number: document.document_number || document.invoice_number,
      event_type: eventType,
      client_email: document.clients?.email || 'unknown@email.com',
      client_name: document.clients?.name || 'Unknown Client',
      client_ip: clientInfo?.ip,
      user_agent: clientInfo?.userAgent,
      amount: paymentInfo?.amount || document.amount,
      payment_method: paymentInfo?.method,
      payment_reference: paymentInfo?.reference,
      tracking_token: token,
      metadata: { clientInfo, paymentInfo }
    };

    const { error: insertError } = await supabaseClient
      .from('document_events')
      .insert(eventData);

    if (insertError) {
      logStep("Error inserting event", { error: insertError });
      throw new Error(`Failed to insert event: ${insertError.message}`);
    }

    logStep("Event inserted successfully");

    // Update document status if payment received
    if (eventType === 'payment_received') {
      const { error: updateError } = await supabaseClient
        .from(documentType === 'invoice' ? 'invoices' : `${documentType}s`)
        .update({ status: 'paid' })
        .eq('id', document.id);

      if (updateError) {
        logStep("Error updating document status", { error: updateError });
      } else {
        logStep("Document status updated to paid");
      }
    }

    // Send notification emails
    await sendNotificationEmails(eventType, document, ownerEmail, paymentInfo);

    // Return tracking pixel for viewed events
    if (eventType === 'viewed' || eventType === 'receipt_viewed') {
      const pixel = new Uint8Array([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x21, 0xF9, 0x04,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
        0x02, 0x04, 0x01, 0x00, 0x3B
      ]);

      return new Response(pixel, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/gif",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    logStep("ERROR", { message: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

async function sendNotificationEmails(eventType: string, document: any, ownerEmail: string, paymentInfo?: any) {
  const clientName = document.clients?.name || 'Unknown Client';
  const documentNumber = document.document_number || document.invoice_number;
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  let subject = '';
  let adminSubject = '';
  let message = '';
  let adminMessage = '';

  switch (eventType) {
    case 'viewed':
      subject = `[Document Viewed] ${clientName} viewed ${documentNumber}`;
      adminSubject = `Client viewed document ${documentNumber}`;
      message = `Your client ${clientName} just viewed ${documentNumber} on ${timestamp}.`;
      adminMessage = `Client ${clientName} viewed document ${documentNumber} on ${timestamp}.`;
      break;

    case 'payment_link_clicked':
      subject = `[Payment Link Clicked] ${clientName} accessed payment for ${documentNumber}`;
      adminSubject = `Client accessed payment page for ${documentNumber}`;
      message = `Your client ${clientName} clicked the payment link for ${documentNumber} on ${timestamp}.`;
      adminMessage = `Client ${clientName} accessed the payment page for ${documentNumber} on ${timestamp}.`;
      break;

    case 'payment_received':
      const amount = paymentInfo?.amount || document.amount;
      const method = paymentInfo?.method || 'Card';
      subject = `[Payment Received] ${clientName} paid ${documentNumber}`;
      adminSubject = `Payment received from ${clientName}`;
      message = `Great news! ${clientName} just paid ${documentNumber}. Amount: $${amount} via ${method} on ${timestamp}.`;
      adminMessage = `${documentNumber} was paid on ${timestamp}. Amount: $${amount} via ${method}. Client: ${clientName}.`;
      break;

    case 'receipt_viewed':
      subject = `[Receipt Viewed] ${clientName} viewed receipt for ${documentNumber}`;
      adminSubject = `Client viewed receipt for ${documentNumber}`;
      message = `Your client ${clientName} viewed the receipt for ${documentNumber} on ${timestamp}.`;
      adminMessage = `Client ${clientName} viewed receipt for ${documentNumber} on ${timestamp}.`;
      break;
  }

  // Send email to document owner
  try {
    await resend.emails.send({
      from: "FeatherBiz <notifications@featherbiz.io>",
      to: [ownerEmail],
      subject: subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Document Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            ${message}
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Keep track of all your business activities in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">
            — FeatherBiz Notification System
          </p>
        </div>
      `
    });
  } catch (emailError) {
    console.error('Failed to send owner notification:', emailError);
  }

  // Send email to admin
  try {
    await resend.emails.send({
      from: "FeatherBiz <notifications@featherbiz.io>",
      to: ["hello@featherbiz.io"],
      subject: adminSubject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Admin Alert: Client Activity</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            ${adminMessage}
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px;">Event Details:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
              <li>Document: ${documentNumber}</li>
              <li>Client: ${clientName} (${document.clients?.email || 'No email'})</li>
              <li>Owner: ${ownerEmail}</li>
              <li>Event Type: ${eventType.replace('_', ' ').toUpperCase()}</li>
              <li>Timestamp: ${timestamp}</li>
              ${paymentInfo?.amount ? `<li>Amount: $${paymentInfo.amount}</li>` : ''}
              ${paymentInfo?.method ? `<li>Payment Method: ${paymentInfo.method}</li>` : ''}
            </ul>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">
            — FeatherBiz Admin System
          </p>
        </div>
      `
    });
  } catch (emailError) {
    console.error('Failed to send admin notification:', emailError);
  }
}