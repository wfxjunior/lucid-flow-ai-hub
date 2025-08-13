-- Fix security warnings: remove security definer view and fix search paths
-- Drop the security definer view as it poses a security risk
DROP VIEW IF EXISTS public.security_status;

-- Create a safer function instead of a view for security status
CREATE OR REPLACE FUNCTION public.get_security_status()
RETURNS TABLE(check_type text, schema_name text, table_name text, status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Only allow authenticated users to check security status
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  
  RETURN QUERY
  SELECT 
    'RLS_ENABLED'::text as check_type,
    t.schemaname::text as schema_name,
    t.tablename::text as table_name,
    CASE WHEN c.relrowsecurity THEN 'PASS' ELSE 'FAIL' END::text as status
  FROM pg_tables t
  JOIN pg_class c ON c.relname = t.tablename
  WHERE t.schemaname = 'public'
    AND c.relrowsecurity IS NOT NULL;
END;
$function$;

-- Fix any remaining functions that might not have search_path set correctly
-- Check and update the specific function that might be causing the warning
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
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
$function$;