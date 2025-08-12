-- Create support_tickets table for Help Center submissions
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID NULL,
  name TEXT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  source TEXT NOT NULL DEFAULT 'help-center',
  priority TEXT NOT NULL DEFAULT 'normal',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'support_tickets' AND policyname = 'Anyone can create support tickets'
  ) THEN
    CREATE POLICY "Anyone can create support tickets"
    ON public.support_tickets
    FOR INSERT
    WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'support_tickets' AND policyname = 'Users can view their own support tickets'
  ) THEN
    CREATE POLICY "Users can view their own support tickets"
    ON public.support_tickets
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Timestamps trigger
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_support_tickets_updated_at'
  ) THEN
    CREATE TRIGGER update_support_tickets_updated_at
    BEFORE UPDATE ON public.support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON public.support_tickets(created_at DESC);