
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface AuthEmailRequest {
  email: string;
  type: 'signup' | 'login' | 'recovery' | 'email_change';
  token?: string;
  redirectTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, token, redirectTo }: AuthEmailRequest = await req.json();
    console.log(`Sending ${type} email to ${email}`);

    let subject = '';
    let htmlContent = '';
    let textContent = '';

    switch (type) {
      case 'signup':
        subject = 'Complete Your FeatherBiz Registration';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Welcome to FeatherBiz!</h1>
            <p>Click the link below to complete your registration:</p>
            <a href="${redirectTo || 'https://featherbiz.io'}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Complete Registration</a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The FeatherBiz Team</p>
          </div>
        `;
        textContent = `Welcome to FeatherBiz! Complete your registration at: ${redirectTo || 'https://featherbiz.io'}`;
        break;

      case 'login':
        subject = 'Your FeatherBiz Login Link';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Sign in to FeatherBiz</h1>
            <p>Click the link below to sign in to your account:</p>
            <a href="${redirectTo || 'https://featherbiz.io'}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Sign In</a>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The FeatherBiz Team</p>
          </div>
        `;
        textContent = `Sign in to FeatherBiz at: ${redirectTo || 'https://featherbiz.io'}`;
        break;

      case 'recovery':
        subject = 'Reset Your FeatherBiz Password';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Reset Your Password</h1>
            <p>Click the link below to reset your FeatherBiz password:</p>
            <a href="${redirectTo || 'https://featherbiz.io'}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>The FeatherBiz Team</p>
          </div>
        `;
        textContent = `Reset your FeatherBiz password at: ${redirectTo || 'https://featherbiz.io'}`;
        break;

      case 'email_change':
        subject = 'Confirm Your New Email Address';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Confirm Email Change</h1>
            <p>Click the link below to confirm your new email address:</p>
            <a href="${redirectTo || 'https://featherbiz.io'}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Confirm Email</a>
            <p>If you didn't request this change, please contact support immediately.</p>
            <p>Best regards,<br>The FeatherBiz Team</p>
          </div>
        `;
        textContent = `Confirm your new email address at: ${redirectTo || 'https://featherbiz.io'}`;
        break;

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz <hello@featherbiz.io>",
      to: [email],
      subject: subject,
      html: htmlContent,
      text: textContent,
    });

    console.log(`${type} email sent successfully:`, emailResponse);

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
    console.error(`Error in send-auth-email function:`, error);
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
