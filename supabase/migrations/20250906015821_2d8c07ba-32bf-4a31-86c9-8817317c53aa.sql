-- Fix remaining security linter issues

-- Fix 1: Remove SECURITY DEFINER from view and create as normal view
DROP VIEW IF EXISTS public.blog_posts_public;

-- Create normal view without SECURITY DEFINER
CREATE VIEW public.blog_posts_public AS
SELECT 
    id,
    title,
    slug,
    excerpt,
    content,
    tags,
    status,
    published_at,
    created_at,
    updated_at
FROM public.blog_posts
WHERE status = 'published';

-- Grant select access to the view
GRANT SELECT ON public.blog_posts_public TO anon, authenticated;

-- Fix 2-4: Update remaining functions with mutable search paths
-- These are likely functions that weren't updated in the previous migration

-- Update any remaining functions that might have mutable search paths
-- Let's check and fix common functions that might be missing search_path

-- Fix generate_tracking_token function
CREATE OR REPLACE FUNCTION public.generate_tracking_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Fix update_updated_at_column function  
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix ensure_tracking_token function
CREATE OR REPLACE FUNCTION public.ensure_tracking_token()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.tracking_token IS NULL THEN
    NEW.tracking_token := generate_tracking_token();
  END IF;
  RETURN NEW;
END;
$$;

-- Fix generate_invoice_number function
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM '[0-9]+') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.invoices
  WHERE user_id = auth.uid();
  
  RETURN 'INV-' || LPAD(next_number::TEXT, 4, '0');
END;
$$;

-- Fix generate_estimate_number function
CREATE OR REPLACE FUNCTION public.generate_estimate_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Fix all other number generation functions
CREATE OR REPLACE FUNCTION public.generate_quote_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.generate_contract_number(starting_number integer DEFAULT 1)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Fix all other utility functions with proper search paths
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert into profiles table using fully qualified names for security
  INSERT INTO public.profiles (id, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    now(),
    now()
  );
  
  -- Insert into user_notification_settings table
  INSERT INTO public.user_notification_settings (user_id, created_at, updated_at)
  VALUES (NEW.id, now(), now());
  
  RETURN NEW;
END;
$$;

-- Additional security hardening: Create a function to validate all current search paths
CREATE OR REPLACE FUNCTION public.validate_all_function_security()
RETURNS TABLE(function_name text, has_search_path boolean, is_secure boolean)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT 
        p.proname::text as function_name,
        (p.proconfig IS NOT NULL) as has_search_path,
        (p.proconfig IS NOT NULL AND prosecdef) as is_secure
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.proname NOT LIKE 'pg_%'
    ORDER BY p.proname;
$$;