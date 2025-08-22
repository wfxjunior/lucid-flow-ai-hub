
-- Fix database function security by setting proper search paths
-- This prevents SQL injection through search_path manipulation

-- Update existing functions to use secure search paths
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
$function$;

-- Enhance RLS policies for sensitive data tables
-- Add stronger isolation for client data
DROP POLICY IF EXISTS "Users can only access their own clients - SELECT" ON public.clients;
CREATE POLICY "Users can only access their own clients - SELECT" 
  ON public.clients 
  FOR SELECT 
  USING (user_id = auth.uid() AND auth.uid() IS NOT NULL);

-- Add audit logging trigger for clients table
CREATE OR REPLACE FUNCTION public.audit_client_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log any access to client data for security auditing
  IF TG_OP = 'INSERT' THEN
    PERFORM log_security_event('clients', 'INSERT', NEW.id::text, NULL, 
      jsonb_build_object('name', NEW.name, 'email', NEW.email));
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('clients', 'UPDATE', NEW.id::text, 
      jsonb_build_object('old_email', OLD.email),
      jsonb_build_object('new_email', NEW.email));
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('clients', 'DELETE', OLD.id::text, 
      jsonb_build_object('name', OLD.name, 'email', OLD.email), NULL);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Create trigger for client access logging
DROP TRIGGER IF EXISTS audit_client_access_trigger ON public.clients;
CREATE TRIGGER audit_client_access_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION audit_client_access();

-- Enhance form responses security
DROP POLICY IF EXISTS "Public can submit to public forms with rate limiting" ON public.form_responses;
CREATE POLICY "Authenticated users can submit to public forms with rate limiting" 
  ON public.form_responses 
  FOR INSERT 
  WITH CHECK (
    check_form_submission_rate_limit() AND 
    EXISTS (
      SELECT 1 FROM feather_forms 
      WHERE id = form_responses.form_id 
      AND visibility = 'public' 
      AND is_active = true
    )
  );

-- Add policy to prevent unauthorized access to form responses
CREATE POLICY "Form responses strict owner access" 
  ON public.form_responses 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM feather_forms 
      WHERE id = form_responses.form_id 
      AND user_id = auth.uid()
    )
  );

-- Enhance support tickets security - remove email-based access
DROP POLICY IF EXISTS "Users can view only their own support tickets" ON public.support_tickets;
CREATE POLICY "Users can view only their own support tickets" 
  ON public.support_tickets 
  FOR SELECT 
  USING (
    (auth.uid() = user_id AND user_id IS NOT NULL) OR 
    has_role(auth.uid(), 'admin')
  );

-- Add enhanced logging for sensitive data access
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log access to sensitive customer data with enhanced details
  IF TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses', 'chat_bookings') THEN
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
$function$;

-- Apply enhanced logging to sensitive tables
DROP TRIGGER IF EXISTS log_sensitive_access_clients ON public.clients;
CREATE TRIGGER log_sensitive_access_clients
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

DROP TRIGGER IF EXISTS log_sensitive_access_support_tickets ON public.support_tickets;
CREATE TRIGGER log_sensitive_access_support_tickets
  AFTER INSERT OR UPDATE OR DELETE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

DROP TRIGGER IF EXISTS log_sensitive_access_meeting_attendees ON public.meeting_attendees;
CREATE TRIGGER log_sensitive_access_meeting_attendees
  AFTER INSERT OR UPDATE OR DELETE ON public.meeting_attendees
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();

DROP TRIGGER IF EXISTS log_sensitive_access_chat_bookings ON public.chat_bookings;
CREATE TRIGGER log_sensitive_access_chat_bookings
  AFTER INSERT OR UPDATE OR DELETE ON public.chat_bookings
  FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();
