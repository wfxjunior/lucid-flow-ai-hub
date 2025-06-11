
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  token: string;
  type: 'signup' | 'recovery' | 'email_change';
  redirectTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const { email, token, type, redirectTo }: AuthEmailRequest = await req.json();
    
    const baseUrl = redirectTo || 'https://featherbiz.com/app';
    
    let subject = '';
    let content = '';
    
    switch (type) {
      case 'signup':
        subject = 'Confirme sua conta no FeatherBiz';
        content = `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
            <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Confirme sua conta</h1>
                <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">Último passo para acessar o FeatherBiz</p>
              </div>
              
              <div style="margin-bottom: 30px;">
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Olá! Obrigado por se cadastrar no FeatherBiz.
                </p>
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Para confirmar sua conta e começar a usar nossa plataforma, clique no botão abaixo:
                </p>
              </div>

              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${baseUrl}?token=${token}&type=signup" 
                   style="background-color: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                  Confirmar Conta
                </a>
              </div>

              <div style="background-color: #fef3cd; border: 1px solid #fbbf24; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="color: #92400e; font-size: 14px; margin: 0;">
                  ⚡ Este link expira em 24 horas. Se você não solicitou esta confirmação, pode ignorar este email.
                </p>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  © 2024 FeatherBiz. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        `;
        break;
        
      case 'recovery':
        subject = 'Redefinir senha - FeatherBiz';
        content = `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
            <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #dc2626; margin: 0; font-size: 28px;">Redefinir Senha</h1>
                <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">Solicitação de nova senha</p>
              </div>
              
              <div style="margin-bottom: 30px;">
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Recebemos uma solicitação para redefinir a senha da sua conta FeatherBiz.
                </p>
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Clique no botão abaixo para criar uma nova senha:
                </p>
              </div>

              <div style="text-align: center; margin-bottom: 30px;">
                <a href="${baseUrl}?token=${token}&type=recovery" 
                   style="background-color: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                  Redefinir Senha
                </a>
              </div>

              <div style="background-color: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
                <p style="color: #991b1b; font-size: 14px; margin: 0;">
                  🔒 Se você não solicitou esta redefinição, ignore este email. Sua senha permanecerá inalterada.
                </p>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin: 0;">
                  © 2024 FeatherBiz. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "FeatherBiz <noreply@featherbiz.com>",
      to: [email],
      subject: subject,
      html: content,
    });

    console.log("Auth email sent successfully:", emailResponse);

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
    console.error("Error in send-auth-email function:", error);
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
