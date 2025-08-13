import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SalesContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  companySize: string;
  useCase?: string;
  message?: string;
  page_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: SalesContactRequest = await req.json();
    const currentTimestamp = new Date().toISOString();
    const pageUrl = contactData.page_url || 'Sales contact form';

    // Send internal notification to hello@featherbiz.io  
    const internalNotificationResponse = await resend.emails.send({
      from: "FeatherBiz <hello@featherbiz.io>",
      replyTo: "hello@featherbiz.io",
      to: ["hello@featherbiz.io"],
      subject: "[FeatherBiz] New submission — contact.create",
      html: `
        <h2>New Sales Contact Submission</h2>
        <p><strong>Timestamp:</strong> ${currentTimestamp}</p>
        <p><strong>Page URL:</strong> ${pageUrl}</p>
        <p><strong>Locale:</strong> en</p>
        <br>
        <p><strong>Submitted Fields:</strong></p>
        <ul>
          <li>Name: ${contactData.firstName} ${contactData.lastName}</li>
          <li>Email: ${contactData.email}</li>
          <li>Phone: ${contactData.phone || 'Not provided'}</li>
          <li>Company: ${contactData.company}</li>
          <li>Job Title: ${contactData.jobTitle || 'Not provided'}</li>
          <li>Company Size: ${contactData.companySize}</li>
          <li>Use Case: ${contactData.useCase || 'Not provided'}</li>
          ${contactData.message ? `<li>Message: ${contactData.message}</li>` : ''}
        </ul>
      `,
      text: `New Sales Contact Submission

Timestamp: ${currentTimestamp}
Page URL: ${pageUrl}
Locale: en

Submitted Fields:
- Name: ${contactData.firstName} ${contactData.lastName}
- Email: ${contactData.email}
- Phone: ${contactData.phone || 'Not provided'}
- Company: ${contactData.company}
- Job Title: ${contactData.jobTitle || 'Not provided'}
- Company Size: ${contactData.companySize}
- Use Case: ${contactData.useCase || 'Not provided'}
${contactData.message ? `- Message: ${contactData.message}` : ''}`
    });

    // Send user confirmation email - user_confirm_generic_v1
    const confirmationEmailResponse = await resend.emails.send({
      from: "FeatherBiz <hello@featherbiz.io>",
      replyTo: "hello@featherbiz.io",
      to: [contactData.email],
      subject: "We received your request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <div style="padding: 30px; background: white;">
            <p>Hi ${contactData.firstName},</p>
            <br>
            <p>Thanks for reaching out to FeatherBiz. We've received your request and our team will get back to you shortly.</p>
            <br>
            <p><strong>Summary</strong></p>
            <ul style="margin: 10px 0;">
              <li>Name: ${contactData.firstName} ${contactData.lastName}</li>
              <li>Company: ${contactData.company}</li>
              <li>Email: ${contactData.email}</li>
              <li>Submitted from: ${pageUrl}</li>
              <li>Time: ${currentTimestamp}</li>
            </ul>
            <br>
            <p>If you didn't make this request, reply to this email.</p>
            <br>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              FeatherBiz - Modern Business Management Platform<br>
              <a href="https://featherbiz.io/privacy" style="color: #6b7280;">Privacy Policy</a> | 
              <a href="https://featherbiz.io" style="color: #6b7280;">featherbiz.io</a>
            </p>
          </div>
        </div>
      `,
      text: `Hi ${contactData.firstName},

Thanks for reaching out to FeatherBiz. We've received your request and our team will get back to you shortly.

Summary
• Name: ${contactData.firstName} ${contactData.lastName}
• Company: ${contactData.company}
• Email: ${contactData.email}
• Submitted from: ${pageUrl}
• Time: ${currentTimestamp}

If you didn't make this request, reply to this email.

FeatherBiz - Modern Business Management Platform
Privacy Policy: https://featherbiz.io/privacy`
    });

    // Log analytics events
    console.log('[Analytics] form_submit_success', { 
      form_name: 'contact.create', 
      email: contactData.email, 
      locale: 'en', 
      page_url: pageUrl, 
      timestamp: currentTimestamp 
    });
    console.log('[Analytics] notify_internal_sent', { form_name: 'contact.create', timestamp: currentTimestamp });
    console.log('[Analytics] user_confirmation_sent', { form_name: 'contact.create', email: contactData.email, timestamp: currentTimestamp });

    console.log("Sales contact emails sent successfully:", {
      internal: internalNotificationResponse,
      confirmation: confirmationEmailResponse
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Request received. We've sent a confirmation to your email. Our team will get back to you shortly."
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-sales-contact function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);