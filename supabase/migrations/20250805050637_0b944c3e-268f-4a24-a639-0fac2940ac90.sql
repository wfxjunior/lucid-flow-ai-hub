-- Create user_subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT NOT NULL DEFAULT 'free',
  plan_name TEXT NOT NULL DEFAULT 'Free',
  status TEXT NOT NULL DEFAULT 'inactive',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription
CREATE POLICY "users_can_view_own_subscription" ON public.user_subscriptions
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for service role to manage subscriptions
CREATE POLICY "service_role_can_manage_subscriptions" ON public.user_subscriptions
FOR ALL
USING (true);

-- Create unique index on user_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);

-- Create payment confirmation logs table
CREATE TABLE IF NOT EXISTS public.payment_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  plan_name TEXT NOT NULL,
  amount TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  billing_period TEXT,
  trial_days INTEGER,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own confirmations
CREATE POLICY "users_can_view_own_confirmations" ON public.payment_confirmations
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for service role to manage confirmations
CREATE POLICY "service_role_can_manage_confirmations" ON public.payment_confirmations
FOR ALL
USING (true);