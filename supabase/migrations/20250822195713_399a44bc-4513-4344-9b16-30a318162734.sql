
-- CRITICAL SECURITY FIXES - Phase 1: Fix Data Exposure Issues

-- 1. Fix meeting_attendees table - restrict to meeting owner only
DROP POLICY IF EXISTS "meeting_attendees_select_policy" ON meeting_attendees;
DROP POLICY IF EXISTS "meeting_attendees_insert_policy" ON meeting_attendees;
DROP POLICY IF EXISTS "meeting_attendees_update_policy" ON meeting_attendees;
DROP POLICY IF EXISTS "meeting_attendees_delete_policy" ON meeting_attendees;

CREATE POLICY "meeting_attendees_select_policy" ON meeting_attendees
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

CREATE POLICY "meeting_attendees_insert_policy" ON meeting_attendees
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

CREATE POLICY "meeting_attendees_update_policy" ON meeting_attendees
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

CREATE POLICY "meeting_attendees_delete_policy" ON meeting_attendees
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- 2. Fix chat_bookings table - restrict to admin users only
DROP POLICY IF EXISTS "Admins can manage all chat bookings" ON chat_bookings;
DROP POLICY IF EXISTS "Service role can insert chat bookings" ON chat_bookings;

CREATE POLICY "Admins can manage all chat bookings" ON chat_bookings
FOR ALL USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert chat bookings" ON chat_bookings
FOR INSERT WITH CHECK (
  -- Allow service role or admin users to insert
  (current_setting('role') = 'service_role') OR has_role(auth.uid(), 'admin')
);

-- 3. Fix support_tickets table - enhance existing policies
DROP POLICY IF EXISTS "Only admins can view all support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can view only their own support tickets" ON support_tickets;

CREATE POLICY "Users can view their own tickets or admins can view all" ON support_tickets
FOR SELECT USING (
  (auth.uid() = user_id AND user_id IS NOT NULL) OR 
  has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can manage all support tickets" ON support_tickets
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 4. Create secure policies for any missing tables that might expose data
-- Check if featherbot_leads table exists and secure it
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'featherbot_leads') THEN
    EXECUTE 'ALTER TABLE featherbot_leads ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Admin access only" ON featherbot_leads';
    EXECUTE 'CREATE POLICY "Admin access only" ON featherbot_leads FOR ALL USING (has_role(auth.uid(), ''admin''))';
  END IF;
END $$;

-- Check if scale_waitlist table exists and secure it
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'scale_waitlist') THEN
    EXECUTE 'ALTER TABLE scale_waitlist ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Admin access only" ON scale_waitlist';
    EXECUTE 'CREATE POLICY "Admin access only" ON scale_waitlist FOR ALL USING (has_role(auth.uid(), ''admin''))';
  END IF;
END $$;

-- Check if featherbot_referrals table exists and secure it
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'featherbot_referrals') THEN
    EXECUTE 'ALTER TABLE featherbot_referrals ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "Authenticated users only" ON featherbot_referrals';
    EXECUTE 'CREATE POLICY "Authenticated users only" ON featherbot_referrals FOR SELECT USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "Admin management only" ON featherbot_referrals FOR INSERT WITH CHECK (has_role(auth.uid(), ''admin''))';
    EXECUTE 'CREATE POLICY "Admin update only" ON featherbot_referrals FOR UPDATE USING (has_role(auth.uid(), ''admin''))';
  END IF;
END $$;

-- 5. Fix database function security - add proper search_path
CREATE OR REPLACE FUNCTION public.validate_session_security()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.validate_user_session()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

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

-- 6. Add security monitoring trigger for sensitive data access
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Apply triggers to sensitive tables (only if they don't already exist)
DO $$
BEGIN
  -- Add trigger for clients table
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'log_client_data_access' AND tgrelid = 'clients'::regclass) THEN
    CREATE TRIGGER log_client_data_access
      AFTER INSERT OR UPDATE OR DELETE ON clients
      FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();
  END IF;
  
  -- Add trigger for meeting_attendees table
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'log_meeting_attendee_data_access' AND tgrelid = 'meeting_attendees'::regclass) THEN
    CREATE TRIGGER log_meeting_attendee_data_access
      AFTER INSERT OR UPDATE OR DELETE ON meeting_attendees
      FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();
  END IF;
  
  -- Add trigger for chat_bookings table
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'log_chat_booking_data_access' AND tgrelid = 'chat_bookings'::regclass) THEN
    CREATE TRIGGER log_chat_booking_data_access
      AFTER INSERT OR UPDATE OR DELETE ON chat_bookings
      FOR EACH ROW EXECUTE FUNCTION log_sensitive_data_access();
  END IF;
END $$;

-- 7. Create emergency security lockdown function
CREATE OR REPLACE FUNCTION public.emergency_security_lockdown()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only allow admins to execute this
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required for security lockdown';
  END IF;
  
  -- Log the emergency lockdown
  PERFORM log_security_event('security', 'EMERGENCY_LOCKDOWN', auth.uid()::text,
    NULL, jsonb_build_object('timestamp', now(), 'triggered_by', auth.uid()));
  
  -- This function can be extended to disable certain features during security incidents
  -- For now, it just logs the event for audit purposes
END;
$$;
