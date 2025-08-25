
-- Fix database functions with mutable search_path (Security Issue #1 - HIGH PRIORITY)
-- Adding SET search_path TO 'public' to functions that are missing this security parameter

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert into profiles table using fully qualified names for security
  INSERT INTO public.profiles (id, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    now(),
    now()
  );
  
  -- Insert into user_notification_settings table
  INSERT INTO public.user_notification_settings (user_id, created_at, updated_at)
  VALUES (NEW.id, now(), now());
  
  RETURN NEW;
END;
$$;

-- Fix audit_role_changes function
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Fix prevent_self_admin_modification function  
CREATE OR REPLACE FUNCTION public.prevent_self_admin_modification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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

-- Create a new premium_access role for replacing hardcoded email access
-- This addresses Security Issue #2 (hardcoded privileged access)
DO $$
BEGIN
  -- Add premium_access to the app_role enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'premium_access');
  ELSE
    -- Check if premium_access already exists in the enum
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role') AND enumlabel = 'premium_access') THEN
      ALTER TYPE public.app_role ADD VALUE 'premium_access';
    END IF;
  END IF;
END $$;

-- Create a function to check premium access through database roles instead of hardcoded emails
CREATE OR REPLACE FUNCTION public.has_premium_access(user_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param
      AND role IN ('admin', 'premium_access')
  );
$$;
