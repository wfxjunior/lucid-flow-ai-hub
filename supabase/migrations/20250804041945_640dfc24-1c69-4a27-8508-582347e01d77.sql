-- Primeiro, vamos verificar se o usuário existe
SELECT id, email FROM auth.users WHERE email = 'juniorxavierusa@gmail.com';

-- Se o usuário existir, adicione o role de admin
-- (Esta query só funcionará se o usuário já tiver criado uma conta)
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'
FROM auth.users 
WHERE email = 'juniorxavierusa@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verificar se funcionou
SELECT u.email, ur.role 
FROM auth.users u 
JOIN public.user_roles ur ON u.id = ur.user_id 
WHERE u.email = 'juniorxavierusa@gmail.com';