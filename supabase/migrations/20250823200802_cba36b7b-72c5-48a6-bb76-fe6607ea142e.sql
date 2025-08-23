
-- Phase 1: Critical Database Security Fixes

-- 1. Add SET search_path to all security-sensitive functions
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

CREATE OR REPLACE FUNCTION public.validate_user_session()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_exists BOOLEAN;
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
$function$;

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

-- 2. Strengthen RLS Policies for sensitive tables

-- Update clients table policies
DROP POLICY IF EXISTS "Users can only access their own clients - SELECT" ON public.clients;
CREATE POLICY "Users can only access their own clients - SELECT" 
  ON public.clients 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
  );

-- Update support_tickets policies  
DROP POLICY IF EXISTS "Users can view their own tickets or admins can view all" ON public.support_tickets;
CREATE POLICY "Users can view their own tickets or admins can view all" 
  ON public.support_tickets 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND (
      (auth.uid() = user_id AND user_id IS NOT NULL) OR 
      has_role(auth.uid(), 'admin')
    )
  );

-- Update meeting_attendees policies
DROP POLICY IF EXISTS "meeting_attendees_select_policy" ON public.meeting_attendees;
CREATE POLICY "meeting_attendees_select_policy" 
  ON public.meeting_attendees 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1
      FROM meetings
      WHERE meetings.id = meeting_attendees.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

-- Update form_responses policies
DROP POLICY IF EXISTS "Only form owners can view form responses" ON public.form_responses;
CREATE POLICY "Only form owners can view form responses" 
  ON public.form_responses 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1
      FROM feather_forms
      WHERE feather_forms.id = form_responses.form_id 
      AND feather_forms.user_id = auth.uid()
    )
  );

-- Update company_profiles policies
DROP POLICY IF EXISTS "Users can only access their own company profile - SELECT" ON public.company_profiles;
CREATE POLICY "Users can only access their own company profile - SELECT" 
  ON public.company_profiles 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL 
    AND user_id = auth.uid()
  );

-- 3. Add additional security constraints
ALTER TABLE public.clients 
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.meeting_attendees 
  ADD CONSTRAINT meeting_attendees_email_format_check 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- 4. Create enhanced security audit function
CREATE OR REPLACE FUNCTION public.enhanced_security_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log all sensitive data access
  IF TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses', 'company_profiles') THEN
    PERFORM log_security_event(
      TG_TABLE_NAME,
      TG_OP,
      COALESCE(NEW.id::text, OLD.id::text),
      CASE WHEN TG_OP = 'DELETE' THEN 
        jsonb_build_object('deleted_at', now(), 'user_id', auth.uid())
      ELSE NULL END,
      CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN 
        jsonb_build_object('accessed_at', now(), 'user_id', auth.uid(), 'ip_address', inet_client_addr())
      ELSE NULL END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Apply audit triggers to sensitive tables
DROP TRIGGER IF EXISTS enhanced_security_audit_clients ON public.clients;
CREATE TRIGGER enhanced_security_audit_clients
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION enhanced_security_audit();

DROP TRIGGER IF EXISTS enhanced_security_audit_support_tickets ON public.support_tickets;
CREATE TRIGGER enhanced_security_audit_support_tickets
  AFTER INSERT OR UPDATE OR DELETE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION enhanced_security_audit();
