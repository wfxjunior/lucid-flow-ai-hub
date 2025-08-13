-- Fix remaining function search path issues
-- Update all remaining functions to have explicit search_path settings

CREATE OR REPLACE FUNCTION public.generate_quote_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.quotes
  WHERE user_id = auth.uid() AND quote_number IS NOT NULL;
  
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'QUO-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_salesorder_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(salesorder_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.sales_orders
  WHERE user_id = auth.uid() AND salesorder_number IS NOT NULL;
  
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'SO-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_proposal_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(proposal_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.business_proposals
  WHERE user_id = auth.uid() AND proposal_number IS NOT NULL;
  
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'PRO-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_bid_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(bid_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.bids
  WHERE user_id = auth.uid() AND bid_number IS NOT NULL;
  
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'BID-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_contract_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.generate_receipt_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(receipt_number FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.receipts
  WHERE user_id = auth.uid();
  
  RETURN 'REC-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_work_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(work_order_number FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.work_orders
  WHERE user_id = auth.uid();
  
  RETURN 'WO-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_meeting_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(meeting_id FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.meetings
  WHERE user_id = auth.uid() AND meeting_id IS NOT NULL;
  
  RETURN 'MTG-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_estimate_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
  current_max INTEGER;
BEGIN
  -- Get the current maximum estimate number for this user
  SELECT COALESCE(MAX(CAST(SUBSTRING(estimate_number FROM '[0-9]+') AS INTEGER)), starting_number - 1)
  INTO current_max
  FROM public.estimates
  WHERE user_id = auth.uid() AND estimate_number IS NOT NULL;
  
  -- Calculate next number
  next_number := GREATEST(current_max + 1, starting_number);
  
  RETURN 'EST-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.invoices
  WHERE user_id = auth.uid();
  
  RETURN 'INV-' || LPAD(next_number::TEXT, 4, '0');
END;
$function$;