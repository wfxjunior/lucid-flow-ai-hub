
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface AppointmentFilters {
  page?: number
  limit?: number
  status?: string
  client_id?: string
  from?: string
  to?: string
}

interface AppointmentData {
  client_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes?: number
  location?: string
  notes?: string
  status?: string
}

export function useAppointmentsAPI() {
  const [loading, setLoading] = useState(false)

  const getAuthHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) {
      throw new Error('No authentication token available')
    }
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    }
  }

  const getAppointments = async (filters: AppointmentFilters = {}) => {
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      const response = await supabase.functions.invoke('appointments-api', {
        method: 'GET',
        headers,
        body: params.toString() ? `?${params.toString()}` : undefined
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      return response.data
    } catch (error: any) {
      toast.error(`Erro ao buscar appointments: ${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getAppointment = async (id: string) => {
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      
      const response = await supabase.functions.invoke('appointments-api', {
        method: 'GET',
        headers,
        body: `/${id}`
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      return response.data
    } catch (error: any) {
      toast.error(`Erro ao buscar appointment: ${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData: AppointmentData) => {
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      
      const response = await supabase.functions.invoke('appointments-api', {
        method: 'POST',
        headers,
        body: JSON.stringify(appointmentData)
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      toast.success('Appointment criado com sucesso!')
      return response.data
    } catch (error: any) {
      toast.error(`Erro ao criar appointment: ${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateAppointment = async (id: string, appointmentData: Partial<AppointmentData>) => {
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      
      const response = await supabase.functions.invoke('appointments-api', {
        method: 'PUT',
        headers,
        body: JSON.stringify(appointmentData),
        body: `/${id}`
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      toast.success('Appointment atualizado com sucesso!')
      return response.data
    } catch (error: any) {
      toast.error(`Erro ao atualizar appointment: ${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteAppointment = async (id: string) => {
    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      
      const response = await supabase.functions.invoke('appointments-api', {
        method: 'DELETE',
        headers,
        body: `/${id}`
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      toast.success('Appointment deletado com sucesso!')
      return response.data
    } catch (error: any) {
      toast.error(`Erro ao deletar appointment: ${error.message}`)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
  }
}
