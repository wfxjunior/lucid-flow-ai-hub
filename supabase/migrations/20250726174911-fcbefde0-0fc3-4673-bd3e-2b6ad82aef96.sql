-- Create user roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own role" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (auth.role() = 'service_role');

-- Insert admin role for wfxjunior@gmail.com
-- First need to check if user exists and get their ID
DO $$
DECLARE
    user_uuid uuid;
BEGIN
    -- Get user ID for the email
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = 'wfxjunior@gmail.com';
    
    -- If user exists, insert admin role
    IF user_uuid IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_uuid, 'admin')
        ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
    END IF;
END $$;