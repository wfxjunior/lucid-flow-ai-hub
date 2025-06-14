
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { WorkOrder } from '@/types/business'
import type { WorkOrderWithClient, Client } from './types'

export function useWorkOrdersQuery() {
  return useQuery({
    queryKey: ['work-orders'],
    queryFn: async (): Promise<WorkOrderWithClient[]> => {
      // First get work orders
      const { data: workOrdersData, error: workOrdersError } = await supabase
        .from('work_orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (workOrdersError) {
        console.error('Error fetching work orders:', workOrdersError)
        throw workOrdersError
      }

      // Then get clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')

      if (clientsError) {
        console.error('Error fetching clients:', clientsError)
        throw clientsError
      }

      // Manually join the data and cast types properly
      return (workOrdersData || []).map(workOrder => ({
        ...workOrder,
        status: workOrder.status as WorkOrder['status'],
        priority: workOrder.priority as WorkOrder['priority'],
        client: clientsData?.find(client => client.id === workOrder.client_id) || null
      })) as WorkOrderWithClient[]
    }
  })
}
