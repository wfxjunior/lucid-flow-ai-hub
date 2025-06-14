
-- Create table for user email settings
CREATE TABLE public.user_email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  provider TEXT NOT NULL DEFAULT 'resend',
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL,
  api_key TEXT NOT NULL, -- Will be encrypted
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one active configuration per user per provider
  UNIQUE(user_id, provider, is_active) DEFERRABLE INITIALLY DEFERRED
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_email_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for user email settings
CREATE POLICY "Users can view their own email settings" 
  ON public.user_email_settings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own email settings" 
  ON public.user_email_settings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email settings" 
  ON public.user_email_settings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email settings" 
  ON public.user_email_settings 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create table for email logs per user
CREATE TABLE public.user_email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL DEFAULT 'custom',
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  provider_response JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS for email logs
ALTER TABLE public.user_email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for email logs
CREATE POLICY "Users can view their own email logs" 
  ON public.user_email_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own email logs" 
  ON public.user_email_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
