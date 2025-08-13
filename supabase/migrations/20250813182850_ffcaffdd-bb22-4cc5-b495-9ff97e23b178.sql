-- Security Fix 1: Replace overly permissive user_roles policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create more restrictive role management policies
CREATE POLICY "Admins can view all user roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can assign non-admin roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  public.has_role(auth.uid(), 'admin') 
  AND role != 'admin'
);

CREATE POLICY "Admins can update non-admin roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin') AND role != 'admin')
WITH CHECK (public.has_role(auth.uid(), 'admin') AND role != 'admin');

CREATE POLICY "Admins can delete non-admin roles" 
ON public.user_roles 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin') AND role != 'admin');

-- Security Fix 2: Create audit table for role changes
CREATE TABLE public.role_change_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  changed_by UUID NOT NULL REFERENCES auth.users(id),
  target_user_id UUID NOT NULL REFERENCES auth.users(id),
  old_role TEXT,
  new_role TEXT,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS on audit table
ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view role audit logs" 
ON public.role_change_audit 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Create improved audit trigger function
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Log role changes with proper audit trail
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), NEW.user_id, NULL, NEW.role::text, 'INSERT'
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), NEW.user_id, OLD.role::text, NEW.role::text, 'UPDATE'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.role_change_audit (
      changed_by, target_user_id, old_role, new_role, action
    ) VALUES (
      auth.uid(), OLD.user_id, OLD.role::text, NULL, 'DELETE'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for role changes audit
DROP TRIGGER IF EXISTS audit_user_roles_changes ON public.user_roles;
CREATE TRIGGER audit_user_roles_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.audit_role_changes();

-- Security Fix 3: Prevent self-role modification
CREATE OR REPLACE FUNCTION public.prevent_self_admin_modification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Prevent users from modifying their own admin role
  IF TG_OP = 'DELETE' AND OLD.user_id = auth.uid() AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot delete your own admin role';
  END IF;
  
  IF TG_OP = 'UPDATE' AND OLD.user_id = auth.uid() AND OLD.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot modify your own admin role';
  END IF;
  
  -- Prevent creation of admin role by non-super-admins
  IF TG_OP = 'INSERT' AND NEW.role = 'admin' THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only existing admins can create new admin roles';
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger to prevent self-role modification
DROP TRIGGER IF EXISTS prevent_self_admin_modification ON public.user_roles;
CREATE TRIGGER prevent_self_admin_modification
  BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_admin_modification();