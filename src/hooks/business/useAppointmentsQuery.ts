
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Appointment } from './types'

export function useAppointmentsQuery() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async (): Promise<Appointment[]> => {
      // First get appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })

      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError)
        throw appointmentsError
      }

      // Then get clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')

      if (clientsError) {
        console.error('Error fetching clients for appointments:', clientsError)
        // Don't throw, just return appointments without client data
      }

      // Manually join the data
      return (appointmentsData || []).map(appointment => ({
        ...appointment,
        client: clientsData?.find(client => client.id === appointment.client_id)
      }))
    }
  })
}
