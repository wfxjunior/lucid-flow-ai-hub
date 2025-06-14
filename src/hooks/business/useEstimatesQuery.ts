
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Estimate } from './types'

export function useEstimatesQuery() {
  return useQuery({
    queryKey: ['estimates'],
    queryFn: async (): Promise<Estimate[]> => {
      const { data, error } = await supabase
        .from('estimates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching estimates:', error)
        throw error
      }

      return data || []
    }
  })
}
