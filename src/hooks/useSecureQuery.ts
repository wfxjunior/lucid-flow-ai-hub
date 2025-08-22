
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { securityEvent, secureError } from '@/utils/security';
import { useAuthState } from './useAuthState';

interface SecureQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryFn'> {
  queryFn: () => Promise<T>;
  requireAuth?: boolean;
  dataType?: string;
}

export function useSecureQuery<T>({
  queryFn,
  requireAuth = true,
  dataType,
  ...options
}: SecureQueryOptions<T>) {
  const { user, loading: authLoading } = useAuthState();

  return useQuery({
    ...options,
    enabled: requireAuth ? !!user && !authLoading && (options.enabled ?? true) : (options.enabled ?? true),
    queryFn: async () => {
      if (requireAuth && !user) {
        securityEvent('Query attempted without authentication', {
          queryKey: options.queryKey,
          dataType,
          timestamp: new Date().toISOString()
        });
        throw new Error('Authentication required');
      }

      try {
        const result = await queryFn();
        
        // Log successful data access for audit
        if (dataType) {
          securityEvent('Data access successful', {
            dataType,
            userId: user?.id,
            timestamp: new Date().toISOString()
          });
        }
        
        return result;
      } catch (error) {
        secureError('Secure query failed', {
          queryKey: options.queryKey,
          dataType,
          error: error instanceof Error ? error.message : 'Unknown error',
          userId: user?.id
        });
        
        // Enhanced error handling for common issues
        if (error instanceof Error) {
          if (error.message.includes('permission denied')) {
            throw new Error('You don\'t have permission to access this data. Please make sure you\'re logged in with the correct account.');
          }
          if (error.message.includes('RLS')) {
            throw new Error('Access restricted. Please contact support if this error persists.');
          }
        }
        
        throw error;
      }
    }
  });
}
