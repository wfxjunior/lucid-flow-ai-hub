-- Secure the public.notes table by removing overly permissive policies
-- Idempotent: use IF EXISTS and keep existing user-scoped policies intact

-- Ensure RLS is enabled (no-op if already enabled)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Remove public-wide policies that allow unauthenticated access
DROP POLICY IF EXISTS "Anyone can view notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can create notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can update notes" ON public.notes;
DROP POLICY IF EXISTS "Anyone can delete notes" ON public.notes;

-- Keep or create user-scoped policies (idempotent re-create only if missing)
DO $$
BEGIN
  -- View own notes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'notes' 
      AND policyname = 'Users can view their own notes'
  ) THEN
    CREATE POLICY "Users can view their own notes"
    ON public.notes FOR SELECT
    USING (auth.uid() = user_id);
  END IF;

  -- Create own notes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'notes' 
      AND policyname = 'Users can create their own notes'
  ) THEN
    CREATE POLICY "Users can create their own notes"
    ON public.notes FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Update own notes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'notes' 
      AND policyname = 'Users can update their own notes'
  ) THEN
    CREATE POLICY "Users can update their own notes"
    ON public.notes FOR UPDATE
    USING (auth.uid() = user_id);
  END IF;

  -- Delete own notes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'notes' 
      AND policyname = 'Users can delete their own notes'
  ) THEN
    CREATE POLICY "Users can delete their own notes"
    ON public.notes FOR DELETE
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Optional: tighten further by forcing RLS (prevents BYPASSRLS roles) – safe to include
ALTER TABLE public.notes FORCE ROW LEVEL SECURITY;