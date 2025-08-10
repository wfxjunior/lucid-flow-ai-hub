-- Create communication templates table
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NULL,
  name TEXT NOT NULL,
  context TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  subject TEXT,
  body_html TEXT,
  body_text TEXT,
  variables JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Policies: users manage their own; all users can view defaults
CREATE POLICY IF NOT EXISTS "Users can manage their own templates"
ON public.templates
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "All users can view default templates"
ON public.templates
FOR SELECT
USING (user_id IS NULL OR is_default = true);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_templates_updated_at ON public.templates;
CREATE TRIGGER update_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_templates_user_context_lang
ON public.templates (user_id, context, language);

-- Senders (email) table
CREATE TABLE IF NOT EXISTS public.senders_email (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.senders_email ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can manage their own email senders"
ON public.senders_email
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_senders_email_updated_at ON public.senders_email;
CREATE TRIGGER update_senders_email_updated_at
BEFORE UPDATE ON public.senders_email
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_senders_email_user
ON public.senders_email (user_id);

-- Communication messages log
CREATE TABLE IF NOT EXISTS public.comm_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  client_id UUID NULL,
  channel TEXT NOT NULL, -- 'email' | 'sms' | 'both'
  to_email TEXT,
  to_phone TEXT,
  from_email TEXT,
  from_name TEXT,
  subject TEXT,
  body_html TEXT,
  body_text TEXT,
  status TEXT NOT NULL DEFAULT 'queued', -- queued | sent | delivered | opened | clicked | failed
  provider_message_id TEXT,
  context_type TEXT,
  context_id TEXT,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.comm_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can manage their own comm messages"
ON public.comm_messages
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_comm_messages_updated_at ON public.comm_messages;
CREATE TRIGGER update_comm_messages_updated_at
BEFORE UPDATE ON public.comm_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_comm_messages_user_created
ON public.comm_messages (user_id, created_at DESC);

-- Optional seed: create a couple of default templates (visible to all)
INSERT INTO public.templates (user_id, name, context, language, subject, body_html, body_text, variables, is_default)
VALUES
  (NULL, 'Appointment Confirmation', 'appointments', 'en', 'Your appointment is confirmed',
   '<p>Hi {{client.name}},</p><p>Your appointment is confirmed for {{appointment.date_time}}.</p>',
   'Hi {{client.name}}, your appointment is confirmed for {{appointment.date_time}}.',
   '["client.name","appointment.date_time"]'::jsonb, true),
  (NULL, 'Invoice Sent', 'billing', 'en', 'Invoice {{invoice.number}}',
   '<p>Hi {{client.name}},</p><p>We\'ve sent invoice <strong>{{invoice.number}}</strong> totaling {{invoice.total}}.</p>',
   'Hi {{client.name}}, we\'ve sent invoice {{invoice.number}} totaling {{invoice.total}}.',
   '["client.name","invoice.number","invoice.total"]'::jsonb, true)
ON CONFLICT DO NOTHING;