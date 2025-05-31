
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function useEstimateData() {
  const queryClient = useQueryClient()

  // Get user settings
  const { data: userSettings } = useQuery({
    queryKey: ['userSettings'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .single()
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user settings:', error)
          throw error
        }
        return data
      } catch (error) {
        console.error('Error in userSettings query:', error)
        return null
      }
    }
  })

  // Get estimates with client data
  const { data: estimates, isLoading: estimatesLoading } = useQuery({
    queryKey: ['estimates'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('estimates')
          .select(`
            *,
            client:clients(*)
          `)
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching estimates:', error)
          throw error
        }
        return data || []
      } catch (error) {
        console.error('Error in estimates query:', error)
        return []
      }
    }
  })

  // Create or update user settings
  const updateUserSettingsMutation = useMutation({
    mutationFn: async (settings: any) => {
      try {
        const { data: user } = await supabase.auth.getUser()
        if (!user.user) throw new Error('User not authenticated')

        const { data, error } = await supabase
          .from('user_settings')
          .upsert({
            user_id: user.user.id,
            ...settings
          })
          .select()
          .single()
        
        if (error) {
          console.error('Error updating user settings:', error)
          throw error
        }
        return data
      } catch (error) {
        console.error('Error in updateUserSettings mutation:', error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] })
    }
  })

  // Generate estimate number
  const generateEstimateNumber = async () => {
    try {
      const startingNumber = userSettings?.estimate_number_start || 1
      const { data, error } = await supabase.rpc('generate_estimate_number', {
        starting_number: startingNumber
      })
      
      if (error) {
        console.error('Error generating estimate number:', error)
        throw error
      }
      return data
    } catch (error) {
      console.error('Error in generateEstimateNumber:', error)
      throw error
    }
  }

  // Create estimate
  const createEstimateMutation = useMutation({
    mutationFn: async (estimate: any) => {
      try {
        const { data: user } = await supabase.auth.getUser()
        if (!user.user) throw new Error('User not authenticated')

        const estimateNumber = await generateEstimateNumber()
        
        const { data, error } = await supabase
          .from('estimates')
          .insert([{
            ...estimate,
            estimate_number: estimateNumber,
            user_id: user.user.id
          }])
          .select()
          .single()
        
        if (error) {
          console.error('Error creating estimate:', error)
          throw error
        }
        return data
      } catch (error) {
        console.error('Error in createEstimate mutation:', error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    }
  })

  // Update estimate status
  const updateEstimateStatusMutation = useMutation({
    mutationFn: async ({ id, status, timestamp_field }: { id: string, status: string, timestamp_field?: string }) => {
      try {
        const updateData: any = { status }
        
        if (timestamp_field) {
          updateData[timestamp_field] = new Date().toISOString()
          
          // Update signature status based on the timestamp field
          if (timestamp_field === 'signed_at') {
            updateData.signature_status = 'signed'
          } else if (timestamp_field === 'declined_at') {
            updateData.signature_status = 'declined'
          }
        }

        const { data, error } = await supabase
          .from('estimates')
          .update(updateData)
          .eq('id', id)
          .select()
          .single()
        
        if (error) {
          console.error('Error updating estimate status:', error)
          throw error
        }
        return data
      } catch (error) {
        console.error('Error in updateEstimateStatus mutation:', error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    }
  })

  // Mark estimate as viewed
  const markEstimateViewed = async (estimateId: string) => {
    try {
      const { error } = await supabase
        .from('estimates')
        .update({ viewed_at: new Date().toISOString() })
        .eq('id', estimateId)

      if (error) {
        console.error('Error marking estimate as viewed:', error)
        throw error
      }
      
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    } catch (error) {
      console.error('Error in markEstimateViewed:', error)
      throw error
    }
  }

  return {
    estimates: estimates || [],
    userSettings,
    loading: estimatesLoading,
    createEstimate: createEstimateMutation.mutateAsync,
    updateEstimateStatus: updateEstimateStatusMutation.mutateAsync,
    updateUserSettings: updateUserSettingsMutation.mutateAsync,
    markEstimateViewed,
    generateEstimateNumber
  }
}
