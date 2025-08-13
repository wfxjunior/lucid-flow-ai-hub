-- Security Enhancement: Fix RLS policies for data protection

-- 1. Enhance template access control
-- Templates should only be public if they are default templates
DROP POLICY IF EXISTS "Templates can be read by everyone" ON public.signature_templates;
CREATE POLICY "Public can view default templates only"
ON public.signature_templates
FOR SELECT
USING (is_default = true AND user_id IS NULL);

CREATE POLICY "Users can view their own templates"
ON public.signature_templates  
FOR ALL
USING (auth.uid() = user_id);

-- 2. Add security audit logging table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
ON public.security_audit_log
FOR INSERT
WITH CHECK (true);

-- 3. Add rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address INET NOT NULL,
  action_type TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for efficient rate limit checks
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_action_window 
ON public.rate_limits(ip_address, action_type, window_start);

-- 4. Create security audit trigger function
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_table_name TEXT,
  p_operation TEXT,
  p_record_id TEXT DEFAULT NULL,
  p_old_data JSONB DEFAULT NULL,
  p_new_data JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    table_name,
    operation,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    p_table_name,
    p_operation,
    p_record_id,
    p_old_data,
    p_new_data
  );
END;
$$;

-- 5. Add audit triggers for sensitive operations
CREATE OR REPLACE FUNCTION public.audit_user_roles()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_security_event('user_roles', 'INSERT', NEW.user_id::text, NULL, row_to_json(NEW)::jsonb);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('user_roles', 'UPDATE', NEW.user_id::text, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('user_roles', 'DELETE', OLD.user_id::text, row_to_json(OLD)::jsonb, NULL);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Apply audit trigger to user_roles table
DROP TRIGGER IF EXISTS audit_user_roles_trigger ON public.user_roles;
CREATE TRIGGER audit_user_roles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION audit_user_roles();

-- 6. Rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  client_ip INET,
  action TEXT,
  max_requests INTEGER DEFAULT 10,
  window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Get current count for this IP and action
  SELECT count, rate_limits.window_start INTO current_count, window_start
  FROM public.rate_limits 
  WHERE ip_address = client_ip AND action_type = action 
  AND rate_limits.window_start > now() - (window_minutes || ' minutes')::INTERVAL;
  
  IF current_count IS NULL THEN
    -- First request in this window
    INSERT INTO public.rate_limits (ip_address, action_type, count)
    VALUES (client_ip, action, 1);
    RETURN TRUE;
  ELSIF current_count < max_requests THEN
    -- Increment counter
    UPDATE public.rate_limits 
    SET count = count + 1 
    WHERE ip_address = client_ip AND action_type = action 
    AND rate_limits.window_start = window_start;
    RETURN TRUE;
  ELSE
    -- Rate limit exceeded
    RETURN FALSE;
  END IF;
END;
$$;