
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useQuery } from '@tanstack/react-query'

export interface FeatherForm {
  id: string
  title: string
  description: string | null
  visibility: 'private' | 'team' | 'public'
  is_active: boolean
  created_at: string
  updated_at: string | null
  thank_you_message: string | null
  response_count?: number
  destinations?: string[]
}

export interface FormResponse {
  id: string
  form_id: string
  respondent_name: string | null
  respondent_email: string | null
  response_data: any
  submitted_at: string
  form_title?: string
  status?: string
}

export function useFeatherFormsData() {
  const { data: forms = [], isLoading: formsLoading, error: formsError } = useQuery({
    queryKey: ['feather-forms'],
    queryFn: async () => {
      const { data: formsData, error: formsError } = await supabase
        .from('feather_forms')
        .select(`
          *,
          form_destinations (
            destination_type
          )
        `)
        .order('created_at', { ascending: false })

      if (formsError) throw formsError

      // Get response counts for each form
      const formsWithCounts = await Promise.all(
        formsData.map(async (form) => {
          const { count } = await supabase
            .from('form_responses')
            .select('*', { count: 'exact', head: true })
            .eq('form_id', form.id)

          const destinations = form.form_destinations?.map((d: any) => d.destination_type) || []

          return {
            ...form,
            response_count: count || 0,
            destinations
          }
        })
      )

      return formsWithCounts as FeatherForm[]
    }
  })

  const { data: responses = [], isLoading: responsesLoading } = useQuery({
    queryKey: ['form-responses'],
    queryFn: async () => {
      const { data: responsesData, error: responsesError } = await supabase
        .from('form_responses')
        .select(`
          *,
          feather_forms (
            title
          )
        `)
        .order('submitted_at', { ascending: false })
        .limit(50)

      if (responsesError) throw responsesError

      return responsesData.map((response) => ({
        ...response,
        form_title: response.feather_forms?.title || 'Unknown Form',
        status: 'new' // Default status since it's not in the schema
      })) as FormResponse[]
    }
  })

  const createForm = async (formData: Partial<FeatherForm>) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('feather_forms')
      .insert([{
        title: formData.title || 'New Form',
        description: formData.description || null,
        visibility: formData.visibility || 'private',
        is_active: true,
        user_id: user.id
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  const deleteForm = async (formId: string) => {
    const { error } = await supabase
      .from('feather_forms')
      .delete()
      .eq('id', formId)

    if (error) throw error
  }

  const duplicateForm = async (formId: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get the original form
    const { data: originalForm, error: fetchError } = await supabase
      .from('feather_forms')
      .select('*')
      .eq('id', formId)
      .single()

    if (fetchError) throw fetchError

    // Create duplicate
    const { data, error } = await supabase
      .from('feather_forms')
      .insert([{
        title: `${originalForm.title} (Copy)`,
        description: originalForm.description,
        visibility: originalForm.visibility,
        thank_you_message: originalForm.thank_you_message,
        is_active: true,
        user_id: user.id
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  return {
    forms,
    responses,
    isLoading: formsLoading || responsesLoading,
    error: formsError,
    createForm,
    deleteForm,
    duplicateForm
  }
}
