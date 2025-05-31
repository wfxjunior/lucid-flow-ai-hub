
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function useEstimateData() {
  const queryClient = useQueryClient()

  // Get user settings
  const { data: userSettings } = useQuery({
    queryKey: ['userSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data
    }
  })

  // Get estimates with client data
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

  // Create or update user settings
  const updateUserSettingsMutation = useMutation({
    mutationFn: async (settings: any) => {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...settings
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings'] })
    }
  })

  // Generate estimate number
  const generateEstimateNumber = async () => {
    const startingNumber = userSettings?.estimate_number_start || 1
    const { data, error } = await supabase.rpc('generate_estimate_number', {
      starting_number: startingNumber
    })
    
    if (error) throw error
    return data
  }

  // Create estimate
  const createEstimateMutation = useMutation({
    mutationFn: async (estimate: any) => {
      const estimateNumber = await generateEstimateNumber()
      
      const { data, error } = await supabase
        .from('estimates')
        .insert([{
          ...estimate,
          estimate_number: estimateNumber,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    }
  })

  // Update estimate status
  const updateEstimateStatusMutation = useMutation({
    mutationFn: async ({ id, status, timestamp_field }: { id: string, status: string, timestamp_field?: string }) => {
      const updateData: any = { status }
      
      if (timestamp_field) {
        updateData[timestamp_field] = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('estimates')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    }
  })

  // Mark estimate as viewed
  const markEstimateViewed = async (estimateId: string) => {
    const { error } = await supabase
      .from('estimates')
      .update({ viewed_at: new Date().toISOString() })
      .eq('id', estimateId)

    if (error) throw error
    queryClient.invalidateQueries({ queryKey: ['estimates'] })
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
