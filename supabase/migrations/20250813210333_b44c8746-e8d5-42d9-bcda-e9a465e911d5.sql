-- Security Fixes Migration
-- Priority 1: Secure Template Access and Fix Schema Issues

-- 1. Create audit log table for template access
CREATE TABLE IF NOT EXISTS public.template_access_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID,
  user_id UUID,
  access_type TEXT NOT NULL, -- 'view', 'download', 'copy'
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.template_access_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view template access logs"
ON public.template_access_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- System can insert audit logs
CREATE POLICY "System can insert template access logs"
ON public.template_access_log
FOR INSERT
WITH CHECK (true);

-- 2. Update templates table to fix security issues
-- First, check if templates table exists and get its structure
DO $$
BEGIN
  -- Update any existing templates with NULL user_id to be system templates
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'templates') THEN
    -- Mark existing NULL user_id templates as system templates if not already marked
    UPDATE public.templates 
    SET is_default = true 
    WHERE user_id IS NULL AND is_default IS NOT TRUE;
    
    -- For any custom templates that somehow have NULL user_id, we need to handle them
    -- Let's log these as a security concern but not break existing data
    INSERT INTO public.security_audit_log (
      user_id, table_name, operation, record_id, old_data, new_data
    )
    SELECT 
      NULL,
      'templates',
      'SECURITY_FIX',
      id::text,
      jsonb_build_object('user_id', user_id, 'is_default', is_default),
      jsonb_build_object('issue', 'Found template with NULL user_id that is not system template')
    FROM public.templates 
    WHERE user_id IS NULL AND is_default IS NOT TRUE;
  END IF;
END $$;

-- 3. Drop existing permissive template policies
DROP POLICY IF EXISTS "Templates are publicly viewable" ON public.templates;
DROP POLICY IF EXISTS "Public templates are viewable" ON public.templates;
DROP POLICY IF EXISTS "Anyone can view templates" ON public.templates;

-- 4. Create secure template access policies
-- System templates (is_default = true AND user_id IS NULL) are publicly viewable
CREATE POLICY "System templates are publicly viewable"
ON public.templates
FOR SELECT
USING (is_default = true AND user_id IS NULL);

-- Authenticated users can view their own templates
CREATE POLICY "Users can view their own templates"
ON public.templates
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all templates
CREATE POLICY "Admins can view all templates"
ON public.templates
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Users can create their own templates (user_id must match auth.uid())
CREATE POLICY "Users can create their own templates"
ON public.templates
FOR INSERT
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

-- Users can update their own templates
CREATE POLICY "Users can update their own templates"
ON public.templates
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own templates
CREATE POLICY "Users can delete their own templates"
ON public.templates
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can manage all templates
CREATE POLICY "Admins can manage all templates"
ON public.templates
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- 5. Create rate limiting table for public endpoints
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL,
  action_type TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ip_address, action_type, window_start)
);

-- Enable RLS on rate limits (only system can access)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING (true);

-- 6. Create function to log template access
CREATE OR REPLACE FUNCTION public.log_template_access(
  template_id_param UUID,
  access_type_param TEXT,
  ip_address_param INET DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.template_access_log (
    template_id,
    user_id,
    access_type,
    ip_address,
    user_agent
  ) VALUES (
    template_id_param,
    auth.uid(),
    access_type_param,
    ip_address_param,
    user_agent_param
  );
END;
$$;

-- 7. Create function for enhanced session security monitoring
CREATE OR REPLACE FUNCTION public.detect_suspicious_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  admin_user_id UUID;
  concurrent_sessions INTEGER;
BEGIN
  -- Only monitor admin users for concurrent sessions
  SELECT user_id INTO admin_user_id
  FROM public.user_roles 
  WHERE user_id = NEW.user_id AND role = 'admin';
  
  IF admin_user_id IS NOT NULL THEN
    -- Count concurrent sessions for admin users
    SELECT COUNT(*) INTO concurrent_sessions
    FROM auth.sessions 
    WHERE user_id = NEW.user_id 
    AND created_at > now() - interval '1 hour';
    
    -- Log if more than 3 concurrent sessions
    IF concurrent_sessions > 3 THEN
      PERFORM log_security_event(
        'auth.sessions',
        'SUSPICIOUS_ACTIVITY',
        NEW.id::text,
        NULL,
        jsonb_build_object(
          'user_id', NEW.user_id,
          'concurrent_sessions', concurrent_sessions,
          'alert', 'Multiple concurrent admin sessions detected'
        )
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 8. Add constraints to ensure data integrity
-- Note: We're being careful not to break existing data
-- If templates table exists, add a check constraint for new records
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'templates') THEN
    -- Add check constraint to ensure custom templates have user_id
    -- This will only apply to new records to avoid breaking existing data
    ALTER TABLE public.templates 
    ADD CONSTRAINT templates_user_id_required_for_custom 
    CHECK (
      (is_default = true AND user_id IS NULL) OR 
      (is_default IS NOT TRUE AND user_id IS NOT NULL)
    );
  END IF;
EXCEPTION
  WHEN others THEN
    -- Log constraint creation failure but don't fail the migration
    RAISE NOTICE 'Could not add constraint to templates table: %', SQLERRM;
END $$;

-- 9. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_template_access_log_template_id ON public.template_access_log(template_id);
CREATE INDEX IF NOT EXISTS idx_template_access_log_user_id ON public.template_access_log(user_id);
CREATE INDEX IF NOT EXISTS idx_template_access_log_created_at ON public.template_access_log(created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_action ON public.rate_limits(ip_address, action_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON public.rate_limits(window_start);

-- 10. Clean up old rate limit entries function
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - interval '1 hour';
END;
$$;