import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Client, Estimate, Invoice, Receipt, Appointment, Contract, Document, Signature, FilterStatus, FilterType } from '@/types/business'

export function useBusinessData() {
  const [clients, setClients] = useState<Client[]>([])
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [signatures, setSignatures] = useState<Signature[]>([])
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)

  // Load all data including new tables
  const loadData = async () => {
    try {
      setLoading(true)
      
      // Load clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (clientsError) throw clientsError
      setClients(clientsData as Client[] || [])

      // Load estimates with client data
      const { data: estimatesData, error: estimatesError } = await supabase
        .from('estimates')
        .select(`
          *,
          client:clients(*)
        `)
        .order('created_at', { ascending: false })

      if (estimatesError) throw estimatesError
      setEstimates(estimatesData as Estimate[] || [])

      // Load invoices with client and estimate data
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select(`
          *,
          client:clients(*),
          estimate:estimates(*)
        `)
        .order('created_at', { ascending: false })

      if (invoicesError) throw invoicesError
      setInvoices(invoicesData as Invoice[] || [])

      // Load receipts with client and invoice data
      const { data: receiptsData, error: receiptsError } = await supabase
        .from('receipts')
        .select(`
          *,
          client:clients(*),
          invoice:invoices(*)
        `)
        .order('created_at', { ascending: false })

      if (receiptsError) throw receiptsError
      setReceipts(receiptsData as Receipt[] || [])

      // Load appointments with client data
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          *,
          client:clients(*)
        `)
        .order('appointment_date', { ascending: true })

      if (appointmentsError) throw appointmentsError
      setAppointments(appointmentsData as Appointment[] || [])

      // Load contracts
      const { data: contractsData, error: contractsError } = await supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })

      if (contractsError) throw contractsError
      setContracts(contractsData as Contract[] || [])

      // Load documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (documentsError) throw documentsError
      setDocuments(documentsData as Document[] || [])

      // Load signatures with related data
      const { data: signaturesData, error: signaturesError } = await supabase
        .from('signatures')
        .select(`
          *,
          client:clients(*),
          document:documents(*)
        `)
        .order('created_at', { ascending: false })

      if (signaturesError) throw signaturesError
      setSignatures(signaturesData as Signature[] || [])

    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Contract functions
  const createContract = async (contractData: Omit<Contract, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .insert([{
          ...contractData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single()

      if (error) throw error
      
      setContracts(prev => [data as Contract, ...prev])
      toast.success('Contract created successfully')
      return data as Contract
    } catch (error) {
      console.error('Error creating contract:', error)
      toast.error('Failed to create contract')
      throw error
    }
  }

  const updateContract = async (id: string, updates: Partial<Contract>) => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setContracts(prev => prev.map(contract => contract.id === id ? data as Contract : contract))
      toast.success('Contract updated successfully')
      return data as Contract
    } catch (error) {
      console.error('Error updating contract:', error)
      toast.error('Failed to update contract')
      throw error
    }
  }

  const deleteContract = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setContracts(prev => prev.filter(contract => contract.id !== id))
      toast.success('Contract deleted successfully')
    } catch (error) {
      console.error('Error deleting contract:', error)
      toast.error('Failed to delete contract')
      throw error
    }
  }

  // Document functions
  const createDocument = async (documentData: Omit<Document, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([{
          ...documentData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single()

      if (error) throw error
      
      setDocuments(prev => [data as Document, ...prev])
      toast.success('Document created successfully')
      return data as Document
    } catch (error) {
      console.error('Error creating document:', error)
      toast.error('Failed to create document')
      throw error
    }
  }

  // Signature functions
  const sendDocumentForSignature = async (documentId: string, clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('signatures')
        .insert([{
          document_id: documentId,
          client_id: clientId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          status: 'pending'
        }])
        .select(`
          *,
          client:clients(*),
          document:documents(*)
        `)
        .single()

      if (error) throw error
      
      setSignatures(prev => [data as Signature, ...prev])
      
      // Update document status
      await supabase
        .from('documents')
        .update({ status: 'sent' })
        .eq('id', documentId)

      setDocuments(prev => prev.map(doc => 
        doc.id === documentId ? { ...doc, status: 'sent' as const } : doc
      ))

      toast.success('Document sent for signature successfully')
      return data as Signature
    } catch (error) {
      console.error('Error sending document for signature:', error)
      toast.error('Failed to send document for signature')
      throw error
    }
  }

  // Create client
  const createClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          ...clientData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single()

      if (error) throw error
      
      setClients(prev => [data as Client, ...prev])
      toast.success('Client created successfully')
      return data as Client
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Failed to create client')
      throw error
    }
  }

  // Update client
  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      setClients(prev => prev.map(client => client.id === id ? data as Client : client))
      toast.success('Client updated successfully')
      return data as Client
    } catch (error) {
      console.error('Error updating client:', error)
      toast.error('Failed to update client')
      throw error
    }
  }

  // Create estimate
  const createEstimate = async (estimateData: Omit<Estimate, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('estimates')
        .insert([{
          ...estimateData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select(`
          *,
          client:clients(*)
        `)
        .single()

      if (error) throw error
      
      setEstimates(prev => [data as Estimate, ...prev])
      toast.success('Estimate created successfully')
      return data as Estimate
    } catch (error) {
      console.error('Error creating estimate:', error)
      toast.error('Failed to create estimate')
      throw error
    }
  }

  // Convert estimate to invoice
  const convertEstimateToInvoice = async (estimateId: string) => {
    try {
      const estimate = estimates.find(e => e.id === estimateId)
      if (!estimate) throw new Error('Estimate not found')

      // Generate invoice number
      const { data: invoiceNumber, error: numberError } = await supabase
        .rpc('generate_invoice_number')

      if (numberError) throw numberError

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          client_id: estimate.client_id,
          estimate_id: estimateId,
          invoice_number: invoiceNumber,
          title: estimate.title,
          description: estimate.description,
          amount: estimate.amount,
          status: 'pending' as const,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select(`
          *,
          client:clients(*),
          estimate:estimates(*)
        `)
        .single()

      if (invoiceError) throw invoiceError

      // Update estimate status
      const { error: updateError } = await supabase
        .from('estimates')
        .update({ status: 'converted', updated_at: new Date().toISOString() })
        .eq('id', estimateId)

      if (updateError) throw updateError

      setInvoices(prev => [invoice as Invoice, ...prev])
      setEstimates(prev => prev.map(e => e.id === estimateId ? { ...e, status: 'converted' as const } : e))
      
      toast.success('Estimate converted to invoice successfully')
      return invoice as Invoice
    } catch (error) {
      console.error('Error converting estimate:', error)
      toast.error('Failed to convert estimate to invoice')
      throw error
    }
  }

  // Update invoice status
  const updateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          client:clients(*),
          estimate:estimates(*)
        `)
        .single()

      if (error) throw error
      
      setInvoices(prev => prev.map(invoice => invoice.id === id ? data as Invoice : invoice))
      toast.success('Invoice status updated successfully')
      return data as Invoice
    } catch (error) {
      console.error('Error updating invoice status:', error)
      toast.error('Failed to update invoice status')
      throw error
    }
  }

  // Generate receipt when invoice is paid
  const generateReceipt = async (invoiceId: string, paymentMethod?: string, notes?: string) => {
    try {
      const invoice = invoices.find(i => i.id === invoiceId)
      if (!invoice) throw new Error('Invoice not found')

      // Generate receipt number
      const { data: receiptNumber, error: numberError } = await supabase
        .rpc('generate_receipt_number')

      if (numberError) throw numberError

      // Create receipt
      const { data: receipt, error: receiptError } = await supabase
        .from('receipts')
        .insert([{
          client_id: invoice.client_id,
          invoice_id: invoiceId,
          receipt_number: receiptNumber,
          amount: invoice.amount,
          payment_method: paymentMethod,
          notes: notes,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select(`
          *,
          client:clients(*),
          invoice:invoices(*)
        `)
        .single()

      if (receiptError) throw receiptError

      setReceipts(prev => [receipt as Receipt, ...prev])
      toast.success('Receipt generated successfully')
      return receipt as Receipt
    } catch (error) {
      console.error('Error generating receipt:', error)
      toast.error('Failed to generate receipt')
      throw error
    }
  }

  // Undo estimate conversion
  const undoEstimateConversion = async (estimateId: string) => {
    try {
      // Find and delete the associated invoice
      const invoice = invoices.find(i => i.estimate_id === estimateId)
      if (invoice) {
        const { error: deleteError } = await supabase
          .from('invoices')
          .delete()
          .eq('id', invoice.id)

        if (deleteError) throw deleteError
        setInvoices(prev => prev.filter(i => i.id !== invoice.id))
      }

      // Update estimate status back to approved
      const { error: updateError } = await supabase
        .from('estimates')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', estimateId)

      if (updateError) throw updateError

      setEstimates(prev => prev.map(e => e.id === estimateId ? { ...e, status: 'approved' as const } : e))
      
      toast.success('Estimate conversion undone successfully')
    } catch (error) {
      console.error('Error undoing conversion:', error)
      toast.error('Failed to undo conversion')
      throw error
    }
  }

  // Create appointment
  const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          ...appointmentData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select(`
          *,
          client:clients(*)
        `)
        .single()

      if (error) throw error
      
      setAppointments(prev => [data as Appointment, ...prev])
      toast.success('Appointment created successfully')
      return data as Appointment
    } catch (error) {
      console.error('Error creating appointment:', error)
      toast.error('Failed to create appointment')
      throw error
    }
  }

  // Update appointment status
  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select(`
          *,
          client:clients(*)
        `)
        .single()

      if (error) throw error
      
      setAppointments(prev => prev.map(appointment => appointment.id === id ? data as Appointment : appointment))
      toast.success('Appointment status updated successfully')
      return data as Appointment
    } catch (error) {
      console.error('Error updating appointment status:', error)
      toast.error('Failed to update appointment status')
      throw error
    }
  }

  // Filtered data based on selected client and filters
  const filteredEstimates = estimates.filter(estimate => {
    if (selectedClientId && estimate.client_id !== selectedClientId) return false
    if (statusFilter !== 'all' && estimate.status !== statusFilter) return false
    if (typeFilter !== 'all' && typeFilter !== 'estimates') return false
    return true
  })

  const filteredInvoices = invoices.filter(invoice => {
    if (selectedClientId && invoice.client_id !== selectedClientId) return false
    if (statusFilter !== 'all' && invoice.status !== statusFilter) return false
    if (typeFilter !== 'all' && typeFilter !== 'invoices') return false
    return true
  })

  const filteredReceipts = receipts.filter(receipt => {
    if (selectedClientId && receipt.client_id !== selectedClientId) return false
    if (typeFilter !== 'all' && typeFilter !== 'receipts') return false
    return true
  })

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedClientId && appointment.client_id !== selectedClientId) return false
    if (statusFilter !== 'all' && appointment.status !== statusFilter) return false
    if (typeFilter !== 'all' && typeFilter !== 'appointments') return false
    return true
  })

  const filteredClients = clients.filter(client => {
    if (statusFilter !== 'all' && client.status !== statusFilter) return false
    return true
  })

  useEffect(() => {
    loadData()
  }, [])

  return {
    // Data
    clients: filteredClients,
    estimates: filteredEstimates,
    invoices: filteredInvoices,
    receipts: filteredReceipts,
    appointments: filteredAppointments,
    allClients: clients,
    
    // Filters
    selectedClientId,
    setSelectedClientId,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    
    // Actions
    createClient,
    updateClient,
    createEstimate,
    convertEstimateToInvoice,
    updateInvoiceStatus,
    generateReceipt,
    undoEstimateConversion,
    createAppointment,
    updateAppointmentStatus,
    
    // Utilities
    loading,
    loadData,
    contracts,
    documents,
    signatures,
    createContract,
    updateContract,
    deleteContract,
    createDocument,
    sendDocumentForSignature
  }
}
