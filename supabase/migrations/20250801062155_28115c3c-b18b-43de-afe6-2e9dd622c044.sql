-- Create receipts table with all required columns
CREATE TABLE IF NOT EXISTS public.receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  receipt_number TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT DEFAULT 'Card',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

-- Create policies for receipts
CREATE POLICY "Users can view their own receipts" 
ON public.receipts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own receipts" 
ON public.receipts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own receipts" 
ON public.receipts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own receipts" 
ON public.receipts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_receipts_updated_at
  BEFORE UPDATE ON public.receipts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate receipt numbers
CREATE OR REPLACE FUNCTION public.generate_receipt_number()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  receipt_number TEXT;
BEGIN
  -- Get the next number in sequence
  SELECT COALESCE(MAX(CAST(SUBSTRING(receipt_number FROM 'RCP-(\d+)') AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.receipts
  WHERE user_id = auth.uid();
  
  -- Format as RCP-XXXX
  receipt_number := 'RCP-' || LPAD(next_number::TEXT, 4, '0');
  
  RETURN receipt_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;