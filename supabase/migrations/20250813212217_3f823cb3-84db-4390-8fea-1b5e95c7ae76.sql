-- Fix RLS policies for clients and users tables

-- First, check if clients table exists and update its policies
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'clients') THEN
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Users can view their own clients" ON public.clients;
        DROP POLICY IF EXISTS "Users can create their own clients" ON public.clients;
        DROP POLICY IF EXISTS "Users can update their own clients" ON public.clients;
        DROP POLICY IF EXISTS "Users can delete their own clients" ON public.clients;
        
        -- Create proper policies for clients table
        CREATE POLICY "Users can view their own clients"
        ON public.clients 
        FOR SELECT 
        USING (auth.uid() = user_id);

        CREATE POLICY "Users can create their own clients"
        ON public.clients 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own clients"
        ON public.clients 
        FOR UPDATE 
        USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete their own clients"
        ON public.clients 
        FOR DELETE 
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Fix users table policies (if it exists in public schema)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
        DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
        
        -- Create proper policies for users table
        CREATE POLICY "Users can view their own data"
        ON public.users 
        FOR SELECT 
        USING (auth.uid() = id);

        CREATE POLICY "Users can update their own data"
        ON public.users 
        FOR UPDATE 
        USING (auth.uid() = id);
    END IF;
END $$;

-- Add missing unique constraints to prevent ON CONFLICT errors
DO $$
BEGIN
    -- Add unique constraint to featherbot_leads if not exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'featherbot_leads_email_unique'
    ) THEN
        ALTER TABLE public.featherbot_leads 
        ADD CONSTRAINT featherbot_leads_email_unique UNIQUE (email);
    END IF;
    
    -- Add unique constraint to featherbot_referrals if not exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'featherbot_referrals_friend_email_unique'
    ) THEN
        ALTER TABLE public.featherbot_referrals 
        ADD CONSTRAINT featherbot_referrals_friend_email_unique UNIQUE (friend_email);
    END IF;
END $$;