-- Add the missing status column to receipts table
ALTER TABLE public.receipts 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid'));