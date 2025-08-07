
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export interface CompanyProfile {
  id: string
  user_id: string
  company_name: string
  address?: string
  phone?: string
  email?: string
  logo_url?: string
  website?: string
  custom_document_titles?: Record<string, string>
  created_at: string
  updated_at: string
}

export function useCompanyData() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCompanyProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) {
        console.error('Error fetching company profile:', error)
        return
      }

      setCompanyProfile(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createOrUpdateCompanyProfile = async (profileData: Omit<CompanyProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      if (companyProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from('company_profiles')
          .update({ ...profileData, updated_at: new Date().toISOString() })
          .eq('id', companyProfile.id)
          .select()
          .single()

        if (error) throw error
        setCompanyProfile(data)
        toast.success('Company profile updated successfully')
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('company_profiles')
          .insert({ ...profileData, user_id: user.id })
          .select()
          .single()

        if (error) throw error
        setCompanyProfile(data)
        toast.success('Company profile created successfully')
      }
    } catch (error: any) {
      console.error('Error saving company profile:', error)
      toast.error('Failed to save company profile')
      throw error
    }
  }

  useEffect(() => {
    fetchCompanyProfile()
  }, [])

  return {
    companyProfile,
    loading,
    createOrUpdateCompanyProfile,
    refreshCompanyProfile: fetchCompanyProfile
  }
}
