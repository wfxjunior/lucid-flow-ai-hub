import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { useState } from "react"

export function useBusinessData() {
  const queryClient = useQueryClient()
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  // Clients
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Appointments
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Invoices  
  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Estimates with enhanced query
  const { data: estimates, isLoading: estimatesLoading } = useQuery({
    queryKey: ['estimates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('estimates')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Receipts
  const { data: receipts, isLoading: receiptsLoading } = useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Contracts
  const { data: contracts, isLoading: contractsLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Documents
  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Signatures
  const { data: signatures, isLoading: signaturesLoading } = useQuery({
    queryKey: ['signatures'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('signatures')
        .select(`
          *,
          document:documents(*),
          client:clients(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Work Orders - Fixed query to properly join with clients table
  const { data: workOrders, isLoading: workOrdersLoading } = useQuery({
    queryKey: ['work_orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_orders')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })

  // Mutations
  const createClientMutation = useMutation({
    mutationFn: async (client: any) => {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoice: any) => {
      const { data, error } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    }
  })

  const createEstimateMutation = useMutation({
    mutationFn: async (estimate: any) => {
      const { data, error } = await supabase
        .from('estimates')
        .insert([estimate])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    }
  })

  const createReceiptMutation = useMutation({
    mutationFn: async (receipt: any) => {
      const { data, error } = await supabase
        .from('receipts')
        .insert([receipt])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] })
    }
  })

  const createContractMutation = useMutation({
    mutationFn: async (contract: any) => {
      const { data, error } = await supabase
        .from('contracts')
        .insert([contract])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    }
  })

  const updateContractMutation = useMutation({
    mutationFn: async ({ id, ...contract }: any) => {
      const { data, error } = await supabase
        .from('contracts')
        .update(contract)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    }
  })

  const deleteContractMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
    }
  })

  const createDocumentMutation = useMutation({
    mutationFn: async (document: any) => {
      const { data, error } = await supabase
        .from('documents')
        .insert([document])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    }
  })

  const createSignatureMutation = useMutation({
    mutationFn: async (signature: any) => {
      const { data, error } = await supabase
        .from('signatures')
        .insert([signature])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signatures'] })
    }
  })

  const createWorkOrderMutation = useMutation({
    mutationFn: async (workOrder: any) => {
      const { data: workOrderNumber } = await supabase.rpc('generate_work_order_number')
      
      const { data, error } = await supabase
        .from('work_orders')
        .insert([{ ...workOrder, work_order_number: workOrderNumber }])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_orders'] })
    }
  })

  const updateWorkOrderMutation = useMutation({
    mutationFn: async ({ id, ...workOrder }: any) => {
      const { data, error } = await supabase
        .from('work_orders')
        .update(workOrder)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_orders'] })
    }
  })

  const deleteWorkOrderMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('work_orders')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work_orders'] })
    }
  })

  // Additional helper functions
  const convertEstimateToInvoice = async (estimateId: string) => {
    try {
      const estimate = estimates?.find(e => e.id === estimateId)
      if (!estimate) throw new Error('Estimate not found')

      const { data: invoiceNumber } = await supabase.rpc('generate_invoice_number')
      
      const invoice = {
        client_id: estimate.client_id,
        estimate_id: estimateId,
        title: estimate.title,
        description: estimate.description,
        amount: estimate.amount,
        invoice_number: invoiceNumber,
        status: 'pending'
      }

      await createInvoiceMutation.mutateAsync(invoice)
      toast.success('Estimate converted to invoice successfully!')
    } catch (error) {
      console.error('Error converting estimate:', error)
      toast.error('Failed to convert estimate')
    }
  }

  const updateInvoiceStatus = async (invoiceId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', invoiceId)

      if (error) throw error
      
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success('Invoice status updated successfully!')
    } catch (error) {
      console.error('Error updating invoice status:', error)
      toast.error('Failed to update invoice status')
    }
  }

  const generateReceipt = async (invoiceId: string) => {
    try {
      const invoice = invoices?.find(i => i.id === invoiceId)
      if (!invoice) throw new Error('Invoice not found')

      const { data: receiptNumber } = await supabase.rpc('generate_receipt_number')
      
      const receipt = {
        client_id: invoice.client_id,
        invoice_id: invoiceId,
        amount: invoice.amount,
        receipt_number: receiptNumber,
        payment_method: 'Cash'
      }

      await createReceiptMutation.mutateAsync(receipt)
      await updateInvoiceStatus(invoiceId, 'paid')
      toast.success('Receipt generated successfully!')
    } catch (error) {
      console.error('Error generating receipt:', error)
      toast.error('Failed to generate receipt')
    }
  }

  const undoEstimateConversion = async (invoiceId: string) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId)

      if (error) throw error
      
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success('Invoice conversion undone successfully!')
    } catch (error) {
      console.error('Error undoing conversion:', error)
      toast.error('Failed to undo conversion')
    }
  }

  const sendDocumentForSignature = async (documentId: string, clientId: string) => {
    try {
      const signature = {
        document_id: documentId,
        client_id: clientId,
        status: 'pending'
      }

      await createSignatureMutation.mutateAsync(signature)
      toast.success('Document sent for signature successfully!')
    } catch (error) {
      console.error('Error sending document:', error)
      toast.error('Failed to send document')
    }
  }

  const loadData = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] })
    queryClient.invalidateQueries({ queryKey: ['appointments'] })
    queryClient.invalidateQueries({ queryKey: ['invoices'] })
    queryClient.invalidateQueries({ queryKey: ['estimates'] })
    queryClient.invalidateQueries({ queryKey: ['receipts'] })
    queryClient.invalidateQueries({ queryKey: ['contracts'] })
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    queryClient.invalidateQueries({ queryKey: ['signatures'] })
    queryClient.invalidateQueries({ queryKey: ['work_orders'] })
  }

  return {
    // Data
    clients,
    allClients: clients || [],
    appointments: appointments || [],
    invoices,
    estimates,
    receipts,
    contracts,
    documents,
    signatures,
    workOrders,
    
    // Filter states
    selectedClientId,
    setSelectedClientId,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    
    // Loading states
    loading: clientsLoading || appointmentsLoading || invoicesLoading || estimatesLoading || receiptsLoading || contractsLoading || documentsLoading || signaturesLoading || workOrdersLoading,
    
    // Actions
    createClient: createClientMutation.mutateAsync,
    createInvoice: createInvoiceMutation.mutateAsync,
    createEstimate: createEstimateMutation.mutateAsync,
    createReceipt: createReceiptMutation.mutateAsync,
    createContract: createContractMutation.mutateAsync,
    updateContract: updateContractMutation.mutateAsync,
    deleteContract: deleteContractMutation.mutateAsync,
    createDocument: createDocumentMutation.mutateAsync,
    createSignature: createSignatureMutation.mutateAsync,
    createWorkOrder: createWorkOrderMutation.mutateAsync,
    updateWorkOrder: updateWorkOrderMutation.mutateAsync,
    deleteWorkOrder: deleteWorkOrderMutation.mutateAsync,
    
    // Helper functions
    convertEstimateToInvoice,
    updateInvoiceStatus,
    generateReceipt,
    undoEstimateConversion,
    sendDocumentForSignature,
    loadData
  }
}
