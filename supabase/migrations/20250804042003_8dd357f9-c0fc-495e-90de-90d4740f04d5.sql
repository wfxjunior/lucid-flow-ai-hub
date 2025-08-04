-- Adicionar role de admin para o email juniorxavierusa@gmail.com
-- (Esta query só funcionará se o usuário já tiver criado uma conta)
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'
FROM auth.users 
WHERE email = 'juniorxavierusa@gmail.com' 
AND NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.users.id AND role = 'admin'
);