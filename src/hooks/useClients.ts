
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSecureQuery } from './useSecureQuery';

export function useClients() {
  return useSecureQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    dataType: 'clients'
  });
}

export function useClient(id: string) {
  return useSecureQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    dataType: 'client',
    enabled: !!id
  });
}
