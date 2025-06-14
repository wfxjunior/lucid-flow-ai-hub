
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Contract } from './types'

export function useContractsQuery() {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: async (): Promise<Contract[]> => {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contracts:', error)
        throw error
      }

      return data || []
    }
  })
}
