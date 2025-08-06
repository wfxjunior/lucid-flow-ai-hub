-- Create table for FeatherBot lead capture
CREATE TABLE IF NOT EXISTS public.featherbot_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  source TEXT DEFAULT 'pricing_chatbot',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.featherbot_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users
CREATE POLICY "Allow lead capture" 
ON public.featherbot_leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to view leads for admin users
CREATE POLICY "Admin can view leads" 
ON public.featherbot_leads 
FOR SELECT 
USING (auth.uid() IN (
  SELECT user_id FROM user_roles WHERE role = 'admin'
));