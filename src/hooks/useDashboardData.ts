
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const fetchDashboardData = async () => {
      if (!isMounted) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.log('useDashboardData: No user found, showing empty state');
          if (isMounted) {
            setStats({
              monthlyRevenue: 0,
              activeCustomers: 0,
              pendingInvoices: 0,
              monthlyGoals: 0,
              recentActivities: [],
              upcomingTasks: []
            });
          }
          return;
        }

        // Fetch all data with error handling for each query
        const [invoicesResult, clientsResult, appointmentsResult] = await Promise.allSettled([
          supabase
            .from('invoices')
            .select('amount, status, created_at')
            .eq('user_id', user.id),
          supabase
            .from('clients')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('status', 'active'),
          supabase
            .from('appointments')
            .select('title, appointment_date, status')
            .eq('user_id', user.id)
            .eq('status', 'scheduled')
            .gte('appointment_date', new Date().toISOString())
            .order('appointment_date', { ascending: true })
            .limit(4)
        ]);

        const invoices = invoicesResult.status === 'fulfilled' ? invoicesResult.value.data || [] : [];
        const clients = clientsResult.status === 'fulfilled' ? clientsResult.value.data || [] : [];
        const appointments = appointmentsResult.status === 'fulfilled' ? appointmentsResult.value.data || [] : [];

        // Calculate metrics safely
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = invoices
          .filter(invoice => {
            const invoiceDate = new Date(invoice.created_at);
            return invoiceDate.getMonth() === currentMonth && 
                   invoiceDate.getFullYear() === currentYear &&
                   invoice.status === 'paid';
          })
          .reduce((sum, invoice) => sum + Number(invoice.amount || 0), 0);

        const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;

        const recentInvoices = invoices
          .filter(invoice => invoice.status === 'paid')
          .slice(0, 2)
          .map((invoice, index) => ({
            id: index + 1,
            action: `Invoice paid: $${Number(invoice.amount || 0).toFixed(2)}`,
            time: new Date(invoice.created_at).toLocaleDateString(),
            type: 'payment'
          }));

        const recentAppointments = appointments
          .slice(0, 2)
          .map((appointment, index) => ({
            id: index + 3,
            action: `Appointment scheduled: ${appointment.title}`,
            time: new Date(appointment.appointment_date).toLocaleDateString(),
            type: 'appointment'
          }));

        const upcomingTasks = appointments.map((appointment, index) => ({
          id: index + 1,
          title: appointment.title,
          due: new Date(appointment.appointment_date).toLocaleDateString(),
          priority: 'medium'
        }));

        const monthlyGoalTarget = 15000;
        const goalProgress = monthlyRevenue > 0 ? Math.min(100, Math.round((monthlyRevenue / monthlyGoalTarget) * 100)) : 0;

        if (isMounted) {
          setStats({
            monthlyRevenue,
            activeCustomers: clients.length,
            pendingInvoices,
            monthlyGoals: goalProgress,
            recentActivities: [...recentInvoices, ...recentAppointments],
            upcomingTasks
          });
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (isMounted) {
          setError('Failed to load dashboard data');
          setStats({
            monthlyRevenue: 0,
            activeCustomers: 0,
            pendingInvoices: 0,
            monthlyGoals: 0,
            recentActivities: [],
            upcomingTasks: []
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Debounced fetch to prevent rapid re-fetching
    const debouncedFetch = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchDashboardData, 300);
    };

    debouncedFetch();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const refreshData = () => {
    setLoading(true)
    setError(null)
    // Re-trigger the effect
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return { stats, loading, error, refreshData }
}
