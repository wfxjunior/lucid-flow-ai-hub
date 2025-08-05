-- Create user_settings table for document number configurations
CREATE TABLE IF NOT EXISTS public.user_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  -- Invoice settings
  invoice_auto_generate boolean DEFAULT true,
  invoice_number_prefix text DEFAULT 'INV-',
  invoice_number_start integer DEFAULT 1,
  -- Estimate settings
  estimate_auto_generate boolean DEFAULT true,
  estimate_number_prefix text DEFAULT 'EST-',
  estimate_number_start integer DEFAULT 1,
  -- Quote settings
  quote_auto_generate boolean DEFAULT true,
  quote_number_prefix text DEFAULT 'QUO-',
  quote_number_start integer DEFAULT 1,
  -- Contract settings
  contract_auto_generate boolean DEFAULT true,
  contract_number_prefix text DEFAULT 'CON-',
  contract_number_start integer DEFAULT 1,
  -- Work Order settings
  workorder_auto_generate boolean DEFAULT true,
  workorder_number_prefix text DEFAULT 'WO-',
  workorder_number_start integer DEFAULT 1,
  -- Sales Order settings
  salesorder_auto_generate boolean DEFAULT true,
  salesorder_number_prefix text DEFAULT 'SO-',
  salesorder_number_start integer DEFAULT 1,
  -- Proposal settings
  proposal_auto_generate boolean DEFAULT true,
  proposal_number_prefix text DEFAULT 'PRO-',
  proposal_number_start integer DEFAULT 1,
  -- Bid settings
  bid_auto_generate boolean DEFAULT true,
  bid_number_prefix text DEFAULT 'BID-',
  bid_number_start integer DEFAULT 1,
  -- Company information
  company_name text,
  company_address text,
  company_phone text,
  company_email text,
  company_logo text,
  -- Default settings
  default_payment_terms text DEFAULT 'Payment due within 30 days',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own settings" 
ON public.user_settings 
FOR ALL 
USING (auth.uid() = user_id);

-- Create function to automatically create user settings on profile creation
CREATE OR REPLACE FUNCTION public.create_user_settings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- Create trigger to auto-create user settings when a profile is created
CREATE OR REPLACE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_user_settings();