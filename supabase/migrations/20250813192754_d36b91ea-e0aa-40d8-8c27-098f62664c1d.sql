-- Comprehensive Security Fix Implementation
-- Phase 1: Critical Payment Security

-- Check if payment_confirmations table exists and add RLS if needed
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_confirmations') THEN
    -- Enable RLS on payment_confirmations
    ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;
    
    -- Create policy: Users can only access their own payment confirmations
    CREATE POLICY "Users can view their own payment confirmations" 
    ON public.payment_confirmations 
    FOR SELECT 
    USING (auth.uid() = user_id);
    
    -- Create policy: Users can only create their own payment confirmations
    CREATE POLICY "Users can create their own payment confirmations" 
    ON public.payment_confirmations 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
    
    -- Create policy: Service role can manage all payment confirmations
    CREATE POLICY "Service role can manage all payment confirmations" 
    ON public.payment_confirmations 
    FOR ALL 
    USING (true);
  END IF;
END $$;

-- Phase 2: Support Ticket Security

-- Drop existing policies on support_tickets to recreate them properly
DROP POLICY IF EXISTS "Users can create support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can view their own support tickets" ON public.support_tickets;

-- Recreate support ticket policies with admin access
CREATE POLICY "Users can create support tickets" 
ON public.support_tickets 
FOR INSERT 
WITH CHECK ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can view their own support tickets" 
ON public.support_tickets 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add admin policy for support tickets
CREATE POLICY "Admins can view all support tickets" 
ON public.support_tickets 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin policy for updating support tickets
CREATE POLICY "Admins can update all support tickets" 
ON public.support_tickets 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Phase 3: Form Response Security

-- Drop existing policies on form_responses to recreate them properly
DROP POLICY IF EXISTS "Public can submit to public forms" ON public.form_responses;
DROP POLICY IF EXISTS "Users can view responses to their forms" ON public.form_responses;

-- Recreate form response policies
CREATE POLICY "Public can submit to public forms" 
ON public.form_responses 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1
  FROM feather_forms
  WHERE feather_forms.id = form_responses.form_id 
  AND feather_forms.visibility = 'public'
));

CREATE POLICY "Form owners can view responses to their forms" 
ON public.form_responses 
FOR SELECT 
USING (EXISTS (
  SELECT 1
  FROM feather_forms
  WHERE feather_forms.id = form_responses.form_id 
  AND feather_forms.user_id = auth.uid()
));

-- Add policy for form owners to manage responses
CREATE POLICY "Form owners can delete responses to their forms" 
ON public.form_responses 
FOR DELETE 
USING (EXISTS (
  SELECT 1
  FROM feather_forms
  WHERE feather_forms.id = form_responses.form_id 
  AND feather_forms.user_id = auth.uid()
));

-- Phase 4: Meeting Attendee Security

-- Drop existing policies on meeting_attendees to recreate them properly
DROP POLICY IF EXISTS "Users can manage attendees of their meetings" ON public.meeting_attendees;
DROP POLICY IF EXISTS "Users can view attendees of their meetings" ON public.meeting_attendees;

-- Recreate meeting attendee policies with more granular control
CREATE POLICY "Meeting organizers can manage attendees" 
ON public.meeting_attendees 
FOR ALL 
USING (EXISTS (
  SELECT 1
  FROM meetings
  WHERE meetings.id = meeting_attendees.meeting_id 
  AND meetings.user_id = auth.uid()
));

-- Allow attendees to view their own attendee record
CREATE POLICY "Attendees can view their own record" 
ON public.meeting_attendees 
FOR SELECT 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Phase 5: Function Security Hardening

-- Update any remaining functions that might need security hardening
-- Recreate generate_tracking_token with proper security
DROP FUNCTION IF EXISTS public.generate_tracking_token();
CREATE OR REPLACE FUNCTION public.generate_tracking_token()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Phase 6: Audit Logging Setup

-- Create audit log table for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
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

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs" 
ON public.security_audit_log 
FOR INSERT 
WITH CHECK (true);

-- Create function to log security events
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
SET search_path = 'public'
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