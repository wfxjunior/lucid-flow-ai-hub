
-- Fix RLS policies and add security audit improvements

-- Add missing RLS policies for featherbot_leads table
CREATE POLICY "Public can insert leads" ON public.featherbot_leads
FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view leads" ON public.featherbot_leads
FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Add security audit trigger for sensitive tables
CREATE OR REPLACE FUNCTION public.audit_sensitive_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access to sensitive data
  PERFORM public.log_security_event(
    TG_TABLE_NAME,
    TG_OP,
    COALESCE(NEW.id::text, OLD.id::text),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to sensitive tables
DROP TRIGGER IF EXISTS audit_clients_access ON public.clients;
CREATE TRIGGER audit_clients_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_access();

DROP TRIGGER IF EXISTS audit_meeting_attendees_access ON public.meeting_attendees;
CREATE TRIGGER audit_meeting_attendees_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.meeting_attendees
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_access();

DROP TRIGGER IF EXISTS audit_support_tickets_access ON public.support_tickets;
CREATE TRIGGER audit_support_tickets_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_access();

-- Add enhanced session validation function
CREATE OR REPLACE FUNCTION public.validate_session_security()
RETURNS BOOLEAN AS $$
DECLARE
  session_age INTERVAL;
  max_session_age INTERVAL := '24 hours';
BEGIN
  -- Check if user exists and is active
  IF NOT EXISTS(SELECT 1 FROM auth.users WHERE id = auth.uid()) THEN
    PERFORM public.log_security_event('auth', 'INVALID_USER_SESSION', auth.uid()::text, 
      NULL, jsonb_build_object('reason', 'user_not_found', 'timestamp', now()));
    RETURN FALSE;
  END IF;

  -- Log successful session validation
  PERFORM public.log_security_event('auth', 'SESSION_VALIDATED', auth.uid()::text, 
    NULL, jsonb_build_object('timestamp', now()));
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add rate limiting for form submissions
CREATE OR REPLACE FUNCTION public.check_form_submission_rate_limit(form_id_param UUID, client_ip INET)
RETURNS BOOLEAN AS $$
DECLARE
  submission_count INTEGER;
  window_start TIMESTAMP := now() - INTERVAL '1 hour';
BEGIN
  -- Count submissions from this IP in the last hour
  SELECT COUNT(*) INTO submission_count
  FROM public.form_responses
  WHERE form_id = form_id_param 
    AND ip_address = client_ip::text
    AND submitted_at > window_start;
  
  -- Allow max 5 submissions per hour per IP
  IF submission_count >= 5 THEN
    PERFORM public.log_security_event('forms', 'RATE_LIMIT_EXCEEDED', form_id_param::text,
      NULL, jsonb_build_object('ip', client_ip, 'count', submission_count, 'timestamp', now()));
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add security metrics function
CREATE OR REPLACE FUNCTION public.get_security_metrics()
RETURNS JSON AS $$
DECLARE
  metrics JSON;
BEGIN
  SELECT json_build_object(
    'total_events_24h', (
      SELECT COUNT(*) FROM public.security_audit_log 
      WHERE created_at > now() - INTERVAL '24 hours'
    ),
    'suspicious_events_24h', (
      SELECT COUNT(*) FROM public.security_audit_log 
      WHERE operation IN ('RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_ACTIVITY', 'INVALID_USER_SESSION')
        AND created_at > now() - INTERVAL '24 hours'
    ),
    'failed_logins_1h', (
      SELECT COUNT(*) FROM public.security_audit_log 
      WHERE operation = 'SIGNIN_FAILED' 
        AND created_at > now() - INTERVAL '1 hour'
    ),
    'last_updated', now()
  ) INTO metrics;
  
  RETURN metrics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
