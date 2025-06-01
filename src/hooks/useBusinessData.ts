
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { WorkOrder } from '@/types/business'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  status: string
  created_at: string
  updated_at: string
}

interface WorkOrderWithClient extends Omit<WorkOrder, 'client'> {
  client: Client | null
}

export function useBusinessData() {
  const queryClient = useQueryClient()

  // Work Orders Query
  const { data: workOrders, isLoading: workOrdersLoading } = useQuery({
    queryKey: ['work-orders'],
    queryFn: async (): Promise<WorkOrderWithClient[]> => {
      const { data, error } = await supabase
        .from('work_orders')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching work orders:', error)
        throw error
      }

      return data || []
    }
  })

  // Clients Query
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async (): Promise<Client[]> => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching clients:', error)
        throw error
      }

      return data || []
    }
  })

  const deleteWorkOrder = async (id: string) => {
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    // Invalidate the work orders query to refetch data
    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
  }

  const loadData = () => {
    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
    queryClient.invalidateQueries({ queryKey: ['clients'] })
  }

  return {
    workOrders,
    clients,
    loading: workOrdersLoading || clientsLoading,
    deleteWorkOrder,
    loadData
  }
}
