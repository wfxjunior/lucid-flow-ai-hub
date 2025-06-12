
-- Create email_logs table for tracking email sending
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  order_number TEXT,
  transaction_id TEXT,
  email_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own email logs
CREATE POLICY "Users can view their own email logs" 
  ON public.email_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for inserting email logs (service role can insert)
CREATE POLICY "Service can insert email logs" 
  ON public.email_logs 
  FOR INSERT 
  WITH CHECK (true);
