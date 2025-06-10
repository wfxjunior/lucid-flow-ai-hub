
-- Add missing columns to user_settings table for estimate settings
ALTER TABLE public.user_settings 
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS company_address text,
ADD COLUMN IF NOT EXISTS company_phone text,
ADD COLUMN IF NOT EXISTS company_email text,
ADD COLUMN IF NOT EXISTS company_logo text,
ADD COLUMN IF NOT EXISTS estimate_number_prefix text DEFAULT 'EST-',
ADD COLUMN IF NOT EXISTS default_payment_terms text DEFAULT 'Payment due within 30 days',
ADD COLUMN IF NOT EXISTS default_notes text DEFAULT 'Thank you for your business!';
