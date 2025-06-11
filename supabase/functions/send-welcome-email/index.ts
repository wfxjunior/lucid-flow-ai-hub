
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
      from: "FeatherBiz <hello@featherbiz.com>",
      to: [email],
      subject: "Bem-vindo ao FeatherBiz! 🚀",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px;">
          <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0; font-size: 28px;">Bem-vindo ao FeatherBiz!</h1>
              <p style="color: #64748b; margin: 10px 0 0 0; font-size: 16px;">Sua jornada empresarial começa aqui</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                Olá <strong>${displayName}</strong>,
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
                Parabéns por se juntar ao FeatherBiz! Estamos muito animados em tê-lo conosco.
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Com o FeatherBiz, você pode:
              </p>
            </div>

            <div style="background-color: #f1f5f9; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
              <ul style="margin: 0; padding-left: 20px; color: #334155;">
                <li style="margin-bottom: 8px;">📋 Gerenciar projetos e clientes</li>
                <li style="margin-bottom: 8px;">💰 Criar orçamentos e faturas</li>
                <li style="margin-bottom: 8px;">📅 Agendar compromissos</li>
                <li style="margin-bottom: 8px;">📄 Gerar contratos e documentos</li>
                <li style="margin-bottom: 8px;">📊 Acompanhar métricas do negócio</li>
              </ul>
            </div>

            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://featherbiz.com/app" 
                 style="background-color: #1e40af; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
                Começar Agora
              </a>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">
                Precisa de ajuda? Estamos aqui para você!
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                📧 <a href="mailto:suporte@featherbiz.com" style="color: #1e40af;">suporte@featherbiz.com</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              © 2024 FeatherBiz. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `,
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
