-- Add custom_document_titles column to company_profiles table
ALTER TABLE public.company_profiles 
ADD COLUMN custom_document_titles JSONB DEFAULT '{}';

-- Add comment to explain the column
COMMENT ON COLUMN public.company_profiles.custom_document_titles IS 'Store custom document titles per document type (e.g., {"invoice": "INVOICE FLOORING", "estimate": "CONSTRUCTION ESTIMATE"})';

-- Create index for better performance when querying custom titles
CREATE INDEX idx_company_profiles_custom_titles ON public.company_profiles USING GIN (custom_document_titles);