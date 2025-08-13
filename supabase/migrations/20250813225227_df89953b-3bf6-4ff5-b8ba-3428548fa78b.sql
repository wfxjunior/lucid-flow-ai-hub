-- Fix function search path security warning
-- Update the log_sensitive_data_access function to have immutable search_path

CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Log access to sensitive customer data
  IF TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses', 'company_profiles') THEN
    PERFORM public.log_security_event(
      TG_TABLE_NAME, 
      TG_OP, 
      COALESCE(NEW.id::text, OLD.id::text),
      CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
      CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;