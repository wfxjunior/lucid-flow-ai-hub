
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { SignatureWithRelations } from './types'

export function useSignaturesQuery() {
  return useQuery({
    queryKey: ['signatures'],
    queryFn: async (): Promise<SignatureWithRelations[]> => {
      // First get signatures
      const { data: signaturesData, error: signaturesError } = await supabase
        .from('signatures')
        .select('*')
        .order('created_at', { ascending: false })

      if (signaturesError) {
        console.error('Error fetching signatures:', signaturesError)
        throw signaturesError
      }

      // Then get clients and documents
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')

      const { data: documentsData } = await supabase
        .from('documents')
        .select('*')

      // Manually join the data
      return (signaturesData || []).map(signature => ({
        ...signature,
        client: clientsData?.find(client => client.id === signature.client_id),
        document: documentsData?.find(doc => doc.id === signature.document_id)
      }))
    }
  })
}
