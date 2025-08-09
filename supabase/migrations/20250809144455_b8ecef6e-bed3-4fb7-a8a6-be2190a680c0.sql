-- Create commonly used business tables if missing, with secure RLS

-- Clients
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own clients" ON public.clients;
CREATE POLICY "Users can view own clients" ON public.clients FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own clients" ON public.clients;
CREATE POLICY "Users can insert own clients" ON public.clients FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own clients" ON public.clients;
CREATE POLICY "Users can update own clients" ON public.clients FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own clients" ON public.clients;
CREATE POLICY "Users can delete own clients" ON public.clients FOR DELETE USING (auth.uid() = user_id);
DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients;
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);

-- Contracts
CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  client_id UUID,
  contract_number TEXT,
  title TEXT NOT NULL,
  content TEXT,
  description TEXT,
  contract_type TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  tags TEXT[] NOT NULL DEFAULT '{}',
  amount NUMERIC,
  start_date DATE,
  end_date DATE,
  line_items JSONB,
  payment_method TEXT,
  terms TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own contracts" ON public.contracts;
CREATE POLICY "Users can view own contracts" ON public.contracts FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own contracts" ON public.contracts;
CREATE POLICY "Users can insert own contracts" ON public.contracts FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own contracts" ON public.contracts;
CREATE POLICY "Users can update own contracts" ON public.contracts FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own contracts" ON public.contracts;
CREATE POLICY "Users can delete own contracts" ON public.contracts FOR DELETE USING (auth.uid() = user_id);
DROP TRIGGER IF EXISTS update_contracts_updated_at ON public.contracts;
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_contracts_user_id ON public.contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON public.contracts(created_at DESC);

-- Work Orders
CREATE TABLE IF NOT EXISTS public.work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  client_id UUID,
  estimate_id UUID,
  project_id UUID,
  work_order_number TEXT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  scheduled_date DATE,
  completion_date DATE,
  assigned_to TEXT,
  estimated_hours NUMERIC,
  actual_hours NUMERIC,
  materials_cost NUMERIC,
  labor_cost NUMERIC,
  total_cost NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own work orders" ON public.work_orders;
CREATE POLICY "Users can view own work orders" ON public.work_orders FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own work orders" ON public.work_orders;
CREATE POLICY "Users can insert own work orders" ON public.work_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own work orders" ON public.work_orders;
CREATE POLICY "Users can update own work orders" ON public.work_orders FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own work orders" ON public.work_orders;
CREATE POLICY "Users can delete own work orders" ON public.work_orders FOR DELETE USING (auth.uid() = user_id);
DROP TRIGGER IF EXISTS update_work_orders_updated_at ON public.work_orders;
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON public.work_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_work_orders_user_id ON public.work_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_work_orders_created_at ON public.work_orders(created_at DESC);

-- Signatures (e-sign)
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  client_id UUID NOT NULL,
  document_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  signature_data TEXT,
  signature_url TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own signatures" ON public.signatures;
CREATE POLICY "Users can view own signatures" ON public.signatures FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own signatures" ON public.signatures;
CREATE POLICY "Users can insert own signatures" ON public.signatures FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own signatures" ON public.signatures;
CREATE POLICY "Users can update own signatures" ON public.signatures FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own signatures" ON public.signatures;
CREATE POLICY "Users can delete own signatures" ON public.signatures FOR DELETE USING (auth.uid() = user_id);
DROP TRIGGER IF EXISTS update_signatures_updated_at ON public.signatures;
CREATE TRIGGER update_signatures_updated_at BEFORE UPDATE ON public.signatures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON public.signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_signatures_created_at ON public.signatures(created_at DESC);
