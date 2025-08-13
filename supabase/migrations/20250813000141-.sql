-- 1) Make 'business-files' bucket private and add restrictive policies
-- Ensure bucket exists and is set to private
update storage.buckets
set public = false
where id = 'business-files';

-- Create RLS policies for storage.objects on 'business-files' bucket (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'business_files_select_own'
  ) THEN
    CREATE POLICY "business_files_select_own" 
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'business-files' AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'business_files_insert_own'
  ) THEN
    CREATE POLICY "business_files_insert_own" 
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'business-files' AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'business_files_update_own'
  ) THEN
    CREATE POLICY "business_files_update_own" 
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'business-files' AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'business_files_delete_own'
  ) THEN
    CREATE POLICY "business_files_delete_own" 
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'business-files' AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END$$;

-- 2) Enable RLS on knowledge base chunks to prevent direct public reads
ALTER TABLE public.featherbot_kb_chunks ENABLE ROW LEVEL SECURITY;