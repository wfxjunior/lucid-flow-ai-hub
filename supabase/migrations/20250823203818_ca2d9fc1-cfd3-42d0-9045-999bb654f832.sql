
-- Insert admin role for juniorxavierusa@gmail.com
-- First, we need to find the user_id for this email and then assign admin role
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find the user ID for the email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = 'juniorxavierusa@gmail.com';
    
    -- If user exists, insert admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin role assigned to user %', target_user_id;
    ELSE
        RAISE NOTICE 'User with email juniorxavierusa@gmail.com not found';
    END IF;
END $$;
