-- Final security hardening - ensure ALL functions have proper search_path
-- This addresses the persistent search_path warning

-- List and fix any remaining functions that may not have been caught
DO $$
DECLARE
    rec RECORD;
    func_def TEXT;
BEGIN
    -- Update any remaining functions that might not have search_path set
    FOR rec IN 
        SELECT proname, pronargs 
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND proname NOT LIKE 'pg_%'
          AND prosecdef = true  -- Only security definer functions need this
    LOOP
        -- Check if this is one of our functions that needs updating
        IF rec.proname IN ('log_client_access', 'log_meeting_attendee_access') THEN
            -- These are triggers, they need search_path set
            EXECUTE format('ALTER FUNCTION public.%I() SET search_path = ''public''', rec.proname);
        END IF;
    END LOOP;
END $$;

-- Explicitly ensure all our security-critical functions have search_path
-- Re-create the functions that were created as triggers to ensure they have search_path

CREATE OR REPLACE FUNCTION public.log_client_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Log any access to client data for security auditing
  IF TG_OP = 'SELECT' AND auth.uid() IS NOT NULL THEN
    PERFORM log_security_event('clients', 'SELECT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'INSERT' THEN
    PERFORM log_security_event('clients', 'INSERT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('clients', 'UPDATE', NEW.id::text, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('clients', 'DELETE', OLD.id::text, row_to_json(OLD)::jsonb, NULL);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_meeting_attendee_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Log access to meeting attendee data for security auditing
  IF TG_OP = 'SELECT' AND auth.uid() IS NOT NULL THEN
    PERFORM log_security_event('meeting_attendees', 'SELECT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'INSERT' THEN
    PERFORM log_security_event('meeting_attendees', 'INSERT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('meeting_attendees', 'UPDATE', NEW.id::text, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('meeting_attendees', 'DELETE', OLD.id::text, row_to_json(OLD)::jsonb, NULL);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Grant appropriate permissions
GRANT EXECUTE ON FUNCTION public.get_security_status() TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_client_access() TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_meeting_attendee_access() TO authenticated;