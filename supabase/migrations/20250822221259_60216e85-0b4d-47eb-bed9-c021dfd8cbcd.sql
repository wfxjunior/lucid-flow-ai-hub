
-- First, let's check if you already have a user_roles entry and create one if needed
-- This will make juniorxavierusa@gmail.com an admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users 
WHERE email = 'juniorxavierusa@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Let's also ensure you have a profile entry
INSERT INTO public.profiles (id, first_name, last_name)
SELECT id, 'Junior', 'Xavier'
FROM auth.users 
WHERE email = 'juniorxavierusa@gmail.com'
ON CONFLICT (id) DO NOTHING;
