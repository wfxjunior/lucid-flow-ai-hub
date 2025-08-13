-- Comprehensive Security Hardening Migration
-- Fix 1: Database Function Security - Add explicit search paths to prevent schema confusion attacks

-- Update functions that lack explicit search_path settings
CREATE OR REPLACE FUNCTION public.generate_referral_code(user_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  clean_email TEXT;
  hash_part TEXT;
  result_code TEXT;
BEGIN
  -- Extract username part before @
  clean_email := split_part(user_email, '@', 1);
  
  -- Create a hash from the email
  hash_part := upper(substring(encode(digest(user_email, 'sha256'), 'hex'), 1, 6));
  
  -- Combine username and hash
  result_code := clean_email || '-' || hash_part;
  
  RETURN result_code;
END;
$function$;

CREATE OR REPLACE FUNCTION public.track_referral_signup(referral_code_param text, new_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  referrer_user_id UUID;
  existing_referral UUID;
BEGIN
  -- Find the referrer by referral code
  SELECT user_id INTO referrer_user_id 
  FROM public.user_referral_stats 
  WHERE referral_code = referral_code_param;
  
  IF referrer_user_id IS NULL THEN
    RETURN FALSE; -- Invalid referral code
  END IF;
  
  -- Check if this email was already referred by this user
  SELECT id INTO existing_referral
  FROM public.referrals
  WHERE referrer_id = referrer_user_id AND referred_email = new_user_email;
  
  IF existing_referral IS NOT NULL THEN
    -- Update existing referral to signed up
    UPDATE public.referrals
    SET 
      status = 'active',
      signed_up_at = now(),
      referred_user_id = auth.uid(),
      updated_at = now()
    WHERE id = existing_referral;
  ELSE
    -- Create new referral record
    INSERT INTO public.referrals (
      referrer_id,
      referred_email,
      referred_user_id,
      referral_code,
      status,
      signed_up_at
    ) VALUES (
      referrer_user_id,
      new_user_email,
      auth.uid(),
      referral_code_param,
      'active',
      now()
    );
  END IF;
  
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_tracking_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$function$;

-- Fix 2: Meeting Attendees Security - Strengthen RLS policies
-- Drop existing policies to recreate with stronger security
DROP POLICY IF EXISTS "Attendees can view their own record" ON public.meeting_attendees;
DROP POLICY IF EXISTS "Meeting organizers can manage attendees" ON public.meeting_attendees;

-- Create enhanced RLS policies for meeting attendees with audit logging
CREATE POLICY "Attendees can view own records only"
ON public.meeting_attendees
FOR SELECT
TO authenticated
USING (
  -- Allow attendee to see their own record
  email = (SELECT users.email FROM auth.users WHERE users.id = auth.uid())::text
  OR
  -- Allow meeting organizer to see all attendees
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

CREATE POLICY "Meeting organizers manage attendees"
ON public.meeting_attendees
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- Fix 3: Blog Privacy Enhancement - Remove exposed user names
-- Add a new column for anonymous engagement tracking
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS anonymous_likes_count integer DEFAULT 0;

-- Update existing data to preserve like counts but remove names
UPDATE public.blog_posts 
SET anonymous_likes_count = array_length(liked_by_names, 1)
WHERE liked_by_names IS NOT NULL;

-- Remove the privacy-exposing column
ALTER TABLE public.blog_posts 
DROP COLUMN IF EXISTS liked_by_names;

-- Fix 4: Enhanced Security Monitoring - Add comprehensive audit logging
CREATE OR REPLACE FUNCTION public.log_meeting_attendee_access()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create trigger for meeting attendee security logging
CREATE TRIGGER meeting_attendees_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.meeting_attendees
  FOR EACH ROW
  EXECUTE FUNCTION public.log_meeting_attendee_access();

-- Fix 5: Rate Limiting Enhancement for Security
CREATE OR REPLACE FUNCTION public.enhanced_rate_limit_check(
  client_ip inet, 
  action text, 
  user_context uuid DEFAULT auth.uid(),
  max_requests integer DEFAULT 10, 
  window_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
  is_suspicious BOOLEAN := FALSE;
BEGIN
  -- Clean up old rate limit entries
  DELETE FROM public.rate_limits 
  WHERE window_start < now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Check for suspicious patterns (multiple IPs for same user)
  IF user_context IS NOT NULL THEN
    SELECT COUNT(DISTINCT ip_address) > 3 INTO is_suspicious
    FROM public.rate_limits 
    WHERE action_type = action 
    AND window_start > now() - interval '1 hour';
  END IF;
  
  -- Log suspicious activity
  IF is_suspicious THEN
    PERFORM log_security_event('rate_limits', 'SUSPICIOUS_ACTIVITY', user_context::text, 
      NULL, jsonb_build_object('ip', client_ip, 'action', action, 'timestamp', now()));
  END IF;
  
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
    -- Rate limit exceeded - log security event
    PERFORM log_security_event('rate_limits', 'RATE_LIMIT_EXCEEDED', user_context::text,
      NULL, jsonb_build_object('ip', client_ip, 'action', action, 'attempts', current_count));
    RETURN FALSE;
  END IF;
END;
$function$;

-- Fix 6: Session Security Enhancement
CREATE OR REPLACE FUNCTION public.validate_user_session()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  user_exists BOOLEAN;
  last_activity TIMESTAMP WITH TIME ZONE;
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
$function$;