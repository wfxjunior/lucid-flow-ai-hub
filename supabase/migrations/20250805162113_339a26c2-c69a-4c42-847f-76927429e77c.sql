-- Grant admin role to juniorxavierusa@gmail.com
DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Find the user ID for the email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = 'juniorxavierusa@gmail.com';
    
    -- Check if user exists
    IF target_user_id IS NOT NULL THEN
        -- Insert admin role for this user (using ON CONFLICT to avoid duplicates)
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin role granted to user: %', target_user_id;
    ELSE
        RAISE NOTICE 'User with email juniorxavierusa@gmail.com not found. User must sign up first.';
    END IF;
END $$;