-- Fix security warnings by setting proper search_path for functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role text)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role::text = _role
    );
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT role::text
    FROM public.user_roles
    WHERE user_id = auth.uid()
    LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN
    INSERT INTO public.user_email_logs (
      user_id,
      recipient_email,
      subject,
      email_type,
      status
    ) VALUES (
      NEW.user_id,
      (SELECT email FROM auth.users WHERE id = NEW.user_id),
      'Role Change Notification',
      'security',
      'pending'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.user_email_logs (
      user_id,
      recipient_email,
      subject,
      email_type,
      status
    ) VALUES (
      OLD.user_id,
      (SELECT email FROM auth.users WHERE id = OLD.user_id),
      'Role Removed Notification',
      'security',
      'pending'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;