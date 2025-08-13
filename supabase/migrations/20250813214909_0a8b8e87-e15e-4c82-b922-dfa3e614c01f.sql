-- Clean up duplicate RLS policies on clients table for better security
-- Remove the duplicate policies that could cause confusion

DROP POLICY IF EXISTS "clients_select_own" ON public.clients;
DROP POLICY IF EXISTS "clients_insert_own" ON public.clients;
DROP POLICY IF EXISTS "clients_update_own" ON public.clients;
DROP POLICY IF EXISTS "clients_delete_own" ON public.clients;

-- Add additional security logging for client data access
CREATE OR REPLACE FUNCTION public.log_client_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any access to client data for security auditing
  IF TG_OP = 'SELECT' AND auth.uid() IS NOT NULL THEN
    PERFORM log_security_event('clients', 'SELECT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'INSERT' THEN
    PERFORM log_security_event('clients', 'INSERT', NEW.id::text, NULL, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'UPDATE' THEN
    PERFORM log_security_event('clients', 'UPDATE', NEW.id::text, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_security_event('clients', 'DELETE', OLD.id::text, row_to_json(OLD)::jsonb, NULL);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for security logging
CREATE TRIGGER clients_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.log_client_access();

-- Add constraint to ensure user_id is never null (security requirement)
ALTER TABLE public.clients 
ALTER COLUMN user_id SET NOT NULL;

-- Add index for better performance on security-critical queries
CREATE INDEX IF NOT EXISTS idx_clients_user_id_security 
ON public.clients(user_id) 
WHERE user_id IS NOT NULL;