-- Secure Featherbot data tables with explicit RLS policies
-- Enable RLS (no-op if already enabled)
ALTER TABLE public.featherbot_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featherbot_kb_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featherbot_kb_pages ENABLE ROW LEVEL SECURITY;

-- SELECT allowed to authenticated users only
CREATE POLICY "featherbot_cache_select_authenticated"
ON public.featherbot_cache
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "featherbot_kb_chunks_select_authenticated"
ON public.featherbot_kb_chunks
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "featherbot_kb_pages_select_authenticated"
ON public.featherbot_kb_pages
FOR SELECT
TO authenticated
USING (true);

-- Writes restricted to service role only
CREATE POLICY "featherbot_cache_insert_service_role"
ON public.featherbot_cache
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "featherbot_cache_update_service_role"
ON public.featherbot_cache
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "featherbot_cache_delete_service_role"
ON public.featherbot_cache
FOR DELETE
TO service_role
USING (true);

CREATE POLICY "featherbot_kb_chunks_insert_service_role"
ON public.featherbot_kb_chunks
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "featherbot_kb_chunks_update_service_role"
ON public.featherbot_kb_chunks
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "featherbot_kb_chunks_delete_service_role"
ON public.featherbot_kb_chunks
FOR DELETE
TO service_role
USING (true);

CREATE POLICY "featherbot_kb_pages_insert_service_role"
ON public.featherbot_kb_pages
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "featherbot_kb_pages_update_service_role"
ON public.featherbot_kb_pages
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "featherbot_kb_pages_delete_service_role"
ON public.featherbot_kb_pages
FOR DELETE
TO service_role
USING (true);