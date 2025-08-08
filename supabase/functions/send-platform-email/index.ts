import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PlatformEmailRequest {
  type: 'feedback' | 'support' | 'contact' | 'help';
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
  priority?: string;
  rating?: string;
  feedbackType?: string;
}

const getEmailTemplate = (data: PlatformEmailRequest) => {
  const { type, name, email, subject, message, category, priority, rating, feedbackType } = data;
  
  let title = '';
  let additionalInfo = '';

  switch (type) {
    case 'feedback':
      title = `New Feedback Received`;
      additionalInfo = `
        ${feedbackType ? `<p><strong>Feedback Type:</strong> ${feedbackType}</p>` : ''}
        ${rating ? `<p><strong>Rating:</strong> ${rating} stars</p>` : ''}
      `;
      break;
    case 'support':
      title = `Technical Support Request`;
      additionalInfo = `
        ${priority ? `<p><strong>Priority:</strong> ${priority}</p>` : ''}
        <p><strong>Type:</strong> Technical Support</p>
      `;
      break;
    case 'contact':
      title = `New Contact Form Submission`;
      additionalInfo = `
        ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
        <p><strong>Type:</strong> General Inquiry</p>
      `;
      break;
    case 'help':
      title = `Help Center Request`;
      additionalInfo = `<p><strong>Type:</strong> Help Center Support</p>`;
      break;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #1f2937; margin: 0;">${title}</h1>
        <p style="color: #6b7280; margin: 5px 0 0 0;">From FeatherBiz Platform</p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        ${additionalInfo}
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #374151; margin-top: 0;">Message</h3>
        <div style="white-space: pre-wrap; color: #4b5563; line-height: 1.6;">
${message}
        </div>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
        <p style="color: #9ca3af; font-size: 14px;">
          This email was sent from the FeatherBiz platform contact system.
        </p>
      </div>
    </div>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Platform email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const data: PlatformEmailRequest = await req.json();
    console.log("Received email data:", data);

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message || !data.type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate the email template
    const emailHTML = getEmailTemplate(data);

    // Send email to hello@featherbiz.io
    const emailResponse = await resend.emails.send({
      from: "FeatherBiz Platform <platform@featherbiz.io>",
      to: ["hello@featherbiz.io"],
      subject: `[${data.type.toUpperCase()}] ${data.subject}`,
      html: emailHTML,
      reply_to: data.email, // Allow replying directly to the sender
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id || "unknown"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-platform-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email",
        details: error.toString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);