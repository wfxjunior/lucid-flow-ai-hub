-- Harden RLS policies on public.clients to prevent any public read and remove duplicates

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on public.clients to avoid duplicates/conflicts
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'clients'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.clients', pol.policyname);
  END LOOP;
END $$;

-- Create canonical, least-privilege policies for authenticated users only
-- View own clients
CREATE POLICY clients_select_own
ON public.clients
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Insert own clients
CREATE POLICY clients_insert_own
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Update own clients (must both see and keep ownership)
CREATE POLICY clients_update_own
ON public.clients
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Delete own clients
CREATE POLICY clients_delete_own
ON public.clients
FOR DELETE
TO authenticated
USING (user_id = auth.uid());