import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
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
      supabase.from('invoices').select('*').eq('user_id', user.id).limit(20),
      supabase.from('clients').select('*').eq('user_id', user.id).limit(50),
      supabase.from('estimates').select('*').eq('user_id', user.id).limit(20),
      supabase.from('accounting_documents').select('*').eq('user_id', user.id).eq('document_type', 'receipt').limit(20),
      supabase.from('earnsync_earnings').select('*').eq('user_id', user.id).limit(50)
    ]);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate monthly earnings
    const monthlyEarnings = earningsData.data?.filter(earning => {
      const earningDate = new Date(earning.date);
      return earningDate.getMonth() + 1 === currentMonth && earningDate.getFullYear() === currentYear;
    }).reduce((sum, earning) => sum + Number(earning.amount), 0) || 0;

    // Calculate total revenue
    const totalRevenue = invoicesData.data?.reduce((sum, invoice) => sum + Number(invoice.amount), 0) || 0;

    // Count pending invoices
    const pendingInvoices = invoicesData.data?.filter(invoice => invoice.status === 'pending') || [];

    // Prepare context for AI
    const context = {
      user_id: user.id,
      business_summary: {
        total_clients: clientsData.data?.length || 0,
        total_invoices: invoicesData.data?.length || 0,
        pending_invoices: pendingInvoices.length,
        monthly_earnings: monthlyEarnings,
        total_revenue: totalRevenue,
        recent_invoices: invoicesData.data?.slice(0, 5) || [],
        recent_clients: clientsData.data?.slice(0, 10) || []
      }
    };

    const systemPrompt = `You are FeatherBot, an intelligent assistant for the FeatherBiz business management platform. You help users manage their business operations including invoices, estimates, receipts, clients, and earnings.

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

Guidelines:
- Always provide helpful, accurate information about platform features
- Use the user's actual data when relevant
- Be concise but informative
- If the user asks about creating documents, explain the process step-by-step
- For earnings/revenue questions, use their actual data
- Always maintain a professional but friendly tone
- If you don't have specific data, be honest about limitations`;

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

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;

    // Save conversation to database
    await supabase.from('featherbot_conversations').insert({
      user_id: user.id,
      message: message,
      response: aiResponse
    });

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