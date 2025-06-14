
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export function useBusinessMutations() {
  const queryClient = useQueryClient()

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

  const createMeeting = async (meetingData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('meetings')
      .insert([{
        ...meetingData,
        user_id: user.user?.id
      }])
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['meetings'] })
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
    queryClient.invalidateQueries({ queryKey: ['meetings'] })
    queryClient.invalidateQueries({ queryKey: ['invoices'] })
  }

  return {
    deleteWorkOrder,
    createWorkOrder,
    updateWorkOrder,
    createClient,
    createContract,
    updateContract,
    deleteContract,
    createDocument,
    sendDocumentForSignature,
    createMeeting,
    loadData
  }
}
