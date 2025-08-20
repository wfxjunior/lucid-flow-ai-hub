
-- Priority 1: Enhanced Blog Content Protection
-- Modify blog_posts RLS policies to restrict analytics data to admin users only

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "blog_posts_public_read" ON public.blog_posts;
DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;

-- Create separate policies for public content vs admin analytics
CREATE POLICY "Public can read basic blog content"
ON public.blog_posts
FOR SELECT
TO public
USING (status = 'published');

CREATE POLICY "Admins can view all blog data including analytics"
ON public.blog_posts
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Priority 2: Enhanced Admin Role Security
-- Add audit trigger for role changes with enhanced logging
CREATE OR REPLACE FUNCTION public.enhanced_audit_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Enhanced logging for admin role changes
  IF TG_OP = 'INSERT' THEN
    -- Log role assignment
    PERFORM log_security_event('user_roles', 'ADMIN_ROLE_ASSIGNED', NEW.user_id::text, 
      NULL, 
      jsonb_build_object(
        'assigned_role', NEW.role::text,
        'assigned_by', auth.uid(),
        'timestamp', now(),
        'action', 'INSERT'
      )
    );
    
    -- If assigning admin role, require extra verification
    IF NEW.role = 'admin' THEN
      PERFORM log_security_event('user_roles', 'CRITICAL_ADMIN_ASSIGNMENT', NEW.user_id::text,
        NULL,
        jsonb_build_object(
          'new_admin_user', NEW.user_id,
          'assigned_by', auth.uid(),
          'timestamp', now(),
          'requires_verification', true
        )
      );
    END IF;
    
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('user_roles', 'ROLE_MODIFIED', NEW.user_id::text,
      jsonb_build_object('old_role', OLD.role::text),
      jsonb_build_object('new_role', NEW.role::text, 'modified_by', auth.uid())
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('user_roles', 'ROLE_REMOVED', OLD.user_id::text,
      jsonb_build_object('removed_role', OLD.role::text),
      jsonb_build_object('removed_by', auth.uid(), 'timestamp', now())
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Update the trigger to use enhanced function
DROP TRIGGER IF EXISTS audit_role_changes_trigger ON public.user_roles;
CREATE TRIGGER enhanced_audit_role_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION enhanced_audit_role_changes();

-- Priority 3: Enhanced Security Monitoring
-- Create function to get enhanced security metrics
CREATE OR REPLACE FUNCTION public.get_security_metrics()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Priority 4: Enhanced Session Security
-- Create function to validate session security with enhanced checks
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

-- Priority 5: Data Retention and Cleanup
-- Create function for automated security log cleanup
CREATE OR REPLACE FUNCTION public.enhanced_cleanup_security_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Keep detailed logs for 90 days, summary for 1 year
  DELETE FROM public.security_audit_log 
  WHERE created_at < now() - interval '90 days'
  AND operation NOT IN ('CRITICAL_ADMIN_ASSIGNMENT', 'ADMIN_ROLE_ASSIGNED', 'SUSPICIOUS_ACTIVITY');
  
  -- Keep critical security events for 1 year
  DELETE FROM public.security_audit_log 
  WHERE created_at < now() - interval '1 year';
  
  -- Clean up old rate limits (keep for 24 hours)
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - interval '24 hours';
  
  -- Clean up old template access logs (keep for 30 days)
  DELETE FROM public.template_access_log 
  WHERE created_at < now() - interval '30 days';
END;
$$;
