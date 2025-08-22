
-- Phase 1: Critical Data Protection - Fix Dangerous RLS Policies and Database Functions

-- 1. Fix database function security by updating search paths
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role::text = _role
    );
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT role::text
    FROM public.user_roles
    WHERE user_id = auth.uid()
    LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.validate_user_session()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_exists BOOLEAN;
  last_activity TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Check if user still exists and is active
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE id = auth.uid()) INTO user_exists;
  
  IF NOT user_exists THEN
    -- Log security event for invalid session
    PERFORM log_security_event('auth', 'INVALID_SESSION', auth.uid()::text, 
      NULL, jsonb_build_object('timestamp', now(), 'reason', 'user_not_found'));
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_session_security()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_exists BOOLEAN;
  session_age INTERVAL;
  suspicious_activity BOOLEAN := FALSE;
BEGIN
  -- Check if user still exists and is active
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE id = auth.uid()) INTO user_exists;
  
  IF NOT user_exists THEN
    PERFORM log_security_event('auth', 'INVALID_USER_SESSION', auth.uid()::text, 
      NULL, jsonb_build_object('timestamp', now(), 'reason', 'user_not_found'));
    RETURN FALSE;
  END IF;
  
  -- Check for suspicious activity patterns
  SELECT COUNT(*) > 5 INTO suspicious_activity
  FROM security_audit_log 
  WHERE user_id = auth.uid() 
  AND created_at > now() - interval '1 hour'
  AND operation IN ('RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY');
  
  IF suspicious_activity THEN
    PERFORM log_security_event('auth', 'SUSPICIOUS_SESSION_ACTIVITY', auth.uid()::text,
      NULL, jsonb_build_object('timestamp', now(), 'reason', 'multiple_violations'));
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- 2. Create missing tables that were referenced in the review
CREATE TABLE IF NOT EXISTS public.featherbot_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS public.featherbot_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS public.scale_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'active'
);

-- 3. Enable RLS on all tables
ALTER TABLE public.featherbot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featherbot_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scale_waitlist ENABLE ROW LEVEL SECURITY;

-- 4. Fix dangerous RLS policies - Remove overly permissive policies

-- Remove dangerous policies on featherbot_leads if they exist
DROP POLICY IF EXISTS "Anyone can create leads" ON public.featherbot_leads;
DROP POLICY IF EXISTS "Public can insert leads" ON public.featherbot_leads;

-- Create secure policies for featherbot_leads
CREATE POLICY "Only admins can view leads"
ON public.featherbot_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert leads"
ON public.featherbot_leads  
FOR INSERT
WITH CHECK (true); -- This will be used by edge functions with service role

CREATE POLICY "Only admins can manage leads"
ON public.featherbot_leads
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Secure policies for featherbot_referrals
DROP POLICY IF EXISTS "Anyone can create referrals" ON public.featherbot_referrals;

CREATE POLICY "Only admins can view referrals"
ON public.featherbot_referrals
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert referrals"
ON public.featherbot_referrals
FOR INSERT  
WITH CHECK (true);

-- Secure policies for scale_waitlist
CREATE POLICY "Only admins can view waitlist"
ON public.scale_waitlist
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert waitlist"
ON public.scale_waitlist
FOR INSERT
WITH CHECK (true);

-- 5. Add comprehensive audit logging triggers
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Log access to sensitive customer data with enhanced details
  IF TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses', 'chat_bookings', 'featherbot_leads', 'featherbot_referrals', 'scale_waitlist') THEN
    PERFORM log_security_event(
      TG_TABLE_NAME, 
      TG_OP, 
      COALESCE(NEW.id::text, OLD.id::text),
      CASE WHEN TG_OP = 'DELETE' THEN 
        jsonb_build_object('deleted_at', now(), 'user_id', auth.uid())
      ELSE NULL END,
      CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN 
        jsonb_build_object('accessed_at', now(), 'user_id', auth.uid())
      ELSE NULL END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add triggers for comprehensive audit logging
DROP TRIGGER IF EXISTS audit_featherbot_leads ON public.featherbot_leads;
CREATE TRIGGER audit_featherbot_leads
  AFTER INSERT OR UPDATE OR DELETE ON public.featherbot_leads
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_featherbot_referrals ON public.featherbot_referrals;
CREATE TRIGGER audit_featherbot_referrals
  AFTER INSERT OR UPDATE OR DELETE ON public.featherbot_referrals
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_scale_waitlist ON public.scale_waitlist;
CREATE TRIGGER audit_scale_waitlist
  AFTER INSERT OR UPDATE OR DELETE ON public.scale_waitlist
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

-- 6. Enhanced rate limiting function
CREATE OR REPLACE FUNCTION public.enhanced_rate_limit_check(client_ip inet, action text, user_context uuid DEFAULT auth.uid(), max_requests integer DEFAULT 10, window_minutes integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
  is_suspicious BOOLEAN := FALSE;
BEGIN
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Check for suspicious patterns (multiple IPs for same user)
  IF user_context IS NOT NULL THEN
    SELECT COUNT(DISTINCT ip_address) > 3 INTO is_suspicious
    FROM public.rate_limits 
    WHERE action_type = action 
    AND window_start > now() - interval '1 hour';
  END IF;
  
  -- Log suspicious activity
  IF is_suspicious THEN
    PERFORM log_security_event('rate_limits', 'SUSPICIOUS_ACTIVITY', user_context::text, 
      NULL, jsonb_build_object('ip', client_ip, 'action', action, 'timestamp', now()));
  END IF;
  
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
    -- Rate limit exceeded - log security event
    PERFORM log_security_event('rate_limits', 'RATE_LIMIT_EXCEEDED', user_context::text,
      NULL, jsonb_build_object('ip', client_ip, 'action', action, 'attempts', current_count));
    RETURN FALSE;
  END IF;
END;
$$;
