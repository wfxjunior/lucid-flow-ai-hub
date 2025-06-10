
-- Create table for forms
CREATE TABLE public.feather_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'team', 'public')),
  thank_you_message TEXT DEFAULT 'Thank you for your submission!',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for form fields
CREATE TABLE public.form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES public.feather_forms(id) ON DELETE CASCADE NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN ('short_text', 'paragraph', 'date', 'number', 'dropdown', 'checkbox', 'radio', 'file_upload', 'signature')),
  field_label TEXT NOT NULL,
  field_placeholder TEXT,
  is_required BOOLEAN DEFAULT false,
  field_options JSONB, -- For dropdown, checkbox, radio options
  field_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for form responses
CREATE TABLE public.form_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES public.feather_forms(id) ON DELETE CASCADE NOT NULL,
  respondent_email TEXT,
  respondent_name TEXT,
  response_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address TEXT
);

-- Create table for form destinations
CREATE TABLE public.form_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES public.feather_forms(id) ON DELETE CASCADE NOT NULL,
  destination_type TEXT NOT NULL CHECK (destination_type IN ('internal', 'email', 'whatsapp', 'smart_schedule', 'aftercare', 'client_file')),
  destination_config JSONB NOT NULL, -- Store email addresses, phone numbers, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feather_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_destinations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forms
CREATE POLICY "Users can manage their own forms" ON public.feather_forms
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for form fields
CREATE POLICY "Users can manage fields of their forms" ON public.form_fields
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.feather_forms 
      WHERE id = form_fields.form_id AND user_id = auth.uid()
    )
  );

-- RLS Policies for form responses
CREATE POLICY "Users can view responses to their forms" ON public.form_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.feather_forms 
      WHERE id = form_responses.form_id AND user_id = auth.uid()
    )
  );

-- Allow public to submit responses to public forms
CREATE POLICY "Public can submit to public forms" ON public.form_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.feather_forms 
      WHERE id = form_responses.form_id AND visibility = 'public'
    )
  );

-- RLS Policies for form destinations
CREATE POLICY "Users can manage destinations of their forms" ON public.form_destinations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.feather_forms 
      WHERE id = form_destinations.form_id AND user_id = auth.uid()
    )
  );
