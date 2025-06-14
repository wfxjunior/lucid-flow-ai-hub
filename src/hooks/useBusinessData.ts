
import { useWorkOrdersQuery } from './business/useWorkOrdersQuery'
import { useClientsQuery } from './business/useClientsQuery'
import { useInvoicesQuery } from './business/useInvoicesQuery'
import { useAppointmentsQuery } from './business/useAppointmentsQuery'
import { useContractsQuery } from './business/useContractsQuery'
import { useDocumentsQuery } from './business/useDocumentsQuery'
import { useEstimatesQuery } from './business/useEstimatesQuery'
import { useSignaturesQuery } from './business/useSignaturesQuery'
import { useMeetingsQuery } from './business/useMeetingsQuery'
import { useBusinessMutations } from './business/useBusinessMutations'
import { useBusinessAnalytics } from './business/useBusinessAnalytics'

export function useBusinessData() {
  // Query hooks
  const { data: workOrders, isLoading: workOrdersLoading } = useWorkOrdersQuery()
  const { data: clients, isLoading: clientsLoading } = useClientsQuery()
  const { data: invoices, isLoading: invoicesLoading } = useInvoicesQuery()
  const { data: appointments, isLoading: appointmentsLoading } = useAppointmentsQuery()
  const { data: contracts, isLoading: contractsLoading } = useContractsQuery()
  const { data: documents, isLoading: documentsLoading } = useDocumentsQuery()
  const { data: estimates, isLoading: estimatesLoading } = useEstimatesQuery()
  const { data: signatures, isLoading: signaturesLoading } = useSignaturesQuery()
  const { data: meetings, isLoading: meetingsLoading } = useMeetingsQuery()

  // Mutations
  const mutations = useBusinessMutations()

  // Analytics
  const analytics = useBusinessAnalytics(invoices, workOrders, estimates, contracts, clients)

  return {
    // Data
    workOrders,
    clients,
    allClients: clients, // Alias for compatibility
    appointments,
    contracts,
    documents,
    estimates,
    invoices,
    signatures,
    meetings,
    
    // Analytics data
    ...analytics,
    
    // Loading states
    loading: workOrdersLoading || clientsLoading || appointmentsLoading || contractsLoading || documentsLoading || estimatesLoading || signaturesLoading || meetingsLoading || invoicesLoading,
    
    // Actions
    ...mutations
  }
}
