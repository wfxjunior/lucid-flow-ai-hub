
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReceiptEmailRequest {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  purchaseDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  paymentMethod: string;
  totalAmount: number;
  transactionId: string;
  documentType: string;
  pdfUrl?: string;
}

const generateReceiptHTML = (data: ReceiptEmailRequest) => {
  const itemsHTML = data.items.map(item => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; text-align: left;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px; text-align: right; font-weight: bold;">$${item.total.toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Receipt from FeatherBiz</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">FeatherBiz</h1>
          <p style="color: #e1e7ff; margin: 10px 0 0 0; font-size: 16px;">AI Business Automation Platform</p>
        </div>

        <!-- Receipt Header -->
        <div style="padding: 30px; border-bottom: 2px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0; font-size: 24px;">🧾 Payment Receipt</h2>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Thank you for your purchase!</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
            <div>
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Customer Details</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong> ${data.customerName}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${data.customerEmail}</p>
            </div>
            
            <div>
              <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Order Information</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Order #:</strong> ${data.orderNumber}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Date:</strong> ${data.purchaseDate}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Payment:</strong> ${data.paymentMethod}</p>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div style="padding: 30px;">
          <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 18px;">Items Purchased</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background-color: #1e293b;">
                <th style="padding: 15px; text-align: left; color: white; font-weight: 600;">Description</th>
                <th style="padding: 15px; text-align: center; color: white; font-weight: 600;">Qty</th>
                <th style="padding: 15px; text-align: right; color: white; font-weight: 600;">Price</th>
                <th style="padding: 15px; text-align: right; color: white; font-weight: 600;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          
          <!-- Total Section -->
          <div style="margin-top: 20px; text-align: right;">
            <div style="background-color: #3b82f6; color: white; padding: 15px 20px; border-radius: 8px; display: inline-block;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Total Paid: $${data.totalAmount.toFixed(2)}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Transaction ID: ${data.transactionId}</p>
            </div>
          </div>
        </div>

        ${data.pdfUrl ? `
        <!-- Download Section -->
        <div style="padding: 20px 30px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">📄 Download Your Receipt</h3>
          <p style="color: #451a03; margin: 0 0 15px 0;">Click the link below to download a PDF copy of your receipt:</p>
          <a href="${data.pdfUrl}" style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Download PDF Receipt</a>
        </div>
        ` : ''}

        <!-- Dashboard Access -->
        <div style="padding: 20px 30px; background-color: #e0f2fe; border-left: 4px solid #0284c7;">
          <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">🔗 Access Your Dashboard</h3>
          <p style="color: #075985; margin: 0 0 15px 0;">View this order and manage your account in your FeatherBiz dashboard:</p>
          <a href="https://featherbiz.com/app" style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">View in Dashboard</a>
        </div>

        <!-- Support Section -->
        <div style="padding: 30px; background-color: #f1f5f9; text-align: center;">
          <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">Need Help?</h3>
          <p style="color: #6b7280; margin: 0 0 15px 0;">If you have any questions about your order, please don't hesitate to contact us:</p>
          <a href="mailto:support@featherbiz.com" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@featherbiz.com</a>
        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © 2024 FeatherBiz - AI Business Automation Platform
          </p>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
            This email was sent automatically. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const receiptData: ReceiptEmailRequest = await req.json();
    
    console.log("Sending receipt email to:", receiptData.customerEmail);

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz Receipts <receipts@featherbiz.com>",
      to: [receiptData.customerEmail],
      subject: "🧾 Your Receipt from FeatherBiz – Thank You!",
      html: generateReceiptHTML(receiptData),
    });

    console.log("Receipt email sent successfully:", emailResponse);

    // Log the email sending for tracking
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get user_id from the authorization header
    const authHeader = req.headers.get('authorization');
    let userId = null;
    
    if (authHeader) {
      try {
        const jwt = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabaseClient.auth.getUser(jwt);
        userId = user?.id;
      } catch (error) {
        console.warn('Could not extract user from token:', error);
      }
    }

    await supabaseClient.from("email_logs").insert({
      user_id: userId,
      email_type: "receipt",
      recipient: receiptData.customerEmail,
      order_number: receiptData.orderNumber,
      transaction_id: receiptData.transactionId,
      email_id: emailResponse.data?.id,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending receipt email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
