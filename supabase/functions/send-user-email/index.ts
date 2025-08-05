import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import sgMail from "npm:@sendgrid/mail@8.1.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UserEmailRequest {
  to: string;
  subject: string;
  content: string;
  emailType?: string;
  recipientName?: string;
  fromName?: string;
  replyTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Create Supabase client to get user info
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { to, subject, content, emailType = 'custom', recipientName, fromName, replyTo }: UserEmailRequest = await req.json();

    // Get user profile for default sender name
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .maybeSingle();

    // Get company profile for branding
    const { data: company } = await supabaseClient
      .from('company_profiles')
      .select('company_name, email')
      .eq('user_id', user.id)
      .maybeSingle();

    // Determine sender name
    const senderName = fromName || 
      (company?.company_name) || 
      (profile ? `${profile.first_name} ${profile.last_name}`.trim() : 'FeatherBiz User');

    // Use company email or default
    const fromEmail = company?.email || 'noreply@featherbiz.com';
    const replyToEmail = replyTo || company?.email || user.email;

    let emailResponse;
    let errorMessage = null;

    try {
      // Use centralized SendGrid API key from environment
      const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
      if (!sendGridApiKey) {
        throw new Error('Email service not configured. Please contact support.');
      }

      sgMail.setApiKey(sendGridApiKey);
      
      const msg = {
        to: to,
        from: {
          email: fromEmail,
          name: senderName
        },
        subject: subject,
        html: content,
        replyTo: replyToEmail,
        customArgs: {
          'X-Sent-Via': 'FeatherBiz Platform',
          'X-User-ID': user.id,
        },
      };

      emailResponse = await sgMail.send(msg);
      console.log("Email sent successfully:", emailResponse);

    } catch (emailError: any) {
      console.error("Error sending email:", emailError);
      errorMessage = emailError.message;
      throw emailError;
    }

    // Log the email attempt
    const { error: logError } = await supabaseClient
      .from('user_email_logs')
      .insert({
        user_id: user.id,
        recipient_email: to,
        recipient_name: recipientName,
        subject: subject,
        email_type: emailType,
        status: errorMessage ? 'failed' : 'sent',
        provider_response: emailResponse,
        error_message: errorMessage,
      });

    if (logError) {
      console.error("Error logging email:", logError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse?.data?.id || emailResponse?.id,
      message: 'Email sent successfully'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-user-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);