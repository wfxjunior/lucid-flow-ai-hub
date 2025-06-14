
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Meeting } from './types'

export function useMeetingsQuery() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: async (): Promise<Meeting[]> => {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('meeting_date', { ascending: true })

      if (error) {
        console.error('Error fetching meetings:', error)
        throw error
      }

      return data || []
    }
  })
}
