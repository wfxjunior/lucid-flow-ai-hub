
import { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';

export const useUserRole = () => {
  const { session, isLoading } = useSessionContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (isLoading) return;
      
      if (!session?.user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data?.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkUserRole();
  }, [session, isLoading]);

  return { isAdmin, loading };
};
