import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function useBusinessData() {
  const queryClient = useQueryClient()

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

  // Estimates
  const { data: estimates, isLoading: estimatesLoading } = useQuery({
    queryKey: ['estimates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('estimates')
        .select('*')
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

  return {
    // Data
    clients,
    invoices,
    estimates,
    receipts,
    contracts,
    documents,
    signatures,
    
    // Loading states
    loading: clientsLoading || invoicesLoading || estimatesLoading || receiptsLoading || contractsLoading || documentsLoading || signaturesLoading,
    
    // Actions
    createClient: createClientMutation.mutateAsync,
    createInvoice: createInvoiceMutation.mutateAsync,
    createEstimate: createEstimateMutation.mutateAsync,
    createReceipt: createReceiptMutation.mutateAsync,
    createContract: createContractMutation.mutateAsync,
    updateContract: updateContractMutation.mutateAsync,
    deleteContract: deleteContractMutation.mutateAsync,
    createDocument: createDocumentMutation.mutateAsync,
    createSignature: createSignatureMutation.mutateAsync
  }
}
