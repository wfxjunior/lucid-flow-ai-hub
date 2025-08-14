-- Remove overly permissive policies that allow public access to templates
DROP POLICY IF EXISTS "All users can view default templates" ON public.templates;
DROP POLICY IF EXISTS "System templates are publicly viewable" ON public.templates;

-- Add secure policy for authenticated users to view default templates
CREATE POLICY "Authenticated users can view default templates" 
ON public.templates 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  ((user_id IS NULL AND is_default = true) OR (auth.uid() = user_id))
);

-- Add policy for service role to manage default templates
CREATE POLICY "Service role can manage default templates" 
ON public.templates 
FOR ALL 
USING (
  auth.jwt() ->> 'role' = 'service_role'
) 
WITH CHECK (
  auth.jwt() ->> 'role' = 'service_role'
);