
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { email, name }: WelcomeEmailRequest = await req.json();
    
    const displayName = name || email.split('@')[0];

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz <welcome@featherbiz.io>",
      to: [email],
      bcc: ["wearefeatherbiz@gmail.com"],
      subject: "Welcome to FeatherBiz – A Great Journey Begins",
      text: `Hello ${displayName},

Thank you for signing up for FeatherBiz.

This is the beginning of something meaningful. You are now part of a community of forward-thinking entrepreneurs focused on growth, clarity, and building efficient businesses.

Get ready to access powerful tools that will simplify your operations and accelerate your success. We're here to support you every step of the way.

Welcome aboard. The best is yet to come.

Sincerely,
FeatherBiz Team`,
    });

    console.log("Welcome email sent successfully:", emailResponse);

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
    console.error("Error in send-welcome-email function:", error);
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
