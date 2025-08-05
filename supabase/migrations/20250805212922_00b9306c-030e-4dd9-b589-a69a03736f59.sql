-- Create document events table for tracking client interactions
CREATE TABLE public.document_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Document owner
  document_id UUID NOT NULL,
  document_type TEXT NOT NULL, -- 'invoice', 'estimate', 'quote', etc.
  document_number TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'viewed', 'payment_link_clicked', 'payment_received', 'receipt_viewed'
  client_email TEXT NOT NULL,
  client_name TEXT,
  client_ip TEXT,
  user_agent TEXT,
  amount NUMERIC,
  payment_method TEXT,
  payment_reference TEXT,
  tracking_token TEXT NOT NULL, -- Secure token for tracking
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view events for their documents" 
ON public.document_events 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service can insert document events" 
ON public.document_events 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service can update document events" 
ON public.document_events 
FOR UPDATE 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_document_events_user_id ON public.document_events(user_id);
CREATE INDEX idx_document_events_document_id ON public.document_events(document_id);
CREATE INDEX idx_document_events_tracking_token ON public.document_events(tracking_token);
CREATE INDEX idx_document_events_created_at ON public.document_events(created_at);

-- Create updated_at trigger
CREATE TRIGGER update_document_events_updated_at
BEFORE UPDATE ON public.document_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add tracking tokens to existing document tables
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.estimates ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.work_orders ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS tracking_token TEXT;
ALTER TABLE public.business_proposals ADD COLUMN IF NOT EXISTS tracking_token TEXT;

-- Function to generate secure tracking tokens
CREATE OR REPLACE FUNCTION public.generate_tracking_token()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$;

-- Function to ensure tracking tokens exist for documents
CREATE OR REPLACE FUNCTION public.ensure_tracking_token()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.tracking_token IS NULL THEN
    NEW.tracking_token := generate_tracking_token();
  END IF;
  RETURN NEW;
END;
$$;

-- Add triggers to auto-generate tracking tokens
CREATE TRIGGER ensure_invoice_tracking_token
BEFORE INSERT OR UPDATE ON public.invoices
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_estimate_tracking_token
BEFORE INSERT OR UPDATE ON public.estimates
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_quote_tracking_token
BEFORE INSERT OR UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_contract_tracking_token
BEFORE INSERT OR UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_work_order_tracking_token
BEFORE INSERT OR UPDATE ON public.work_orders
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_bid_tracking_token
BEFORE INSERT OR UPDATE ON public.bids
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();

CREATE TRIGGER ensure_business_proposal_tracking_token
BEFORE INSERT OR UPDATE ON public.business_proposals
FOR EACH ROW
EXECUTE FUNCTION public.ensure_tracking_token();