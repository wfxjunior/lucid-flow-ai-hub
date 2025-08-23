
-- Fix critical database function security by adding SET search_path TO 'public'
-- This prevents SQL injection attacks through search_path manipulation

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role::text = _role
    );
$function$;

-- Update get_current_user_role function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    SELECT role::text
    FROM public.user_roles
    WHERE user_id = auth.uid()
    LIMIT 1;
$function$;

-- Update log_security_event function
CREATE OR REPLACE FUNCTION public.log_security_event(p_table_name text, p_operation text, p_record_id text DEFAULT NULL::text, p_old_data jsonb DEFAULT NULL::jsonb, p_new_data jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    table_name,
    operation,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    p_table_name,
    p_operation,
    p_record_id,
    p_old_data,
    p_new_data
  );
END;
$function$;

-- Update validate_session_security function
CREATE OR REPLACE FUNCTION public.validate_session_security()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_exists BOOLEAN;
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
$function$;

-- Update enhanced_rate_limit_check function
CREATE OR REPLACE FUNCTION public.enhanced_rate_limit_check(client_ip inet, action text, user_context uuid DEFAULT auth.uid(), max_requests integer DEFAULT 10, window_minutes integer DEFAULT 60)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

-- Update get_security_metrics function
CREATE OR REPLACE FUNCTION public.get_security_metrics()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  metrics jsonb;
BEGIN
  -- Only allow admins to access security metrics
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  SELECT jsonb_build_object(
    'total_events_24h', (
      SELECT COUNT(*) 
      FROM security_audit_log 
      WHERE created_at > now() - interval '24 hours'
    ),
    'suspicious_events_24h', (
      SELECT COUNT(*) 
      FROM security_audit_log 
      WHERE created_at > now() - interval '24 hours'
      AND operation IN ('RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'INVALID_SESSION', 'CRITICAL_ADMIN_ASSIGNMENT')
    ),
    'failed_logins_1h', (
      SELECT COUNT(*) 
      FROM security_audit_log 
      WHERE created_at > now() - interval '1 hour'
      AND operation = 'SIGNIN_FAILED'
    ),
    'admin_actions_24h', (
      SELECT COUNT(*) 
      FROM security_audit_log 
      WHERE created_at > now() - interval '24 hours'
      AND operation LIKE '%ADMIN%'
    ),
    'last_updated', now()
  ) INTO metrics;
  
  RETURN metrics;
END;
$function$;
