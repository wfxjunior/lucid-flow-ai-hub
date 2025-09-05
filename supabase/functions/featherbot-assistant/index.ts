import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive knowledge base in multiple languages
const knowledgeBase = {
  'en-US': {
    faqs: [
      {
        question: "How do I create my first invoice?",
        answer: "To create your first invoice, navigate to the 'Invoices' section from your dashboard. Click 'Create New Invoice', fill in your client details, add line items for your products or services, and click 'Generate Invoice'. You can then send it directly to your client or download it as a PDF."
      },
      {
        question: "Can I customize my invoice templates?",
        answer: "Yes! FeatherBiz offers customizable invoice templates. You can add your company logo, change colors, modify layouts, and include custom fields to match your brand identity."
      },
      {
        question: "How does the estimate approval process work?",
        answer: "When you create an estimate, you can send it to your client for review. Clients can view the estimate online and either approve or request changes. Once approved, you can easily convert the estimate into an invoice or work order."
      },
      {
        question: "What payment methods do you support?",
        answer: "FeatherBiz integrates with popular payment processors including Stripe and PayPal. Clients can pay invoices online using credit cards, bank transfers, or digital wallets."
      },
      {
        question: "How do I track my business expenses?",
        answer: "You can track expenses by uploading receipts, categorizing transactions, and connecting your bank accounts. The system automatically organizes your expenses and provides detailed reports for tax preparation."
      },
      {
        question: "Can I manage multiple businesses?",
        answer: "Yes, FeatherBiz supports multiple business profiles. You can switch between different businesses from your dashboard and keep all data completely separate."
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely. We use enterprise-grade encryption, regular security audits, and comply with industry standards. Your data is backed up regularly and stored in secure, geographically distributed data centers."
      },
      {
        question: "How do I set up recurring invoices?",
        answer: "In the invoice creation screen, select 'Recurring Invoice' and choose your billing frequency (weekly, monthly, quarterly, or yearly). The system will automatically generate and send invoices according to your schedule."
      },
      {
        question: "Can I integrate with my existing tools?",
        answer: "FeatherBiz offers integrations with popular accounting software like QuickBooks, Xero, and FreshBooks, as well as CRM systems and project management tools."
      },
      {
        question: "What support options are available?",
        answer: "We offer 24/7 email support, live chat during business hours, comprehensive documentation, video tutorials, and webinar training sessions for all users."
      },
      {
        question: "How quickly can I get started with FeatherBiz?",
        answer: "You can start using FeatherBiz in under 2 minutes. Simply sign up, verify your email, and you'll have immediate access to all features in your free plan."
      },
      {
        question: "Do I need a credit card to try FeatherBiz?",
        answer: "No credit card required! Our free plan gives you access to core features permanently. You only pay when you're ready to upgrade for advanced features."
      }
    ]
  },
  'pt-BR': {
    faqs: [
      {
        question: "Como criar minha primeira fatura?",
        answer: "Para criar sua primeira fatura, navegue até a seção 'Faturas' no seu painel. Clique em 'Criar Nova Fatura', preencha os detalhes do cliente, adicione itens de linha para seus produtos ou serviços e clique em 'Gerar Fatura'. Você pode então enviá-la diretamente ao seu cliente ou baixá-la como PDF."
      },
      {
        question: "Posso personalizar meus modelos de fatura?",
        answer: "Sim! O FeatherBiz oferece modelos de fatura personalizáveis. Você pode adicionar o logotipo da sua empresa, alterar cores, modificar layouts e incluir campos personalizados para corresponder à identidade da sua marca."
      },
      {
        question: "Como funciona o processo de aprovação de orçamentos?",
        answer: "Quando você criar um orçamento, pode enviá-lo ao seu cliente para revisão. Os clientes podem visualizar o orçamento online e aprová-lo ou solicitar alterações. Uma vez aprovado, você pode facilmente converter o orçamento em uma fatura ou ordem de serviço."
      },
      {
        question: "Quais métodos de pagamento vocês suportam?",
        answer: "O FeatherBiz se integra com processadores de pagamento populares incluindo Stripe e PayPal. Os clientes podem pagar faturas online usando cartões de crédito, transferências bancárias ou carteiras digitais."
      },
      {
        question: "Como rastrear as despesas do meu negócio?",
        answer: "Você pode rastrear despesas carregando recibos, categorizando transações e conectando suas contas bancárias. O sistema organiza automaticamente suas despesas e fornece relatórios detalhados para preparação de impostos."
      }
    ]
  },
  'es': {
    faqs: [
      {
        question: "¿Cómo creo mi primera factura?",
        answer: "Para crear tu primera factura, navega a la sección 'Facturas' desde tu panel. Haz clic en 'Crear Nueva Factura', completa los detalles del cliente, agrega elementos de línea para tus productos o servicios, y haz clic en 'Generar Factura'. Luego puedes enviarla directamente a tu cliente o descargarla como PDF."
      },
      {
        question: "¿Puedo personalizar mis plantillas de factura?",
        answer: "¡Sí! FeatherBiz ofrece plantillas de factura personalizables. Puedes agregar el logo de tu empresa, cambiar colores, modificar diseños e incluir campos personalizados para coincidir con tu identidad de marca."
      },
      {
        question: "¿Cómo funciona el proceso de aprobación de presupuestos?",
        answer: "Cuando creas un presupuesto, puedes enviarlo a tu cliente para revisión. Los clientes pueden ver el presupuesto en línea y aprobarlo o solicitar cambios. Una vez aprobado, puedes convertir fácilmente el presupuesto en una factura u orden de trabajo."
      }
    ]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en-US', context: reqContext = 'general', model } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Optional user from Authorization header (public allowed)
    const authHeader = req.headers.get('Authorization');

    // Create Supabase client (service role for server-side reads when user present)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let user: { id: string } | null = null;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const jwt = authHeader.replace('Bearer ', '');
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser(jwt);
        if (!userError && authUser) user = { id: authUser.id };
      } catch (_e) {
        // ignore auth errors for public usage
        user = null;
      }
    }

    // Build business context (supports anonymous visitors)
    let businessContext = {
      user_id: user?.id || null,
      business_summary: {
        total_clients: 0,
        total_invoices: 0,
        pending_invoices: 0,
        monthly_earnings: 0,
        total_revenue: 0,
        recent_invoices: [] as any[],
        recent_clients: [] as any[]
      }
    };

    if (user) {
      const [invoicesData, clientsData, estimatesData, receiptsData, earningsData] = await Promise.all([
        supabase.from('invoices').select('*').eq('user_id', user.id).limit(50),
        supabase.from('clients').select('*').eq('user_id', user.id).limit(50),
        supabase.from('estimates').select('*').eq('user_id', user.id).limit(20),
        supabase.from('accounting_documents').select('*').eq('user_id', user.id).eq('document_type', 'receipt').limit(20),
        supabase.from('earnsync_earnings').select('*').eq('user_id', user.id).limit(200)
      ]);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const monthlyEarnings = (earningsData.data || []).filter((earning: any) => {
        const earningDate = new Date(earning.date);
        return earningDate.getMonth() + 1 === currentMonth && earningDate.getFullYear() === currentYear;
      }).reduce((sum: number, earning: any) => sum + Number(earning.amount || 0), 0);

      const invoices = invoicesData.data || [];
      const totalRevenue = invoices.reduce((sum: number, inv: any) => sum + Number(inv.amount || 0), 0);
      const pendingInvoices = invoices.filter((inv: any) => inv.status === 'pending');

      businessContext = {
        user_id: user.id,
        business_summary: {
          total_clients: (clientsData.data || []).length,
          total_invoices: invoices.length,
          pending_invoices: pendingInvoices.length,
          monthly_earnings: monthlyEarnings,
          total_revenue: totalRevenue,
          recent_invoices: invoices.slice(0, 5),
          recent_clients: (clientsData.data || []).slice(0, 10)
        }
      };
    }

    // Normalize language and internal KB
    const languageConfig = {
      'en-US': { name: 'English', responseLanguage: 'English', short: 'en' },
      'en': { name: 'English', responseLanguage: 'English', short: 'en' },
      'pt-BR': { name: 'Portuguese', responseLanguage: 'Portuguese (Brazilian)', short: 'pt' },
      'pt': { name: 'Portuguese', responseLanguage: 'Portuguese (Brazilian)', short: 'pt' },
      'es': { name: 'Spanish', responseLanguage: 'Spanish', short: 'es' },
      'fr': { name: 'French', responseLanguage: 'French', short: 'fr' },
      'zh': { name: 'Chinese', responseLanguage: 'Chinese (Simplified)', short: 'zh' },
      'de': { name: 'German', responseLanguage: 'German', short: 'de' }
    } as const;

    const userLanguage = (languageConfig as any)[language] || languageConfig['en'];

    const userKnowledge = (knowledgeBase as any)[language] || (knowledgeBase as any)['en-US'];

    // Pricing-focused system prompt for pricing context
    const pricingSystemPrompt = `You are FeatherBot, a specialized pricing and sales assistant for FeatherBiz. Your main goal is to educate visitors about FeatherBiz plans, pricing, and features to help them make informed decisions.

IMPORTANT: Respond in ${userLanguage.responseLanguage}. All your responses must be in ${userLanguage.responseLanguage}.

FEATHERBIZ PRICING PLANS:

🆓 FREE PLAN:
- Price: $0/month forever
- Features: Basic invoicing, 5 clients, 10 documents/month
- Perfect for: Freelancers and small startups
- Limitations: Basic features only, FeatherBiz branding

💼 PRO PLAN - $29/month:
- Price: $29/month or $290/year (save $58)
- Features: EVERYTHING unlocked - unlimited clients, documents, advanced analytics, priority support, white-label branding
- Perfect for: Growing businesses and professionals
- Free trial: 14 days, no credit card required
- Can cancel anytime

🏢 ENTERPRISE:
- Price: Custom pricing based on needs
- Features: Custom integrations, dedicated support, advanced security
- Perfect for: Large teams and corporations
- Contact sales for quote

KEY BENEFITS:
✅ No setup fees or hidden costs
✅ Cancel anytime, no contracts
✅ 14-day free trial on Pro
✅ 24/7 customer support
✅ 99.9% uptime guarantee
✅ Enterprise-grade security
✅ Available in 6+ languages

COMMON QUESTIONS TO ANSWER:
- Plan comparisons and recommendations
- Pricing details and billing cycles
- Free trial information
- Cancellation and refund policies
- Feature availability by plan
- Discount and promotional offers
- Payment methods accepted
- Upgrade/downgrade process

Your personality: Friendly, helpful, knowledgeable about business needs. Focus on educating rather than hard selling. Ask qualifying questions to recommend the right plan.

If someone seems interested, offer to collect their email for follow-up and special offers.`;

    const generalSystemPrompt = `Você é FeatherBot, um assistente inteligente para a plataforma de gestão empresarial FeatherBiz. Você ajuda usuários a gerenciar suas operações comerciais incluindo faturas, orçamentos, recibos, clientes, ganhos e muito mais.

IMPORTANTE: Responda sempre em Português Brasileiro. Todas as suas respostas devem ser em Português do Brasil.

Base de Conhecimento - Use estas informações para responder perguntas:
${knowledgeContext}

Dados Atuais do Negócio do Usuário:
- Total de Clientes: ${businessContext.business_summary.total_clients}
- Total de Faturas: ${businessContext.business_summary.total_invoices}
- Faturas Pendentes: ${businessContext.business_summary.pending_invoices}
- Ganhos Mensais: R$${businessContext.business_summary.monthly_earnings}
- Receita Total: R$${businessContext.business_summary.total_revenue}

FUNCIONALIDADES COMPLETAS DA PLATAFORMA FEATHERBIZ:

📋 GESTÃO COMERCIAL:
1. FATURAS: Crie, envie e acompanhe faturas personalizadas
2. ORÇAMENTOS: Crie orçamentos e converta-os em faturas facilmente
3. RECIBOS: Gere recibos para trabalhos concluídos
4. CONTRATOS: Crie e gerencie contratos comerciais
5. CLIENTES: Gerencie informações e comunicação com clientes

📅 AGENDAMENTO & COMUNICAÇÃO:
6. COMPROMISSOS: Agende e acompanhe compromissos
7. FEATHER FORMS: Crie formulários personalizados para coleta de dados
8. E-ASSINATURAS: Envie documentos para assinatura digital
9. SMART SCHEDULE: Sistema de agendamento com IA

📊 ANÁLISE & CONTROLE:
10. ANALYTICS: Visualize métricas de desempenho do negócio
11. FEATHER BUDGET: Ferramenta de orçamento com IA
12. FEATHER TAX: Sistema de gestão de impostos
13. EARN SYNC: Acompanhamento de ganhos e despesas

👥 GESTÃO DE EQUIPE:
14. CREW CONTROL: Gestão de equipe e folha de pagamento
15. MAT TRACK: Rastreamento de materiais e estoque
16. CAR RENTAL: Gestão de aluguel de veículos

💰 PLANOS E PREÇOS:
- FREE: R$0/mês - Funcionalidades básicas, 5 clientes, 10 documentos/mês
- STARTER: R$39,90/mês - Gestão básica de clientes e faturamento
- GROWTH: R$79,90/mês - Mais automações, tracking de email, integrações
- PREMIUM: R$149,90/mês - Colaboração em equipe, relatórios avançados, suporte prioritário
- Teste grátis: 7 dias com recursos completos do plano Growth
- Cobrança anual: 20% de desconto
- Cancelamento: A qualquer momento sem penalidades

🎯 BENEFÍCIOS ÚNICOS:
- Interface 100% em português brasileiro
- Suporte especializado para mercado brasileiro
- Integração com meios de pagamento nacionais
- Emissão de documentos fiscais brasileiros
- Gestão de impostos específica do Brasil
- Personalização completa de marca
- Aplicativo mobile para iOS e Android
- Segurança SSL e infraestrutura em nuvem

📞 SUPORTE & CONTATO:
- Chat ao vivo: Planos Premium e FeatherGold
- Onboarding: Usuários Growth e Premium
- E-mail: contato@featherbiz.io
- Demonstrações: Disponível via chatbot
- Descontos para ONGs/estudantes: contato@featherbiz.io

Diretrizes para Resposta:
- Sempre forneça informações úteis e precisas sobre os recursos da plataforma
- Use os dados reais do usuário quando relevante
- Seja conciso mas informativo
- Se o usuário perguntar sobre criação de documentos, explique o processo passo a passo
- Para perguntas sobre ganhos/receita, use os dados reais deles
- Mantenha sempre um tom profissional mas amigável
- Se não tiver dados específicos, seja honesto sobre as limitações
- Responda SEMPRE em Português Brasileiro
- Quando usuários perguntarem sobre ações (como criar faturas), guide-os para a seção apropriada da plataforma
- Use a base de conhecimento para responder perguntas comuns com precisão
- Explique como cada funcionalidade pode ajudar especificamente no negócio do usuário
- Seja proativo em sugerir funcionalidades que podem ser úteis baseado na pergunta do usuário`;

    const systemPrompt = reqContext === 'pricing_plans' ? pricingSystemPrompt : generalSystemPrompt;

    // Check for simple data queries that don't need AI (in Portuguese)
    const simpleResponses = {
      'quantas faturas': `Você tem atualmente ${businessContext.business_summary.total_invoices} faturas em sua conta.`,
      'faturas que tenho': `Você tem ${businessContext.business_summary.total_invoices} faturas no total, com ${businessContext.business_summary.pending_invoices} faturas pendentes.`,
      'quantos clientes': `Você tem ${businessContext.business_summary.total_clients} clientes em seu sistema.`,
      'receita total': `Sua receita total é R$${businessContext.business_summary.total_revenue}.`,
      'ganhos mensais': `Seus ganhos mensais são R$${businessContext.business_summary.monthly_earnings}.`,
      'faturas pendentes': `Você tem ${businessContext.business_summary.pending_invoices} faturas pendentes.`,
      'how many invoices': `Você tem atualmente ${businessContext.business_summary.total_invoices} faturas em sua conta.`,
      'invoices i have': `Você tem ${businessContext.business_summary.total_invoices} faturas no total, com ${businessContext.business_summary.pending_invoices} faturas pendentes.`,
      'how many clients': `Você tem ${businessContext.business_summary.total_clients} clientes em seu sistema.`,
      'total revenue': `Sua receita total é R$${businessContext.business_summary.total_revenue}.`,
      'monthly earnings': `Seus ganhos mensais são R$${businessContext.business_summary.monthly_earnings}.`,
      'pending invoices': `Você tem ${businessContext.business_summary.pending_invoices} faturas pendentes.`
    };

    // Check if the message matches a simple query
    const messageKey = Object.keys(simpleResponses).find(key => 
      message.toLowerCase().includes(key)
    );

    if (messageKey) {
      const simpleResponse = simpleResponses[messageKey];
      
      // Save conversation to database (only if authenticated)
      if (user) {
        try {
          await supabase.from('featherbot_conversations').insert({
            user_id: user.id,
            message: message,
            response: simpleResponse
          });
        } catch (dbError) {
          console.error('Database save error:', dbError);
        }
      }

      return new Response(JSON.stringify({ response: simpleResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Sending request to OpenAI...');
    const modelToUse = (model && typeof model === 'string') ? model : 'gpt-4.1-2025-04-14';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      
      // Provide a helpful fallback message for quota exceeded
      if (errorText.includes('insufficient_quota') || errorText.includes('exceeded your current quota')) {
        const fallbackResponse = `I'm currently experiencing some technical difficulties with my AI processing. However, I can see that you have ${businessContext.business_summary.total_invoices} invoices, ${businessContext.business_summary.total_clients} clients, and your monthly earnings are $${businessContext.business_summary.monthly_earnings}. Please try asking me about specific business data, or contact support if you need help with platform features.`;
        
        // Save conversation to database (only if authenticated)
        if (user) {
          try {
            await supabase.from('featherbot_conversations').insert({
              user_id: user.id,
              message: message,
              response: fallbackResponse
            });
          } catch (dbError) {
            console.error('Database save error:', dbError);
          }
        }

        return new Response(JSON.stringify({ response: fallbackResponse }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const aiData = await response.json();
    console.log('OpenAI response data:', JSON.stringify(aiData, null, 2));

    // Safe access to response with proper error handling
    if (!aiData.choices || !Array.isArray(aiData.choices) || aiData.choices.length === 0) {
      throw new Error('Invalid response format from OpenAI API');
    }

    const aiResponse = aiData.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No content in OpenAI response');
    }

    // Save conversation to database
    try {
      await supabase.from('featherbot_conversations').insert({
        user_id: user.id,
        message: message,
        response: aiResponse
      });
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Don't throw here, we still want to return the AI response
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('FeatherBot error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process request' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});