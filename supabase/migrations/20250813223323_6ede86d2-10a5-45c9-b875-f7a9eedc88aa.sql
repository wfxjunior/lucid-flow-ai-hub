-- Final comprehensive security hardening
-- This migration ensures all functions have proper search_path settings

-- Update has_role function explicitly
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
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
SET search_path = 'public'
AS $function$
    SELECT role::text
    FROM public.user_roles
    WHERE user_id = auth.uid()
    LIMIT 1;
$function$;

-- Create comprehensive security status view
CREATE OR REPLACE VIEW public.security_status AS
SELECT 
  'RLS_ENABLED' as check_type,
  schemaname,
  tablename,
  CASE WHEN rowsecurity THEN 'PASS' ELSE 'FAIL' END as status
FROM pg_tables t
JOIN pg_class c ON c.relname = t.tablename
WHERE schemaname = 'public'
  AND c.relrowsecurity IS NOT NULL;

-- Add security event cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_old_security_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Keep only last 30 days of security events for performance
  DELETE FROM public.security_audit_log 
  WHERE created_at < now() - interval '30 days';
  
  -- Keep only last 7 days of template access logs
  DELETE FROM public.template_access_log 
  WHERE created_at < now() - interval '7 days';
END;
$function$;

-- Ensure all security functions have proper permissions
GRANT EXECUTE ON FUNCTION public.validate_user_session() TO authenticated;
GRANT EXECUTE ON FUNCTION public.enhanced_rate_limit_check(inet, text, uuid, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_security_event(text, text, text, jsonb, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_old_security_events() TO service_role;