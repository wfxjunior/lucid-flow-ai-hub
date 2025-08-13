-- Fix function search path security warnings
-- Drop triggers first, then functions, then recreate with proper search_path

-- Drop trigger first
DROP TRIGGER IF EXISTS update_featherbot_leads_updated_at ON public.featherbot_leads;

-- Drop functions
DROP FUNCTION IF EXISTS public.update_featherbot_leads_updated_at();
DROP FUNCTION IF EXISTS public.check_rate_limit(INET, TEXT, INTEGER, INTEGER);

-- Recreate update function with secure search path
CREATE OR REPLACE FUNCTION public.update_featherbot_leads_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_featherbot_leads_updated_at
  BEFORE UPDATE ON public.featherbot_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_featherbot_leads_updated_at();

-- Recreate rate limiting function with secure search path
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  client_ip INET,
  action TEXT,
  max_requests INTEGER DEFAULT 10,
  window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Get current count for this IP and action
  SELECT count, rate_limits.window_start INTO current_count, window_start
  FROM public.rate_limits 
  WHERE ip_address = client_ip AND action_type = action 
  AND rate_limits.window_start > now() - (window_minutes || ' minutes')::INTERVAL;
  
  IF current_count IS NULL THEN
    -- First request in this window
    INSERT INTO public.rate_limits (ip_address, action_type, count)
    VALUES (client_ip, action, 1);
    RETURN TRUE;
  ELSIF current_count < max_requests THEN
    -- Increment counter
    UPDATE public.rate_limits 
    SET count = count + 1 
    WHERE ip_address = client_ip AND action_type = action 
    AND rate_limits.window_start = window_start;
    RETURN TRUE;
  ELSE
    -- Rate limit exceeded
    RETURN FALSE;
  END IF;
END;
$$;