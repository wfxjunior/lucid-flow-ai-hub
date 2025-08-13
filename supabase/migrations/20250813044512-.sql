-- Harden RLS on user_subscriptions: restrict writes to service_role only and allow users to read only their own

-- Ensure RLS is enabled
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive or duplicate policies if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'Service role can insert subscriptions'
  ) THEN
    EXECUTE 'DROP POLICY "Service role can insert subscriptions" ON public.user_subscriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'Service role can manage subscriptions'
  ) THEN
    EXECUTE 'DROP POLICY "Service role can manage subscriptions" ON public.user_subscriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'Service role can update subscriptions'
  ) THEN
    EXECUTE 'DROP POLICY "Service role can update subscriptions" ON public.user_subscriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'Users can view their own subscriptions'
  ) THEN
    EXECUTE 'DROP POLICY "Users can view their own subscriptions" ON public.user_subscriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'service_role_can_manage_subscriptions'
  ) THEN
    EXECUTE 'DROP POLICY "service_role_can_manage_subscriptions" ON public.user_subscriptions';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_subscriptions' AND policyname = 'users_can_view_own_subscription'
  ) THEN
    EXECUTE 'DROP POLICY "users_can_view_own_subscription" ON public.user_subscriptions';
  END IF;
END $$;

-- Read policy: users can view their own subscription
CREATE POLICY users_can_view_own_subscription
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Write policies: only service_role may insert/update/delete
CREATE POLICY service_role_can_insert_user_subscriptions
ON public.user_subscriptions
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY service_role_can_update_user_subscriptions
ON public.user_subscriptions
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY service_role_can_delete_user_subscriptions
ON public.user_subscriptions
FOR DELETE
TO service_role
USING (true);