
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminEmailRequest {
  type: 'welcome' | 'order' | 'support' | 'notification' | 'career';
  to?: string;
  data: any;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const getEmailConfig = (type: string) => {
  const configs = {
    welcome: {
      from: "FeatherBiz <welcome@featherbiz.io>",
      subject: "🎉 Bem-vindo ao FeatherBiz!"
    },
    order: {
      from: "FeatherBiz Orders <orders@featherbiz.io>",
      subject: "🧾 Recibo do seu pedido - FeatherBiz"
    },
    support: {
      from: "FeatherBiz Support <support@featherbiz.io>",
      subject: "📝 Recebemos seu feedback - FeatherBiz"
    },
    notification: {
      from: "FeatherBiz <noreply@featherbiz.io>",
      subject: "🔔 Notificação - FeatherBiz"
    },
    career: {
      from: "FeatherBiz Careers <careers@featherbiz.io>",
      subject: "💼 Obrigado pelo seu interesse - FeatherBiz"
    }
  };
  return configs[type as keyof typeof configs];
};

const generateWelcomeHTML = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">🚀 FeatherBiz</h1>
      <p style="color: #e1e7ff; margin: 15px 0 0 0; font-size: 18px;">Plataforma de Automação Empresarial com IA</p>
    </div>

    <div style="padding: 40px 30px; text-align: center;">
      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">Bem-vindo, ${data.userName || 'Empreendedor'}! 🎉</h2>
      <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
        Você acabou de se juntar à revolução da automação empresarial! Estamos muito animados para ter você conosco.
      </p>

      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: left;">
        <h3 style="color: #1e40af; margin: 0 0 20px 0; font-size: 20px;">🎯 O que você pode fazer agora:</h3>
        <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
          <li><strong>📊 Dashboard:</strong> Acompanhe suas métricas em tempo real</li>
          <li><strong>👥 Clientes:</strong> Gerencie sua base de clientes</li>
          <li><strong>📄 Documentos:</strong> Crie contratos, orçamentos e faturas</li>
          <li><strong>📧 Emails:</strong> Configure e envie emails profissionais</li>
          <li><strong>🤖 IA:</strong> Use assistentes inteligentes para produtividade</li>
        </ul>
      </div>

      <div style="margin: 40px 0;">
        <a href="https://featherbiz.io/app" 
           style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
          🚀 Começar Agora
        </a>
      </div>

      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; text-align: left;">
        <h4 style="color: #92400e; margin: 0 0 10px 0;">💡 Dica de Sucesso</h4>
        <p style="color: #451a03; margin: 0; font-size: 14px;">
          Configure primeiro suas <strong>Configurações de Email</strong> para começar a enviar mensagens profissionais aos seus clientes!
        </p>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 30px; text-align: center;">
      <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">📞 Precisa de Ajuda?</h3>
      <p style="color: #6b7280; margin: 0 0 15px 0;">Nossa equipe está aqui para ajudar você a ter sucesso:</p>
      <a href="mailto:support@featherbiz.io" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@featherbiz.io</a>
    </div>

    <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0; font-size: 14px;">
        © 2024 FeatherBiz - Plataforma de Automação Empresarial com IA
      </p>
      <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
        featherbiz.io | Transformando negócios com tecnologia
      </p>
    </div>
  </div>
</body>
</html>
`;

const generateOrderHTML = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">💳 Pagamento Confirmado</h1>
      <p style="color: #d1fae5; margin: 15px 0 0 0; font-size: 16px;">Obrigado pela sua confiança no FeatherBiz!</p>
    </div>

    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Olá, ${data.customerName || 'Cliente'}! 👋</h2>
      <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
        Seu pagamento foi processado com sucesso! Aqui estão os detalhes do seu pedido:
      </p>

      <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin: 25px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #374151; font-weight: 600;">Pedido:</span>
          <span style="color: #1f2937; font-weight: bold;">#${data.orderNumber || 'N/A'}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #374151; font-weight: 600;">Data:</span>
          <span style="color: #1f2937;">${data.date || new Date().toLocaleDateString('pt-BR')}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #374151; font-weight: 600;">Plano:</span>
          <span style="color: #1f2937;">${data.planName || 'FeatherBiz Pro'}</span>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 15px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #374151; font-weight: 600; font-size: 18px;">Total:</span>
            <span style="color: #10b981; font-weight: bold; font-size: 18px;">R$ ${data.amount || '0,00'}</span>
          </div>
        </div>
      </div>

      <div style="background-color: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; margin: 30px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">🎯 Próximos Passos</h3>
        <ul style="color: #075985; margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Acesse sua conta no FeatherBiz</li>
          <li>Explore os novos recursos do seu plano</li>
          <li>Configure suas preferências</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://featherbiz.io/app" 
           style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
          🚀 Acessar Minha Conta
        </a>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 30px; text-align: center;">
      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
        Dúvidas sobre seu pedido? Entre em contato:
      </p>
      <a href="mailto:orders@featherbiz.io" style="color: #3b82f6; text-decoration: none; font-weight: 600;">orders@featherbiz.io</a>
    </div>

    <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0; font-size: 14px;">
        © 2024 FeatherBiz - Obrigado pela sua confiança!
      </p>
    </div>
  </div>
</body>
</html>
`;

const generateSupportHTML = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🎧 Suporte FeatherBiz</h1>
      <p style="color: #ede9fe; margin: 15px 0 0 0; font-size: 16px;">Recebemos sua mensagem!</p>
    </div>

    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Olá, ${data.name || 'Cliente'}! 👋</h2>
      <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
        Obrigado por entrar em contato conosco. Sua mensagem foi recebida e nossa equipe irá analisá-la em breve.
      </p>

      <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin: 25px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">📝 Sua mensagem:</h3>
        <div style="background-color: white; border-left: 4px solid #8b5cf6; padding: 15px; border-radius: 4px;">
          <p style="color: #1f2937; margin: 0; font-style: italic; line-height: 1.6;">
            "${data.message || 'Mensagem não especificada'}"
          </p>
        </div>
        <div style="margin-top: 15px; color: #6b7280; font-size: 14px;">
          <strong>Tipo:</strong> ${data.type || 'Feedback'} | 
          <strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">⏱️ Tempo de Resposta</h3>
        <p style="color: #075985; margin: 0; line-height: 1.6;">
          Nossa equipe geralmente responde em até <strong>24 horas</strong> em dias úteis. 
          Para questões urgentes, entre em contato pelo chat do sistema.
        </p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://featherbiz.io/app" 
           style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
          💬 Acessar Chat do Sistema
        </a>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 30px; text-align: center;">
      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
        Precisa de mais ajuda? Nossa equipe está sempre disponível:
      </p>
      <a href="mailto:support@featherbiz.io" style="color: #8b5cf6; text-decoration: none; font-weight: 600;">support@featherbiz.io</a>
    </div>

    <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0; font-size: 14px;">
        © 2024 FeatherBiz - Estamos aqui para ajudar!
      </p>
    </div>
  </div>
</body>
</html>
`;

const generateCareerHTML = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">💼 FeatherBiz Careers</h1>
      <p style="color: #fef3c7; margin: 15px 0 0 0; font-size: 16px;">Obrigado pelo seu interesse!</p>
    </div>

    <div style="padding: 40px 30px;">
      <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Olá, ${data.name || 'Candidato'}! 👋</h2>
      <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
        Ficamos muito felizes com seu interesse em fazer parte da equipe FeatherBiz! 
        Recebemos sua candidatura e nossa equipe de RH irá analisá-la cuidadosamente.
      </p>

      <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin: 25px 0;">
        <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">📋 Dados da Candidatura:</h3>
        <div style="margin-bottom: 10px;">
          <strong style="color: #374151;">Posição de Interesse:</strong> 
          <span style="color: #1f2937;">${data.position || 'Não especificada'}</span>
        </div>
        <div style="margin-bottom: 10px;">
          <strong style="color: #374151;">Email:</strong> 
          <span style="color: #1f2937;">${data.email || 'Não informado'}</span>
        </div>
        <div>
          <strong style="color: #374151;">Data de Envio:</strong> 
          <span style="color: #1f2937;">${new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0;">
        <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">🚀 Próximos Passos</h3>
        <ul style="color: #451a03; margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Nossa equipe de RH irá revisar sua candidatura</li>
          <li>Caso seu perfil seja compatível, entraremos em contato</li>
          <li>O processo seletivo será conduzido de forma transparente</li>
          <li>Manteremos você informado sobre o status</li>
        </ul>
      </div>

      <div style="background-color: #e0f2fe; border-left: 4px solid #0284c7; padding: 20px; margin: 30px 0;">
        <h3 style="color: #0c4a6e; margin: 0 0 10px 0; font-size: 16px;">💡 Sobre o FeatherBiz</h3>
        <p style="color: #075985; margin: 0; line-height: 1.6;">
          Somos uma startup focada em automação empresarial com IA. 
          Trabalhamos com tecnologias modernas e buscamos pessoas apaixonadas por inovação e excelência.
        </p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="https://featherbiz.io/careers" 
           style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
          📋 Ver Outras Vagas
        </a>
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 30px; text-align: center;">
      <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
        Dúvidas sobre o processo seletivo? Entre em contato:
      </p>
      <a href="mailto:careers@featherbiz.io" style="color: #f59e0b; text-decoration: none; font-weight: 600;">careers@featherbiz.io</a>
    </div>

    <div style="background-color: #1f2937; padding: 20px 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0; font-size: 14px;">
        © 2024 FeatherBiz - Construindo o futuro juntos!
      </p>
    </div>
  </div>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, to, data }: AdminEmailRequest = await req.json();
    
    const emailConfig = getEmailConfig(type);
    if (!emailConfig) {
      throw new Error(`Invalid email type: ${type}`);
    }

    let html = '';
    switch (type) {
      case 'welcome':
        html = generateWelcomeHTML(data);
        break;
      case 'order':
        html = generateOrderHTML(data);
        break;
      case 'support':
        html = generateSupportHTML(data);
        break;
      case 'career':
        html = generateCareerHTML(data);
        break;
      default:
        html = `<h1>Notificação FeatherBiz</h1><p>${data.message || 'Mensagem não especificada'}</p>`;
    }

    const emailResponse = await resend.emails.send({
      from: emailConfig.from,
      to: to ? [to] : ['admin@featherbiz.io'],
      bcc: ['wearefeatherbiz@gmail.com'],
      subject: emailConfig.subject,
      html: html,
    });

    console.log(`${type} email sent successfully:`, emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      type: type
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-admin-emails function:", error);
    
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
