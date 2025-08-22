
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface AuthEmailPayload {
  email: string;
  token: string;
  type: 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change_confirm_new' | 'email_change_confirm_old';
  redirect_to?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: AuthEmailPayload = await req.json();
    console.log(`Processing auth email for type: ${payload.type}, email: ${payload.email}`);

    let subject = '';
    let htmlContent = '';
    let textContent = '';
    
    // Build the confirmation URL with the token
    const confirmationUrl = payload.redirect_to 
      ? `${payload.redirect_to}#access_token=${payload.token}&type=${payload.type}`
      : `https://featherbiz.io/auth/confirm?token=${payload.token}&type=${payload.type}`;

    switch (payload.type) {
      case 'signup':
      case 'invite':
        subject = 'Complete Your FeatherBiz Registration';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🚀 FeatherBiz</h1>
              <p style="color: #e1e7ff; margin: 15px 0 0 0; font-size: 18px;">Welcome to the Future of Business Automation!</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">Welcome to FeatherBiz! 🎉</h2>
              <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Click the button below to confirm your email address and complete your registration:
              </p>
              <a href="${confirmationUrl}" 
                 style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                ✨ Confirm Email & Get Started
              </a>
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <span style="word-break: break-all;">${confirmationUrl}</span>
              </p>
            </div>
            <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 FeatherBiz - Plataforma de Automação Empresarial com IA
              </p>
            </div>
          </div>
        `;
        textContent = `Welcome to FeatherBiz! Complete your registration by visiting: ${confirmationUrl}`;
        break;

      case 'magiclink':
        subject = 'Your FeatherBiz Login Link';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🔐 FeatherBiz Login</h1>
              <p style="color: #d1fae5; margin: 15px 0 0 0; font-size: 16px;">Secure Access to Your Account</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Sign In to Your Account</h2>
              <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Click the button below to securely sign in to your FeatherBiz account:
              </p>
              <a href="${confirmationUrl}" 
                 style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                🚀 Sign In to FeatherBiz
              </a>
              <p style="color: #ef4444; margin: 30px 0; font-size: 14px; font-weight: 600;">
                ⏱️ This link will expire in 1 hour for security reasons.
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                If you didn't request this, please ignore this email.<br>
                Link: <span style="word-break: break-all;">${confirmationUrl}</span>
              </p>
            </div>
            <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 FeatherBiz - Secure Business Automation Platform
              </p>
            </div>
          </div>
        `;
        textContent = `Sign in to FeatherBiz using this secure link: ${confirmationUrl}`;
        break;

      case 'recovery':
        subject = 'Reset Your FeatherBiz Password';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🔑 Password Reset</h1>
              <p style="color: #fef3c7; margin: 15px 0 0 0; font-size: 16px;">Secure Password Recovery</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Reset Your Password</h2>
              <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Click the button below to reset your FeatherBiz password:
              </p>
              <a href="${confirmationUrl}" 
                 style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                🔒 Reset Password
              </a>
              <p style="color: #ef4444; margin: 30px 0; font-size: 14px; font-weight: 600;">
                ⏱️ This link will expire in 1 hour for security reasons.
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                If you didn't request this, please ignore this email.<br>
                Link: <span style="word-break: break-all;">${confirmationUrl}</span>
              </p>
            </div>
            <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 FeatherBiz - Secure Business Automation Platform
              </p>
            </div>
          </div>
        `;
        textContent = `Reset your FeatherBiz password using this secure link: ${confirmationUrl}`;
        break;

      case 'email_change_confirm_new':
        subject = 'Confirm Your New Email Address';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">📧 Email Change</h1>
              <p style="color: #ede9fe; margin: 15px 0 0 0; font-size: 16px;">Confirm Your New Email</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Confirm New Email Address</h2>
              <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Click the button below to confirm your new email address for your FeatherBiz account:
              </p>
              <a href="${confirmationUrl}" 
                 style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                ✅ Confirm New Email
              </a>
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px;">
                If you didn't request this change, please contact support immediately.<br>
                Link: <span style="word-break: break-all;">${confirmationUrl}</span>
              </p>
            </div>
            <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 FeatherBiz - Secure Business Automation Platform
              </p>
            </div>
          </div>
        `;
        textContent = `Confirm your new email address for FeatherBiz: ${confirmationUrl}`;
        break;

      case 'email_change_confirm_old':
        subject = 'Email Change Request - FeatherBiz';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">⚠️ Email Change Request</h1>
              <p style="color: #fecaca; margin: 15px 0 0 0; font-size: 16px;">Security Notification</p>
            </div>
            <div style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Email Change Requested</h2>
              <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                A request has been made to change the email address associated with your FeatherBiz account.
                If this was you, please check your new email address for a confirmation link.
              </p>
              <p style="color: #ef4444; margin: 30px 0; font-size: 16px; font-weight: 600;">
                🚨 If you did not request this change, please contact our support team immediately.
              </p>
              <a href="mailto:support@featherbiz.io" 
                 style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                🆘 Contact Support
              </a>
            </div>
            <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 FeatherBiz - Secure Business Automation Platform
              </p>
            </div>
          </div>
        `;
        textContent = `Email change requested for your FeatherBiz account. If this wasn't you, contact support@featherbiz.io immediately.`;
        break;

      default:
        throw new Error(`Unknown email type: ${payload.type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz <hello@featherbiz.io>",
      to: [payload.email],
      subject: subject,
      html: htmlContent,
      text: textContent,
    });

    console.log(`${payload.type} email sent successfully:`, emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      type: payload.type
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
