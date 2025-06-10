
-- Criar tabela para rastrear assinaturas dos usuários
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias assinaturas
CREATE POLICY "Users can view their own subscriptions" 
  ON public.user_subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para inserir assinaturas (usada pelas edge functions)
CREATE POLICY "Service role can insert subscriptions" 
  ON public.user_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

-- Política para atualizar assinaturas (usada pelas edge functions)
CREATE POLICY "Service role can update subscriptions" 
  ON public.user_subscriptions 
  FOR UPDATE 
  USING (true);

-- Criar índices para performance
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_stripe_customer_id ON public.user_subscriptions(stripe_customer_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
