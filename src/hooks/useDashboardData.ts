
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface DashboardStats {
  monthlyRevenue: number
  activeCustomers: number
  pendingInvoices: number
  monthlyGoals: number
  recentActivities: Array<{
    id: number
    action: string
    time: string
    type: string
  }>
  upcomingTasks: Array<{
    id: number
    title: string
    due: string
    priority: string
  }>
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats>({
    monthlyRevenue: 0,
    activeCustomers: 0,
    pendingInvoices: 0,
    monthlyGoals: 0,
    recentActivities: [],
    upcomingTasks: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          // Provide realistic starter data for non-authenticated users
          setStats({
            monthlyRevenue: 0,
            activeCustomers: 0,
            pendingInvoices: 0,
            monthlyGoals: 0,
            recentActivities: [
              { id: 1, action: "Welcome to FeatherBiz!", time: "Just now", type: "system" },
              { id: 2, action: "Complete your profile setup", time: "Just now", type: "task" }
            ],
            upcomingTasks: [
              { id: 1, title: "Set up your first client", due: "Today", priority: "high" },
              { id: 2, title: "Create your first invoice", due: "This week", priority: "medium" }
            ]
          })
          setLoading(false)
          return
        }

        // Fetch invoices for revenue calculation
        const { data: invoices, error: invoicesError } = await supabase
          .from('invoices')
          .select('amount, status, created_at')
          .eq('user_id', user.id)

        if (invoicesError) throw invoicesError

        // Fetch clients for active customers count
        const { data: clients, error: clientsError } = await supabase
          .from('clients')
          .select('id, status')
          .eq('user_id', user.id)
          .eq('status', 'active')

        if (clientsError) throw clientsError

        // Fetch appointments for upcoming tasks
        const { data: appointments, error: appointmentsError } = await supabase
          .from('appointments')
          .select('title, appointment_date, status')
          .eq('user_id', user.id)
          .eq('status', 'scheduled')
          .gte('appointment_date', new Date().toISOString())
          .order('appointment_date', { ascending: true })
          .limit(4)

        if (appointmentsError) throw appointmentsError

        // Calculate monthly revenue (current month)
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        const monthlyRevenue = invoices
          ?.filter(invoice => {
            const invoiceDate = new Date(invoice.created_at)
            return invoiceDate.getMonth() === currentMonth && 
                   invoiceDate.getFullYear() === currentYear &&
                   invoice.status === 'paid'
          })
          .reduce((sum, invoice) => sum + Number(invoice.amount), 0) || 0

        // Count pending invoices
        const pendingInvoices = invoices?.filter(invoice => invoice.status === 'pending').length || 0

        // Recent activities from invoices and appointments
        const recentInvoices = invoices
          ?.filter(invoice => invoice.status === 'paid')
          .slice(0, 2)
          .map((invoice, index) => ({
            id: index + 1,
            action: `Invoice paid: $${Number(invoice.amount).toFixed(2)}`,
            time: new Date(invoice.created_at).toLocaleDateString(),
            type: 'payment'
          })) || []

        const recentAppointments = appointments
          ?.slice(0, 2)
          .map((appointment, index) => ({
            id: index + 3,
            action: `Appointment scheduled: ${appointment.title}`,
            time: new Date(appointment.appointment_date).toLocaleDateString(),
            type: 'appointment'
          })) || []

        // Upcoming tasks from appointments
        const upcomingTasks = appointments?.map((appointment, index) => ({
          id: index + 1,
          title: appointment.title,
          due: new Date(appointment.appointment_date).toLocaleDateString(),
          priority: 'medium'
        })) || []

        // Calculate monthly goals progress
        const monthlyGoalTarget = 5000 // $5,000 monthly target
        const goalProgress = monthlyRevenue > 0 ? Math.min(100, Math.round((monthlyRevenue / monthlyGoalTarget) * 100)) : 0

        setStats({
          monthlyRevenue,
          activeCustomers: clients?.length || 0,
          pendingInvoices,
          monthlyGoals: goalProgress,
          recentActivities: [...recentInvoices, ...recentAppointments],
          upcomingTasks
        })

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const refreshData = () => {
    setLoading(true)
    setError(null)
    // Re-trigger the effect
    window.location.reload()
  }

  return { stats, loading, error, refreshData }
}
