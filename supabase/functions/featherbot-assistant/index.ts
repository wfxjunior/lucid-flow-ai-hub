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
    const { message, language = 'en-US' } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get the user from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from JWT
    const jwt = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);
    
    if (userError || !user) {
      throw new Error('Invalid authentication');
    }

    // Get user's business data for context
    const [invoicesData, clientsData, estimatesData, receiptsData, earningsData] = await Promise.all([
      supabase.from('invoices').select('*').eq('user_id', user.id).limit(20).maybeSingle(),
      supabase.from('clients').select('*').eq('user_id', user.id).limit(50),
      supabase.from('estimates').select('*').eq('user_id', user.id).limit(20),
      supabase.from('accounting_documents').select('*').eq('user_id', user.id).eq('document_type', 'receipt').limit(20),
      supabase.from('earnsync_earnings').select('*').eq('user_id', user.id).limit(50)
    ]);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate monthly earnings safely
    const monthlyEarnings = earningsData.data?.filter(earning => {
      const earningDate = new Date(earning.date);
      return earningDate.getMonth() + 1 === currentMonth && earningDate.getFullYear() === currentYear;
    }).reduce((sum, earning) => sum + Number(earning.amount), 0) || 0;

    // Calculate total revenue safely
    const totalRevenue = invoicesData.data ? (Array.isArray(invoicesData.data) ? invoicesData.data : [invoicesData.data]).reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0) : 0;

    // Count pending invoices safely
    const pendingInvoices = invoicesData.data ? (Array.isArray(invoicesData.data) ? invoicesData.data : [invoicesData.data]).filter(invoice => invoice.status === 'pending') : [];

    // Get knowledge base for user's language
    const userKnowledge = knowledgeBase[language] || knowledgeBase['en-US'];

    // Prepare context for AI
    const context = {
      user_id: user.id,
      business_summary: {
        total_clients: clientsData.data?.length || 0,
        total_invoices: invoicesData.data ? (Array.isArray(invoicesData.data) ? invoicesData.data.length : 1) : 0,
        pending_invoices: pendingInvoices.length,
        monthly_earnings: monthlyEarnings,
        total_revenue: totalRevenue,
        recent_invoices: invoicesData.data ? (Array.isArray(invoicesData.data) ? invoicesData.data.slice(0, 5) : [invoicesData.data]) : [],
        recent_clients: clientsData.data?.slice(0, 10) || []
      }
    };

    // Language configuration
    const languageConfig = {
      'en-US': { name: 'English', responseLanguage: 'English' },
      'pt-BR': { name: 'Portuguese', responseLanguage: 'Portuguese (Brazilian)' },
      'es': { name: 'Spanish', responseLanguage: 'Spanish' },
      'fr': { name: 'French', responseLanguage: 'French' },
      'zh': { name: 'Chinese', responseLanguage: 'Chinese (Simplified)' },
      'de': { name: 'German', responseLanguage: 'German' }
    };

    const userLanguage = languageConfig[language] || languageConfig['en-US'];

    // Create comprehensive knowledge base context
    const knowledgeContext = userKnowledge.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');

    const systemPrompt = `You are FeatherBot, an intelligent assistant for the FeatherBiz business management platform. You help users manage their business operations including invoices, estimates, receipts, clients, and earnings.

IMPORTANT: Respond in ${userLanguage.responseLanguage}. All your responses must be in ${userLanguage.responseLanguage}.

Knowledge Base - Use this information to answer questions:
${knowledgeContext}

User's Current Business Data:
- Total Clients: ${context.business_summary.total_clients}
- Total Invoices: ${context.business_summary.total_invoices}
- Pending Invoices: ${context.business_summary.pending_invoices}
- Monthly Earnings: $${context.business_summary.monthly_earnings}
- Total Revenue: $${context.business_summary.total_revenue}

Available Features on FeatherBiz:
1. INVOICES: Create, send, and track invoices
2. ESTIMATES: Create estimates and convert them to invoices
3. RECEIPTS: Generate receipts for completed work
4. CLIENTS: Manage client information and communication
5. CONTRACTS: Create and manage business contracts
6. APPOINTMENTS: Schedule and track appointments
7. FEATHER FORMS: Create custom forms for data collection
8. ANALYTICS: View business performance metrics
9. E-SIGNATURES: Send documents for digital signatures
10. SMART SCHEDULE: AI-powered scheduling system
11. CREW CONTROL: Team management and payroll
12. MAT TRACK: Material and inventory tracking
13. CAR RENTAL: Vehicle rental management
14. FEATHER BUDGET: AI budgeting tool
15. FEATHER TAX: Tax management system
16. EARN SYNC: Earnings and expense tracking

Core Commands You Must Understand:

📁 PLATFORM FEATURES (INFORMATIONAL):
- How to create invoices, receipts, estimates
- Differences between invoices and receipts
- How to convert estimates to invoices
- How to edit documents after sending
- How to mark receipts as paid/pending
- How to send documents via email/WhatsApp
- How to create client profiles
- How to duplicate invoices
- How to apply discounts and taxes
- Available payment methods
- How to export documents

📊 USER DATA (PERSONALIZED RESPONSES):
- Monthly, yearly, and total earnings
- Pending and unpaid invoices
- Recent receipts and payments
- Client payment status
- Top clients by revenue
- Highest invoices

⚙️ DIRECT ACTIONS (SMART COMMANDS):
- Create invoices, receipts, estimates for specific clients
- Mark invoices as paid
- Send payment reminders
- List documents by client
- Delete draft documents
- Export/download documents
- Create new clients with contact info

💡 EDUCATION & GUIDANCE:
- Best practices for business management
- Pricing strategies
- Invoice descriptions
- Follow-up schedules
- Client organization
- Tax reporting preparation
- Recurring invoices

🧠 CONTEXTUAL MEMORY & HISTORY:
- Remember previous conversations
- Track recent activities
- Provide reminders
- Show conversation history

Guidelines:
- Always provide helpful, accurate information about platform features
- Use the user's actual data when relevant
- Be concise but informative
- If the user asks about creating documents, explain the process step-by-step
- For earnings/revenue questions, use their actual data
- Always maintain a professional but friendly tone
- If you don't have specific data, be honest about limitations
- Respond in ${userLanguage.responseLanguage} at all times
- When users ask about actions (like creating invoices), guide them to the appropriate section of the platform
- Use the knowledge base to answer common questions accurately`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
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