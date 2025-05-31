
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContractRequest {
  prompt: string;
  contractType: string;
  businessType?: string;
  parties?: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, contractType, businessType, parties }: ContractRequest = await req.json();

    const systemPrompt = `You are a legal expert specializing in business contracts. Generate a comprehensive, professional contract based on the user's requirements. 

Instructions:
- Create a legally sound contract structure
- Include all necessary sections and clauses
- Use professional legal language
- Add placeholder text in [BRACKETS] for specific details to be filled in
- Include signature blocks
- Add appropriate disclaimers
- Ensure the contract is suitable for business use

Contract Type: ${contractType}
Business Context: ${businessType || 'General business'}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const generatedContract = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      contract: generatedContract,
      metadata: {
        contractType,
        businessType,
        generatedAt: new Date().toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-contract-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
