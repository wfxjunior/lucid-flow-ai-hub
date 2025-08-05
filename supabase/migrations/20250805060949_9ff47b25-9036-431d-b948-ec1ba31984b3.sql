-- Create function to generate contract numbers
CREATE OR REPLACE FUNCTION public.generate_contract_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(contract_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.contracts
  WHERE user_id = auth.uid() AND contract_number IS NOT NULL;
  
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'CON-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

-- Add contract_number column to contracts table if it doesn't exist
ALTER TABLE public.contracts 
ADD COLUMN IF NOT EXISTS contract_number text;