import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

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

    // Get user's email settings
    const { data: emailSettings, error: settingsError } = await supabaseClient
      .from('user_email_settings')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .maybeSingle();

    if (settingsError || !emailSettings) {
      throw new Error('Email settings not configured. Please configure your email settings first.');
    }

    const { to, subject, content, emailType = 'custom', recipientName }: UserEmailRequest = await req.json();

    let emailResponse;
    let errorMessage = null;

    try {
      // Initialize the appropriate email service based on provider
      if (emailSettings.provider === 'resend') {
        const resend = new Resend(emailSettings.api_key);
        
        emailResponse = await resend.emails.send({
          from: `${emailSettings.from_name} <${emailSettings.from_email}>`,
          to: [to],
          subject: subject,
          html: content,
        });
      } else if (emailSettings.provider === 'sendgrid') {
        // SendGrid API implementation
        const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${emailSettings.api_key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: to, name: recipientName }],
              subject: subject,
            }],
            from: {
              email: emailSettings.from_email,
              name: emailSettings.from_name,
            },
            content: [{
              type: 'text/html',
              value: content,
            }],
          }),
        });

        if (!sendGridResponse.ok) {
          const errorData = await sendGridResponse.text();
          throw new Error(`SendGrid API error: ${errorData}`);
        }

        emailResponse = {
          id: sendGridResponse.headers.get('X-Message-Id') || 'sendgrid-success',
          status: 'sent'
        };
      } else {
        throw new Error(`Unsupported email provider: ${emailSettings.provider}`);
      }

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