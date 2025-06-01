
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

interface Appointment {
  id: string
  user_id: string
  client_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes: number
  location?: string
  notes?: string
  status: string
  created_at: string
  updated_at: string
  client?: Client
}

interface Contract {
  id: string
  user_id: string
  title: string
  content: string
  contract_type: string
  status: string
  tags: string[]
  is_template: boolean
  created_at: string
  updated_at: string
}

interface Document {
  id: string
  user_id: string
  title: string
  content: string
  document_type: string
  status: string
  file_url?: string
  created_at: string
  updated_at: string
}

interface Estimate {
  id: string
  user_id: string
  client_id: string
  estimate_number: string
  title: string
  description?: string
  amount: number
  estimate_date: string
  status: string
  created_at: string
  updated_at: string
}

interface SignatureWithRelations {
  id: string
  user_id: string
  client_id: string
  document_id: string
  signature_data?: string
  signature_url?: string
  status: string
  signed_at?: string
  created_at: string
  updated_at: string
  client?: Client
  document?: Document
}

export function useBusinessData() {
  const queryClient = useQueryClient()

  // Work Orders Query
  const { data: workOrders, isLoading: workOrdersLoading } = useQuery({
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

  // Appointments Query
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
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

  // Contracts Query
  const { data: contracts, isLoading: contractsLoading } = useQuery({
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

  // Documents Query
  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async (): Promise<Document[]> => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching documents:', error)
        throw error
      }

      return data || []
    }
  })

  // Estimates Query
  const { data: estimates, isLoading: estimatesLoading } = useQuery({
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

  // Signatures Query
  const { data: signatures, isLoading: signaturesLoading } = useQuery({
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

  // CRUD Operations
  const deleteWorkOrder = async (id: string) => {
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
  }

  const createWorkOrder = async (workOrderData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('work_orders')
      .insert([{
        ...workOrderData,
        user_id: user.user?.id,
        work_order_number: `WO-${Date.now().toString().slice(-6)}`
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
    return data
  }

  const updateWorkOrder = async (workOrderData: any) => {
    const { data, error } = await supabase
      .from('work_orders')
      .update(workOrderData)
      .eq('id', workOrderData.id)
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
    return data
  }

  const createClient = async (clientData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('clients')
      .insert([{
        ...clientData,
        user_id: user.user?.id
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['clients'] })
    return data
  }

  const createContract = async (contractData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('contracts')
      .insert([{
        ...contractData,
        user_id: user.user?.id
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['contracts'] })
    return data
  }

  const updateContract = async (contractData: any) => {
    const { data, error } = await supabase
      .from('contracts')
      .update(contractData)
      .eq('id', contractData.id)
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['contracts'] })
    return data
  }

  const deleteContract = async (id: string) => {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', id)

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['contracts'] })
  }

  const createDocument = async (documentData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        ...documentData,
        user_id: user.user?.id
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    return data
  }

  const sendDocumentForSignature = async (documentId: string, clientId: string) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('signatures')
      .insert([{
        document_id: documentId,
        client_id: clientId,
        user_id: user.user?.id,
        status: 'pending'
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['signatures'] })
    return data
  }

  const loadData = () => {
    queryClient.invalidateQueries({ queryKey: ['work-orders'] })
    queryClient.invalidateQueries({ queryKey: ['clients'] })
    queryClient.invalidateQueries({ queryKey: ['appointments'] })
    queryClient.invalidateQueries({ queryKey: ['contracts'] })
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    queryClient.invalidateQueries({ queryKey: ['estimates'] })
    queryClient.invalidateQueries({ queryKey: ['signatures'] })
  }

  return {
    // Data
    workOrders,
    clients,
    allClients: clients, // Alias for compatibility
    appointments,
    contracts,
    documents,
    estimates,
    signatures,
    
    // Loading states
    loading: workOrdersLoading || clientsLoading || appointmentsLoading || contractsLoading || documentsLoading || estimatesLoading || signaturesLoading,
    
    // Actions
    deleteWorkOrder,
    createWorkOrder,
    updateWorkOrder,
    createClient,
    createContract,
    updateContract,
    deleteContract,
    createDocument,
    sendDocumentForSignature,
    loadData
  }
}
