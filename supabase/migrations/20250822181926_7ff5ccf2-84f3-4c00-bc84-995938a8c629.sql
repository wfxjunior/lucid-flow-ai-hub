
-- Phase 1: Critical Data Protection Fixes

-- 1. Fix Support Tickets RLS Policy - Remove potentially exploitable email-based access
DROP POLICY IF EXISTS "Users can view only their own support tickets" ON public.support_tickets;

CREATE POLICY "Users can view only their own support tickets" 
ON public.support_tickets 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  has_role(auth.uid(), 'admin'::text)
);

-- 2. Secure Chat Bookings Table - Replace overly permissive service role policy
DROP POLICY IF EXISTS "Service role can manage all chat bookings" ON public.chat_bookings;

-- Add proper RLS policies for chat bookings
CREATE POLICY "Admins can manage all chat bookings" 
ON public.chat_bookings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::text));

CREATE POLICY "Service role can insert chat bookings" 
ON public.chat_bookings 
FOR INSERT 
WITH CHECK (true);

-- 3. Tighten Meeting Attendees Access - Remove email-based access
DROP POLICY IF EXISTS "meeting_attendees_select_policy" ON public.meeting_attendees;

CREATE POLICY "meeting_attendees_select_policy" 
ON public.meeting_attendees 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- 4. Enhanced Role Security - Prevent self-modification and add audit logging
CREATE OR REPLACE FUNCTION public.prevent_role_self_modification()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to user_roles table
DROP TRIGGER IF EXISTS prevent_role_self_modification_trigger ON public.user_roles;
CREATE TRIGGER prevent_role_self_modification_trigger
  BEFORE UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_self_modification();

-- 5. Enhanced Security Logging Function
CREATE OR REPLACE FUNCTION public.log_security_violation(
  violation_type TEXT,
  details JSONB DEFAULT NULL
) RETURNS VOID AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Rate Limiting for Form Submissions
CREATE OR REPLACE FUNCTION public.check_form_submission_rate_limit()
RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Enhanced form response policy with rate limiting
DROP POLICY IF EXISTS "Public can submit to public forms only" ON public.form_responses;

CREATE POLICY "Public can submit to public forms with rate limiting" 
ON public.form_responses 
FOR INSERT 
WITH CHECK (
  check_form_submission_rate_limit() AND
  EXISTS (
    SELECT 1 FROM feather_forms 
    WHERE feather_forms.id = form_responses.form_id 
    AND feather_forms.visibility = 'public'::text 
    AND feather_forms.is_active = true
  )
);
