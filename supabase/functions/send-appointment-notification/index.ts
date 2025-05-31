
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentNotificationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  appointmentTitle: string;
  appointmentDate: string;
  appointmentTime: string;
  location?: string;
  description?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      clientName, 
      clientEmail, 
      clientPhone, 
      appointmentTitle, 
      appointmentDate, 
      appointmentTime, 
      location, 
      description 
    }: AppointmentNotificationRequest = await req.json();

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Appointments <appointments@yourdomain.com>",
      to: [clientEmail],
      subject: `Appointment Confirmation: ${appointmentTitle}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Appointment Confirmation</h2>
          <p>Dear ${clientName},</p>
          <p>Your appointment has been scheduled with the following details:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">${appointmentTitle}</h3>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
            ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
          </div>
          
          <p>If you need to reschedule or cancel this appointment, please contact us as soon as possible.</p>
          <p>We look forward to seeing you!</p>
          
          <p>Best regards,<br>Your Appointment Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Note: For SMS, you would integrate with a service like Twilio
    // This is a placeholder for SMS functionality
    let smsResponse = null;
    if (clientPhone) {
      console.log(`SMS would be sent to ${clientPhone}: Appointment confirmed for ${appointmentTitle} on ${appointmentDate} at ${appointmentTime}`);
      // Placeholder for SMS integration
      smsResponse = { message: "SMS functionality placeholder - integrate with Twilio or similar service" };
    }

    return new Response(JSON.stringify({ 
      email: emailResponse, 
      sms: smsResponse,
      success: true 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-appointment-notification function:", error);
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
