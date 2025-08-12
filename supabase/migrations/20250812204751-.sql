-- Move vector extension to extensions schema if not already
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') THEN
    EXECUTE 'ALTER EXTENSION vector SET SCHEMA extensions';
  END IF;
END $$;

-- Recreate match_kb_chunks with explicit search_path
CREATE OR REPLACE FUNCTION public.match_kb_chunks(
  query_embedding VECTOR(1536),
  match_count INT,
  lang TEXT
) RETURNS TABLE (
  chunk_id UUID,
  content TEXT,
  url TEXT,
  title TEXT,
  language TEXT,
  similarity DOUBLE PRECISION
) LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  RETURN QUERY
  SELECT c.id AS chunk_id,
         c.content,
         p.url,
         p.title,
         c.language,
         1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.featherbot_kb_chunks c
  JOIN public.featherbot_kb_pages p ON p.id = c.page_id
  WHERE (lang IS NULL OR c.language = lang)
  ORDER BY c.embedding <-> query_embedding
  LIMIT COALESCE(match_count, 6);
END; $$;