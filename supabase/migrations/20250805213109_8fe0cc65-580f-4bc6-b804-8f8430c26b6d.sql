-- Fix security issues by updating functions with proper search_path

-- Update generate_tracking_token function
CREATE OR REPLACE FUNCTION public.generate_tracking_token()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Update ensure_tracking_token function
CREATE OR REPLACE FUNCTION public.ensure_tracking_token()
RETURNS TRIGGER
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