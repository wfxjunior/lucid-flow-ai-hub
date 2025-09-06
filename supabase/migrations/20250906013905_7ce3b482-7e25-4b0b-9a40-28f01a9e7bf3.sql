-- Phase 1: Fix Critical Database Functions with Improper Search Paths
-- This addresses the 3 functions flagged by the linter for mutable search paths

-- 1. Fix has_role function - make it more secure
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

-- 2. Fix get_current_user_role function
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

-- 3. Fix match_kb_chunks function
CREATE OR REPLACE FUNCTION public.match_kb_chunks(query_embedding extensions.vector, match_count integer, lang text)
RETURNS TABLE(chunk_id uuid, content text, url text, title text, language text, similarity double precision)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $$
BEGIN
  RETURN QUERY
  SELECT c.id AS chunk_id,
         c.content,
         p.url,
         p.title,
         c.language,
         1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.featherbot_kb_chunks c
  JOIN public.featherbot_kb_pages p ON p.id = c.page_id
  WHERE (lang IS NULL OR c.language = lang)
  ORDER BY c.embedding <-> query_embedding
  LIMIT COALESCE(match_count, 6);
END; 
$$;

-- Phase 2: Create Secure Blog Posts Policies
-- Drop existing public policies and replace with secure ones
DROP POLICY IF EXISTS "blog_posts_public_select" ON public.blog_posts;

-- Create secure public view for blog posts (content only, no analytics)
CREATE OR REPLACE VIEW public.blog_posts_public AS
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

-- Grant select access to public view
GRANT SELECT ON public.blog_posts_public TO anon, authenticated;

-- Secure the main blog_posts table - only authenticated users with proper permissions
CREATE POLICY "blog_posts_admin_full_access" 
ON public.blog_posts 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "blog_posts_public_content_only" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published' AND auth.role() = 'anon');

-- Phase 3: Enhanced Security Monitoring
-- Create security events table for enhanced monitoring
CREATE TABLE IF NOT EXISTS public.enhanced_security_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type text NOT NULL,
    severity text NOT NULL DEFAULT 'info',
    user_id uuid REFERENCES auth.users(id),
    ip_address inet,
    user_agent text,
    resource_accessed text,
    details jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security events
ALTER TABLE public.enhanced_security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can access security events
CREATE POLICY "enhanced_security_events_admin_only" 
ON public.enhanced_security_events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Create function to log enhanced security events
CREATE OR REPLACE FUNCTION public.log_enhanced_security_event(
    p_event_type text,
    p_severity text DEFAULT 'info',
    p_resource_accessed text DEFAULT NULL,
    p_details jsonb DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    INSERT INTO public.enhanced_security_events (
        event_type,
        severity,
        user_id,
        ip_address,
        resource_accessed,
        details
    ) VALUES (
        p_event_type,
        p_severity,
        auth.uid(),
        inet_client_addr(),
        p_resource_accessed,
        p_details
    );
END;
$$;

-- Phase 4: Enhanced Data Access Monitoring
-- Update existing audit triggers to use enhanced logging
CREATE OR REPLACE FUNCTION public.enhanced_data_access_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    sensitivity_level text;
    user_role text;
BEGIN
    -- Determine data sensitivity
    sensitivity_level := CASE 
        WHEN TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses') THEN 'high'
        WHEN TG_TABLE_NAME IN ('invoices', 'estimates', 'contracts') THEN 'medium'
        ELSE 'low'
    END;
    
    -- Get user role
    user_role := get_current_user_role();
    
    -- Log high-sensitivity data access
    IF sensitivity_level = 'high' THEN
        PERFORM log_enhanced_security_event(
            'SENSITIVE_DATA_ACCESS',
            CASE WHEN user_role = 'admin' THEN 'info' ELSE 'warning' END,
            TG_TABLE_NAME || '.' || TG_OP,
            jsonb_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'record_id', COALESCE(NEW.id::text, OLD.id::text),
                'user_role', user_role,
                'sensitivity', sensitivity_level
            )
        );
    END IF;
    
    -- Continue with existing audit logging
    PERFORM log_security_event(
        TG_TABLE_NAME,
        TG_OP,
        COALESCE(NEW.id::text, OLD.id::text),
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply enhanced audit to sensitive tables
DROP TRIGGER IF EXISTS enhanced_security_audit_clients ON public.clients;
CREATE TRIGGER enhanced_security_audit_clients
    AFTER INSERT OR UPDATE OR DELETE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION enhanced_data_access_audit();

DROP TRIGGER IF EXISTS enhanced_security_audit_support_tickets ON public.support_tickets;
CREATE TRIGGER enhanced_security_audit_support_tickets
    AFTER INSERT OR UPDATE OR DELETE ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION enhanced_data_access_audit();

DROP TRIGGER IF EXISTS enhanced_security_audit_meeting_attendees ON public.meeting_attendees;
CREATE TRIGGER enhanced_security_audit_meeting_attendees
    AFTER INSERT OR UPDATE OR DELETE ON public.meeting_attendees
    FOR EACH ROW EXECUTE FUNCTION enhanced_data_access_audit();

DROP TRIGGER IF EXISTS enhanced_security_audit_form_responses ON public.form_responses;
CREATE TRIGGER enhanced_security_audit_form_responses
    AFTER INSERT OR UPDATE OR DELETE ON public.form_responses
    FOR EACH ROW EXECUTE FUNCTION enhanced_data_access_audit();

-- Phase 5: Rate Limiting Enhancement
-- Create function to check and log suspicious activity patterns
CREATE OR REPLACE FUNCTION public.detect_suspicious_activity()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    recent_events_count integer;
    user_ip inet;
BEGIN
    user_ip := inet_client_addr();
    
    -- Check for excessive data access in last 5 minutes
    SELECT COUNT(*) INTO recent_events_count
    FROM public.enhanced_security_events
    WHERE created_at > now() - interval '5 minutes'
    AND (user_id = auth.uid() OR ip_address = user_ip)
    AND event_type = 'SENSITIVE_DATA_ACCESS';
    
    -- If more than 50 sensitive data accesses in 5 minutes, flag as suspicious
    IF recent_events_count > 50 THEN
        PERFORM log_enhanced_security_event(
            'SUSPICIOUS_ACTIVITY_DETECTED',
            'critical',
            'RATE_LIMIT_EXCEEDED',
            jsonb_build_object(
                'access_count', recent_events_count,
                'time_window', '5 minutes',
                'threshold', 50
            )
        );
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$;

-- Create emergency lockdown function
CREATE OR REPLACE FUNCTION public.emergency_lockdown_user(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Only admins can execute lockdown
    IF NOT has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Access denied: Admin role required for user lockdown';
    END IF;
    
    -- Log the lockdown event
    PERFORM log_enhanced_security_event(
        'USER_LOCKDOWN',
        'critical',
        'EMERGENCY_RESPONSE',
        jsonb_build_object(
            'locked_user_id', target_user_id,
            'locked_by', auth.uid(),
            'timestamp', now()
        )
    );
    
    -- This could be extended to actually disable user access
    -- For now, we're just logging for audit purposes
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT SELECT ON public.blog_posts_public TO authenticated, anon;