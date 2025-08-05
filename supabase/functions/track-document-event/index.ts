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
  const documentType = getDocumentTypeDisplay(document);
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  // Get user name from email (first part before @)
  const userName = ownerEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const emailTemplates = getEmailTemplate(eventType, documentType, {
    userName,
    clientName,
    documentNumber,
    timestamp,
    amount: paymentInfo?.amount || document.amount,
    paymentMethod: paymentInfo?.method || 'Card'
  });

  // Send email to document owner
  try {
    await resend.emails.send({
      from: "FeatherBiz <notifications@featherbiz.io>",
      to: [ownerEmail],
      subject: emailTemplates.ownerSubject,
      html: emailTemplates.ownerHtml
    });
  } catch (emailError) {
    console.error('Failed to send owner notification:', emailError);
  }

  // Send email to admin
  try {
    await resend.emails.send({
      from: "FeatherBiz <notifications@featherbiz.io>",
      to: ["hello@featherbiz.io"],
      subject: emailTemplates.adminSubject,
      html: emailTemplates.adminHtml
    });
  } catch (emailError) {
    console.error('Failed to send admin notification:', emailError);
  }
}

function getDocumentTypeDisplay(document: any): string {
  // Determine document type from the document structure
  if (document.invoice_number) return 'invoice';
  if (document.estimate_number) return 'estimate';
  if (document.quote_number) return 'quote';
  if (document.contract_number) return 'contract';
  if (document.work_order_number) return 'work order';
  if (document.bid_number) return 'bid';
  if (document.proposal_number) return 'proposal';
  return 'document';
}

function getEmailTemplate(eventType: string, documentType: string, data: any) {
  const { userName, clientName, documentNumber, timestamp, amount, paymentMethod } = data;
  
  const templates = {
    // INVOICE TEMPLATES
    invoice_viewed: {
      ownerSubject: `[Invoice Viewed] ${clientName} opened invoice ${documentNumber}`,
      adminSubject: `Client viewed invoice ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Invoice Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened invoice <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            This means the invoice has been viewed and your client is likely reviewing the details.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              You can track the full status in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Invoice Viewed</h2>
          <p>Client ${clientName} viewed invoice ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName} (${data.ownerEmail})</p>
        </div>
      `
    },

    invoice_payment_link_clicked: {
      ownerSubject: `[Payment Link Clicked] ${clientName} accessed payment for ${documentNumber}`,
      adminSubject: `Client clicked payment link for ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Payment Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just clicked the payment link for invoice <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are reviewing the payment options. You may want to follow up soon.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track this activity in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Payment Link Clicked</h2>
          <p>Client ${clientName} clicked payment link for invoice ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    invoice_payment_received: {
      ownerSubject: `[Payment Received] ${clientName} paid ${documentNumber}`,
      adminSubject: `Payment received from ${clientName}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">Payment Received! 🎉</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Great news! Your client <strong>${clientName}</strong> just paid invoice <strong>#${documentNumber}</strong>.
          </p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #166534;">Payment Details:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #166534;">
              <li>Amount: <strong>$${amount}</strong></li>
              <li>Method: <strong>${paymentMethod}</strong></li>
              <li>Date: <strong>${timestamp}</strong></li>
            </ul>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            You can download the signed receipt or view the timeline in your dashboard.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">View in FeatherBiz Dashboard</a>
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Finance</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Admin Alert: Payment Received</h2>
          <p>Invoice ${documentNumber} was paid on ${timestamp}. Amount: $${amount} via ${paymentMethod}.</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    invoice_receipt_viewed: {
      ownerSubject: `[Receipt Viewed] ${clientName} viewed receipt for ${documentNumber}`,
      adminSubject: `Client viewed receipt for ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Receipt Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> viewed the receipt for invoice <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            This means the transaction is complete and the document was reviewed.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Keep track of this and more in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Receipt Viewed</h2>
          <p>Client ${clientName} viewed receipt for invoice ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // ESTIMATE TEMPLATES
    estimate_viewed: {
      ownerSubject: `[Estimate Viewed] ${clientName} opened estimate ${documentNumber}`,
      adminSubject: `Client viewed estimate ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Estimate Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened estimate <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are reviewing your pricing and project details. This is a great time to follow up!
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track estimate status in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Estimate Viewed</h2>
          <p>Client ${clientName} viewed estimate ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // QUOTE TEMPLATES  
    quote_viewed: {
      ownerSubject: `[Quote Viewed] ${clientName} opened quote ${documentNumber}`,
      adminSubject: `Client viewed quote ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Quote Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened quote <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are considering your offer. Perfect timing for a follow-up call!
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Monitor quote activity in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Quote Viewed</h2>
          <p>Client ${clientName} viewed quote ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // CONTRACT TEMPLATES
    contract_viewed: {
      ownerSubject: `[Contract Viewed] ${clientName} opened contract ${documentNumber}`,
      adminSubject: `Client viewed contract ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Contract Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened contract <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are reviewing the terms and conditions. Signature may be coming soon!
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track contract status in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Contract Viewed</h2>
          <p>Client ${clientName} viewed contract ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    contract_signed: {
      ownerSubject: `[Contract Signed] ${clientName} signed ${documentNumber}! 🎉`,
      adminSubject: `Contract ${documentNumber} was signed by ${clientName}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">Contract Signed! 🎉</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Excellent news! Your client <strong>${clientName}</strong> just signed contract <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            The contract is now legally binding and you can proceed with the project!
          </p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              Download the fully executed contract from your 
              <a href="https://featherbiz.io/dashboard" style="color: #166534; text-decoration: none; font-weight: bold;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Legal</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Admin Alert: Contract Signed</h2>
          <p>Contract ${documentNumber} was signed by ${clientName} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // WORK ORDER TEMPLATES
    workorder_viewed: {
      ownerSubject: `[Work Order Viewed] ${clientName} opened work order ${documentNumber}`,
      adminSubject: `Client viewed work order ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Work Order Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened work order <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are reviewing the job details and specifications.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track work order progress in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Operations</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Work Order Viewed</h2>
          <p>Client ${clientName} viewed work order ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // BID TEMPLATES
    bid_viewed: {
      ownerSubject: `[Bid Viewed] ${clientName} opened bid ${documentNumber}`,
      adminSubject: `Client viewed bid ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Bid Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened bid <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are evaluating your proposal. Your bid is being considered!
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Monitor bid status in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Bid Viewed</h2>
          <p>Client ${clientName} viewed bid ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    // PROPOSAL TEMPLATES
    proposal_viewed: {
      ownerSubject: `[Proposal Viewed] ${clientName} opened proposal ${documentNumber}`,
      adminSubject: `Client viewed proposal ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Proposal Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> just opened proposal <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            They are reviewing your business proposal. Great opportunity to follow up!
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track proposal engagement in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Proposal Viewed</h2>
          <p>Client ${clientName} viewed proposal ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    },

    proposal_signed: {
      ownerSubject: `[Proposal Accepted] ${clientName} signed proposal ${documentNumber}! 🎉`,
      adminSubject: `Proposal ${documentNumber} was accepted by ${clientName}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">Proposal Accepted! 🎉</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Fantastic news! Your client <strong>${clientName}</strong> just accepted proposal <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            You can now move forward with the project. Time to start the next phase!
          </p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              Access the signed proposal in your 
              <a href="https://featherbiz.io/dashboard" style="color: #166534; text-decoration: none; font-weight: bold;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Business</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Admin Alert: Proposal Accepted</h2>
          <p>Proposal ${documentNumber} was accepted by ${clientName} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    }
  };

  const templateKey = `${documentType}_${eventType}`;
  const template = templates[templateKey as keyof typeof templates];
  
  if (!template) {
    // Fallback template for unknown combinations
    return {
      ownerSubject: `[${documentType.toUpperCase()} ${eventType.toUpperCase()}] ${clientName} interacted with ${documentNumber}`,
      adminSubject: `Client interacted with ${documentType} ${documentNumber}`,
      ownerHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Document Activity Alert</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #555;">Hi ${userName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Your client <strong>${clientName}</strong> interacted with ${documentType} <strong>#${documentNumber}</strong> on ${timestamp}.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #555; margin-bottom: 20px;">
            Event: ${eventType.replace('_', ' ').toUpperCase()}
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Track all activity in your 
              <a href="https://featherbiz.io/dashboard" style="color: #007bff; text-decoration: none;">FeatherBiz dashboard</a>.
            </p>
          </div>
          <p style="font-size: 14px; color: #888; margin-top: 30px;">— FeatherBiz Notifications</p>
        </div>
      `,
      adminHtml: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Alert: Document Activity</h2>
          <p>Client ${clientName} performed ${eventType.replace('_', ' ')} on ${documentType} ${documentNumber} on ${timestamp}.</p>
          <p><strong>Owner:</strong> ${userName}</p>
        </div>
      `
    };
  }

  return template;
}