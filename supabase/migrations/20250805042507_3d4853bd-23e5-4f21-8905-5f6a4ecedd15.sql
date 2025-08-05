-- Update user_settings table to start numbering sequences at 0 for new accounts
ALTER TABLE public.user_settings 
ALTER COLUMN estimate_number_start SET DEFAULT 0;

ALTER TABLE public.user_settings 
ALTER COLUMN invoice_number_start SET DEFAULT 0;

-- Update existing users who still have the default value of 1 to use 0 instead
UPDATE public.user_settings 
SET estimate_number_start = 0 
WHERE estimate_number_start = 1;

UPDATE public.user_settings 
SET invoice_number_start = 0 
WHERE invoice_number_start = 1;