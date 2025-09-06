-- Fix the remaining 3 functions that don't have search_path set

-- Fix check_form_submission_rate_limit function
CREATE OR REPLACE FUNCTION public.check_form_submission_rate_limit()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  submission_count INTEGER;
BEGIN
  -- Check submissions in last hour
  SELECT COUNT(*) INTO submission_count
  FROM public.form_responses
  WHERE submitted_at > now() - interval '1 hour'
  AND (
    (auth.uid() IS NOT NULL AND respondent_email = (SELECT email FROM auth.users WHERE id = auth.uid())) OR
    (auth.uid() IS NULL AND ip_address = inet_client_addr()::text)
  );
  
  -- Allow max 10 submissions per hour per user/IP
  IF submission_count >= 10 THEN
    PERFORM log_security_violation('FORM_SUBMISSION_RATE_LIMIT', 
      jsonb_build_object('submission_count', submission_count));
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Fix log_security_violation function
CREATE OR REPLACE FUNCTION public.log_security_violation(violation_type text, details jsonb DEFAULT NULL::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM log_security_event(
    'security_violations',
    violation_type,
    auth.uid()::text,
    NULL,
    jsonb_build_object(
      'timestamp', now(),
      'user_id', auth.uid(),
      'violation_type', violation_type,
      'details', details
    )
  );
END;
$$;

-- Fix prevent_role_self_modification function
CREATE OR REPLACE FUNCTION public.prevent_role_self_modification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Prevent users from modifying their own roles
  IF TG_OP = 'UPDATE' AND OLD.user_id = auth.uid() THEN
    RAISE EXCEPTION 'Users cannot modify their own roles';
  END IF;
  
  IF TG_OP = 'DELETE' AND OLD.user_id = auth.uid() THEN
    RAISE EXCEPTION 'Users cannot delete their own roles';
  END IF;
  
  -- Only admins can modify roles
  IF NOT has_role(auth.uid(), 'admin'::text) THEN
    RAISE EXCEPTION 'Only administrators can modify user roles';
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Let's also fix any remaining functions that might be causing issues
-- Check if there are any views with SECURITY DEFINER that we missed

-- Verify the blog_posts_public view is properly created without SECURITY DEFINER
-- Drop and recreate the view to ensure it's not using SECURITY DEFINER
DROP VIEW IF EXISTS public.blog_posts_public CASCADE;

-- Recreate the view without any security definer properties
CREATE VIEW public.blog_posts_public AS
SELECT 
    id,
    title,
    slug,
    excerpt,
    content,
    tags,
    status,
    published_at,
    created_at,
    updated_at
FROM public.blog_posts
WHERE status = 'published';

-- Enable RLS on the view if needed
ALTER VIEW public.blog_posts_public SET (security_invoker = true);

-- Grant proper permissions
GRANT SELECT ON public.blog_posts_public TO anon, authenticated;

-- Create a function to check for any remaining security issues
CREATE OR REPLACE FUNCTION public.check_remaining_security_issues()
RETURNS TABLE(
    issue_type text,
    object_name text,
    description text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    -- Check for functions without search_path
    SELECT 
        'function_no_search_path'::text as issue_type,
        p.proname::text as object_name,
        'Function missing SET search_path'::text as description
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.proname NOT LIKE 'pg_%'
    AND p.proconfig IS NULL
    AND p.prosecdef = true
    
    UNION ALL
    
    -- Check for views with security definer
    SELECT 
        'view_security_definer'::text as issue_type,
        c.relname::text as object_name,
        'View may have security definer properties'::text as description
    FROM pg_class c
    JOIN pg_namespace n ON c.relnamespace = n.oid
    WHERE n.nspname = 'public'
    AND c.relkind = 'v'
    AND c.relname NOT LIKE 'pg_%';
$$;