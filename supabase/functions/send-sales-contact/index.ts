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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: SalesContactRequest = await req.json();

    // Send email to sales team
    const salesEmailResponse = await resend.emails.send({
      from: "FeatherBiz Sales <sales@featherbiz.io>",
      to: ["sales@featherbiz.io", "juniorxavierusa@gmail.com"],
      bcc: ["wearefeatherbiz@gmail.com"],
      subject: `New Sales Inquiry from ${contactData.firstName} ${contactData.lastName} - ${contactData.company}`,
      html: `
        <h2>New Sales Contact Request</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${contactData.company}</p>
          <p><strong>Job Title:</strong> ${contactData.jobTitle || 'Not provided'}</p>
          <p><strong>Company Size:</strong> ${contactData.companySize}</p>
          <p><strong>Use Case:</strong> ${contactData.useCase || 'Not provided'}</p>
        </div>
        
        ${contactData.message ? `
        <div style="background: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
          <h3>Message</h3>
          <p>${contactData.message}</p>
        </div>
        ` : ''}
        
        <p><strong>Action Required:</strong> Please contact this prospect within 24 hours.</p>
      `,
    });

    // Send confirmation email to prospect
    const confirmationEmailResponse = await resend.emails.send({
      from: "FeatherBiz <hello@featherbiz.io>",
      to: [contactData.email],
      bcc: ["wearefeatherbiz@gmail.com"],
      subject: "Thank you for your interest in FeatherBiz",
      html: `
        <h2>Thank you for contacting FeatherBiz!</h2>
        
        <p>Dear ${contactData.firstName},</p>
        
        <p>Thank you for your interest in FeatherBiz. We have received your inquiry and our sales team will reach out to you within 24 hours to discuss how we can help streamline your business operations.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>What happens next?</h3>
          <ul>
            <li>A sales specialist will contact you within 24 hours</li>
            <li>We'll schedule a personalized demo based on your needs</li>
            <li>You'll receive a customized proposal for your business</li>
          </ul>
        </div>
        
        <p>In the meantime, feel free to explore our platform or reach out if you have any immediate questions.</p>
        
        <p>Best regards,<br>The FeatherBiz Sales Team</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280;">
          FeatherBiz - Streamline your business operations<br>
          If you have any questions, reply to this email or contact us at sales@featherbiz.io
        </p>
      `,
    });

    console.log("Sales contact emails sent successfully:", {
      sales: salesEmailResponse,
      confirmation: confirmationEmailResponse
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Contact request sent successfully"
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