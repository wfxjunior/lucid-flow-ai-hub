-- Security Hardening: Fix critical data exposure vulnerabilities
-- Update RLS policies for support_tickets, meeting_attendees, form_responses, clients, and company_profiles

-- 1. Strengthen support_tickets RLS policies
DROP POLICY IF EXISTS "Users can create support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Users can view their own support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admins can view all support tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Admins can update all support tickets" ON public.support_tickets;

-- Create stricter support tickets policies
CREATE POLICY "Authenticated users can create support tickets" 
ON public.support_tickets 
FOR INSERT 
TO authenticated
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND email IS NOT NULL)
);

CREATE POLICY "Users can view only their own support tickets" 
ON public.support_tickets 
FOR SELECT 
TO authenticated
USING (
  auth.uid() = user_id OR 
  (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

CREATE POLICY "Only admins can view all support tickets" 
ON public.support_tickets 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update support tickets" 
ON public.support_tickets 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- 2. Strengthen meeting_attendees RLS policies
DROP POLICY IF EXISTS "Attendees can view own records only" ON public.meeting_attendees;
DROP POLICY IF EXISTS "Meeting organizers manage attendees" ON public.meeting_attendees;

-- Create stricter meeting attendees policies
CREATE POLICY "Only meeting organizers can manage attendees" 
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

CREATE POLICY "Attendees can view only their own attendance records" 
ON public.meeting_attendees 
FOR SELECT 
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- 3. Strengthen form_responses RLS policies
DROP POLICY IF EXISTS "Form owners can view responses to their forms" ON public.form_responses;
DROP POLICY IF EXISTS "Form owners can delete responses to their forms" ON public.form_responses;
DROP POLICY IF EXISTS "Public can submit to public forms" ON public.form_responses;

-- Create stricter form responses policies
CREATE POLICY "Only form owners can view form responses" 
ON public.form_responses 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.feather_forms 
    WHERE feather_forms.id = form_responses.form_id 
    AND feather_forms.user_id = auth.uid()
  )
);

CREATE POLICY "Only form owners can delete form responses" 
ON public.form_responses 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.feather_forms 
    WHERE feather_forms.id = form_responses.form_id 
    AND feather_forms.user_id = auth.uid()
  )
);

CREATE POLICY "Public can submit to public forms only" 
ON public.form_responses 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.feather_forms 
    WHERE feather_forms.id = form_responses.form_id 
    AND feather_forms.visibility = 'public' 
    AND feather_forms.is_active = true
  )
);

-- 4. Strengthen clients RLS policies (ensure no cross-user access)
DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;

-- Create ultra-strict client policies
CREATE POLICY "Users can only access their own clients - SELECT" 
ON public.clients 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can only create clients for themselves" 
ON public.clients 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can only update their own clients" 
ON public.clients 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can only delete their own clients" 
ON public.clients 
FOR DELETE 
TO authenticated
USING (user_id = auth.uid());

-- 5. Strengthen company_profiles RLS policies
DROP POLICY IF EXISTS "Users can view their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can create their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can update their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can delete their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can manage their own company profile" ON public.company_profiles;

-- Create ultra-strict company profile policies
CREATE POLICY "Users can only access their own company profile - SELECT" 
ON public.company_profiles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can only create their own company profile" 
ON public.company_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can only update their own company profile" 
ON public.company_profiles 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can only delete their own company profile" 
ON public.company_profiles 
FOR DELETE 
TO authenticated
USING (user_id = auth.uid());

-- 6. Add security audit logging for sensitive table access
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access to sensitive customer data
  IF TG_TABLE_NAME IN ('clients', 'support_tickets', 'meeting_attendees', 'form_responses', 'company_profiles') THEN
    PERFORM log_security_event(
      TG_TABLE_NAME, 
      TG_OP, 
      COALESCE(NEW.id::text, OLD.id::text),
      CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
      CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers for audit logging on sensitive tables
DROP TRIGGER IF EXISTS audit_clients_access ON public.clients;
CREATE TRIGGER audit_clients_access
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_support_tickets_access ON public.support_tickets;
CREATE TRIGGER audit_support_tickets_access
  AFTER INSERT OR UPDATE OR DELETE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_meeting_attendees_access ON public.meeting_attendees;
CREATE TRIGGER audit_meeting_attendees_access
  AFTER INSERT OR UPDATE OR DELETE ON public.meeting_attendees
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_form_responses_access ON public.form_responses;
CREATE TRIGGER audit_form_responses_access
  AFTER INSERT OR UPDATE OR DELETE ON public.form_responses
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_data_access();

DROP TRIGGER IF EXISTS audit_company_profiles_access ON public.company_profiles;
CREATE TRIGGER audit_company_profiles_access
  AFTER INSERT OR UPDATE OR DELETE ON public.company_profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_data_access();