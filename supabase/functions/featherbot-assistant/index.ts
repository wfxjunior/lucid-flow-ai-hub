import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive knowledge base in English
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

    const userKnowledge = knowledgeBase['en-US'];

    // Pricing-focused system prompt for pricing context
    const pricingSystemPrompt = `You are FeatherBot, a specialized pricing and sales assistant for FeatherBiz. Your main goal is to educate visitors about FeatherBiz plans, pricing, and features to help them make informed decisions.

IMPORTANT: Respond in English. All your responses must be in English.

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

    const generalSystemPrompt = `You are FeatherBot, an intelligent assistant for the FeatherBiz business management platform. You help users manage their business operations including invoices, estimates, receipts, clients, earnings, and much more.

IMPORTANT: Always respond in English. All your responses must be in English regardless of the user's language.

Knowledge Base - Use this information to answer questions:
FAQ references available if needed

User's Current Business Data:
- Total Clients: ${businessContext.business_summary.total_clients}
- Total Invoices: ${businessContext.business_summary.total_invoices}
- Pending Invoices: ${businessContext.business_summary.pending_invoices}
- Monthly Earnings: $${businessContext.business_summary.monthly_earnings}
- Total Revenue: $${businessContext.business_summary.total_revenue}

COMPLETE FEATHERBIZ PLATFORM FEATURES:

📋 BUSINESS MANAGEMENT:
1. INVOICES: Create, send and track custom invoices
2. ESTIMATES: Create estimates and convert them to invoices easily
3. RECEIPTS: Generate receipts for completed work
4. CONTRACTS: Create and manage business contracts
5. CLIENTS: Manage client information and communication

📅 SCHEDULING & COMMUNICATION:
6. APPOINTMENTS: Schedule and track appointments
7. FEATHER FORMS: Create custom forms for data collection
8. E-SIGNATURES: Send documents for digital signing
9. SMART SCHEDULE: AI-powered scheduling system

📊 ANALYSIS & CONTROL:
10. ANALYTICS: View business performance metrics
11. FEATHER BUDGET: AI budgeting tool
12. FEATHER TAX: Tax management system
13. EARN SYNC: Track earnings and expenses

👥 TEAM MANAGEMENT:
14. CREW CONTROL: Team management and payroll
15. MAT TRACK: Material and inventory tracking
16. CAR RENTAL: Vehicle rental management

💰 PLANS & PRICING:
- FREE: $0/month - Basic features, 5 clients, 10 documents/month
- STARTER: $9.99/month - Basic client management and invoicing
- GROWTH: $24.99/month - More automations, email tracking, integrations
- PREMIUM: $49.99/month - Team collaboration, advanced reporting, priority support
- Free trial: 7 days with full Growth plan features
- Annual billing: 20% discount available
- Cancellation: Anytime without penalty

🎯 UNIQUE BENEFITS:
- Multi-language interface
- Specialized support
- Payment integrations
- Document generation
- Tax management
- Complete brand customization
- Mobile app for iOS and Android
- SSL security and cloud infrastructure

📞 SUPPORT & CONTACT:
- Live chat: Premium and FeatherGold plans
- Onboarding: Growth and Premium users
- Email: hello@featherbiz.io
- Demos: Available via chatbot
- Non-profit/student discounts: hello@featherbiz.io

Response Guidelines:
- Always provide useful and accurate information about platform features
- Use real user data when relevant
- Be concise but informative
- If the user asks about creating documents, explain the step-by-step process
- For earnings/revenue questions, use their real data
- Always maintain a professional but friendly tone
- If you don't have specific data, be honest about limitations
- Always respond in English
- When users ask about actions (like creating invoices), guide them to the appropriate platform section
- Use the knowledge base to answer common questions accurately
- Explain how each feature can specifically help the user's business
- Be proactive in suggesting features that might be useful based on the user's question`;

    const systemPrompt = reqContext === 'pricing_plans' ? pricingSystemPrompt : generalSystemPrompt;

    // Check for simple data queries that don't need AI (in English)
    const simpleResponses = {
      'how many invoices': `You currently have ${businessContext.business_summary.total_invoices} invoices in your account.`,
      'invoices i have': `You have ${businessContext.business_summary.total_invoices} total invoices, with ${businessContext.business_summary.pending_invoices} pending invoices.`,
      'how many clients': `You have ${businessContext.business_summary.total_clients} clients in your system.`,
      'total revenue': `Your total revenue is $${businessContext.business_summary.total_revenue}.`,
      'monthly earnings': `Your monthly earnings are $${businessContext.business_summary.monthly_earnings}.`,
      'pending invoices': `You have ${businessContext.business_summary.pending_invoices} pending invoices.`,
      'quantas faturas': `You currently have ${businessContext.business_summary.total_invoices} invoices in your account.`,
      'faturas que tenho': `You have ${businessContext.business_summary.total_invoices} total invoices, with ${businessContext.business_summary.pending_invoices} pending invoices.`,
      'quantos clientes': `You have ${businessContext.business_summary.total_clients} clients in your system.`,
      'receita total': `Your total revenue is $${businessContext.business_summary.total_revenue}.`,
      'ganhos mensais': `Your monthly earnings are $${businessContext.business_summary.monthly_earnings}.`,
      'faturas pendentes': `You have ${businessContext.business_summary.pending_invoices} pending invoices.`
    };

    // Check if the message matches a simple query
    const messageKey = Object.keys(simpleResponses).find(key => 
      message.toLowerCase().includes(key)
    );

    if (messageKey) {
      return new Response(JSON.stringify({ 
        response: simpleResponses[messageKey as keyof typeof simpleResponses] 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const data = await openAIResponse.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content.trim();

    // Save conversation to database if user is logged in
    if (user) {
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