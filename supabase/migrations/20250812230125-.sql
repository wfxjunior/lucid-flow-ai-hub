-- Enforce secure Row Level Security (RLS) on clients table
-- This protects customer PII so each user can only access their own records

-- Enable and force RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients FORCE ROW LEVEL SECURITY;

-- Ensure appropriate privileges for authenticated users (safe if already granted)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
-- Remove any direct anon access (reads would require explicit policies anyway)
REVOKE ALL ON public.clients FROM anon;

-- Helpful index for common policy predicate
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients (user_id);

-- Normalize policies: drop known policy names if they exist, then create clear, minimal policies
DROP POLICY IF EXISTS "Clients select own" ON public.clients;
DROP POLICY IF EXISTS "Clients insert own" ON public.clients;
DROP POLICY IF EXISTS "Clients update own" ON public.clients;
DROP POLICY IF EXISTS "Clients delete own" ON public.clients;

-- One policy per operation using the same ownership rule
CREATE POLICY "Clients select own"
  ON public.clients
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Clients insert own"
  ON public.clients
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients update own"
  ON public.clients
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Clients delete own"
  ON public.clients
  FOR DELETE
  USING (auth.uid() = user_id);
