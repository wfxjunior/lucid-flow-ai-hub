
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from '@/hooks/useAuthState';

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuthState();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to FeatherBiz
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0B1B3B',
                    brandAccent: '#1a2851',
                  },
                },
              },
            }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>
      </div>
    </div>
  );
}
