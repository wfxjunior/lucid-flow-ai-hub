-- Create missing document tables for number settings functionality

-- Quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  client_id uuid NOT NULL,
  quote_number text,
  title text NOT NULL,
  description text,
  amount numeric NOT NULL DEFAULT 0,
  quote_date date DEFAULT CURRENT_DATE,
  valid_until date,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Sales Orders table
CREATE TABLE IF NOT EXISTS public.sales_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  client_id uuid NOT NULL,
  salesorder_number text,
  title text NOT NULL,
  description text,
  amount numeric NOT NULL DEFAULT 0,
  order_date date DEFAULT CURRENT_DATE,
  delivery_date date,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Business Proposals table
CREATE TABLE IF NOT EXISTS public.business_proposals (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  client_id uuid NOT NULL,
  proposal_number text,
  title text NOT NULL,
  description text,
  amount numeric NOT NULL DEFAULT 0,
  proposal_date date DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Bids table
CREATE TABLE IF NOT EXISTS public.bids (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  client_id uuid NOT NULL,
  bid_number text,
  title text NOT NULL,
  description text,
  amount numeric NOT NULL DEFAULT 0,
  bid_date date DEFAULT CURRENT_DATE,
  deadline date,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own quotes" ON public.quotes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own sales orders" ON public.sales_orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own business proposals" ON public.business_proposals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own bids" ON public.bids FOR ALL USING (auth.uid() = user_id);

-- Create functions to generate numbers for each document type
CREATE OR REPLACE FUNCTION public.generate_quote_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
SET search_path TO 'public'
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
SET search_path TO 'public'
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
SET search_path TO 'public'
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