
import type { Invoice, WorkOrderWithClient, Estimate, Contract, Client } from './types'

export function useBusinessAnalytics(
  invoices?: Invoice[],
  workOrders?: WorkOrderWithClient[],
  estimates?: Estimate[],
  contracts?: Contract[],
  clients?: Client[]
) {
  const totalRevenue = invoices?.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + Number(inv.amount), 0) || 0
  const monthlyRevenue = totalRevenue // Simplified for now
  const completedWorkOrders = workOrders?.filter(wo => wo.status === 'completed').length || 0
  const estimatesSent = estimates?.filter(est => est.status === 'sent').length || 0
  const contractsSigned = contracts?.filter(c => c.status === 'signed').length || 0
  const activeClients = clients?.filter(c => c.status === 'active').length || 0

  return {
    totalRevenue,
    monthlyRevenue,
    completedWorkOrders,
    estimatesSent,
    contractsSigned,
    activeClients
  }
}
