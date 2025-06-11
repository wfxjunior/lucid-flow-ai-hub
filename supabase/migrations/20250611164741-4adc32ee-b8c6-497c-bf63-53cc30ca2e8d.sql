
-- Remover políticas existentes e recriar para garantir consistência

-- 1. Remover políticas existentes (se existirem)
DROP POLICY IF EXISTS "Users can manage attendees of their meetings" ON public.meeting_attendees;
DROP POLICY IF EXISTS "Users can manage reminders of their meetings" ON public.meeting_reminders;
DROP POLICY IF EXISTS "Users can manage documents of their rentals" ON public.rental_documents;
DROP POLICY IF EXISTS "Users can manage their own clients" ON public.clients;
DROP POLICY IF EXISTS "Users can manage their own estimates" ON public.estimates;
DROP POLICY IF EXISTS "Users can manage their own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can manage their own work orders" ON public.work_orders;
DROP POLICY IF EXISTS "Users can manage their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can manage their own meetings" ON public.meetings;
DROP POLICY IF EXISTS "Users can manage their own contracts" ON public.contracts;
DROP POLICY IF EXISTS "Users can manage their own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can manage their own signatures" ON public.signatures;
DROP POLICY IF EXISTS "Users can manage their own receipts" ON public.receipts;
DROP POLICY IF EXISTS "Users can manage their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Users can manage their own company profile" ON public.company_profiles;
DROP POLICY IF EXISTS "Users can manage their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can manage their own files" ON public.files;
DROP POLICY IF EXISTS "Users can manage their own folders" ON public.folders;
DROP POLICY IF EXISTS "Users can manage their own vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Users can manage their own car rentals" ON public.car_rentals;
DROP POLICY IF EXISTS "Users can manage their own smart schedules" ON public.smart_schedules;
DROP POLICY IF EXISTS "Users can manage their own schedule settings" ON public.smart_schedule_settings;
DROP POLICY IF EXISTS "Users can manage their own accounting documents" ON public.accounting_documents;
DROP POLICY IF EXISTS "Users can manage their own aftercare feedback" ON public.aftercare_feedback;
DROP POLICY IF EXISTS "Users can manage their own earnsync companies" ON public.earnsync_companies;
DROP POLICY IF EXISTS "Users can manage their own earnsync earnings" ON public.earnsync_earnings;
DROP POLICY IF EXISTS "Users can manage their own earnsync expenses" ON public.earnsync_expenses;
DROP POLICY IF EXISTS "Users can manage their own earnsync goals" ON public.earnsync_goals;
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.user_subscriptions;

-- 2. Ativar RLS em todas as tabelas (ignorar erro se já estiver ativo)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.car_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smart_schedule_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounting_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aftercare_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnsync_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnsync_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnsync_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earnsync_goals ENABLE ROW LEVEL SECURITY;

-- 3. Criar novas políticas
CREATE POLICY "Users can manage their own clients" ON public.clients
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own estimates" ON public.estimates
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own invoices" ON public.invoices
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own work orders" ON public.work_orders
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own appointments" ON public.appointments
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own meetings" ON public.meetings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage attendees of their meetings" ON public.meeting_attendees
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.meetings 
      WHERE id = meeting_attendees.meeting_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage reminders of their meetings" ON public.meeting_reminders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.meetings 
      WHERE id = meeting_reminders.meeting_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own contracts" ON public.contracts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own documents" ON public.documents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own signatures" ON public.signatures
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own receipts" ON public.receipts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own settings" ON public.user_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own company profile" ON public.company_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own notes" ON public.notes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own files" ON public.files
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own folders" ON public.folders
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own vehicles" ON public.vehicles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own car rentals" ON public.car_rentals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage documents of their rentals" ON public.rental_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.car_rentals 
      WHERE id = rental_documents.rental_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own smart schedules" ON public.smart_schedules
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own schedule settings" ON public.smart_schedule_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own accounting documents" ON public.accounting_documents
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own aftercare feedback" ON public.aftercare_feedback
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own earnsync companies" ON public.earnsync_companies
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own earnsync earnings" ON public.earnsync_earnings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own earnsync expenses" ON public.earnsync_expenses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own earnsync goals" ON public.earnsync_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage subscriptions" ON public.user_subscriptions
  FOR ALL TO service_role USING (true);
