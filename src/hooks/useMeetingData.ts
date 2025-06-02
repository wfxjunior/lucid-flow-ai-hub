
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface Meeting {
  id: string
  user_id: string
  title: string
  description?: string
  meeting_date: string
  duration_minutes: number
  meeting_platform: string
  meeting_url?: string
  meeting_id?: string
  meeting_password?: string
  location?: string
  notes?: string
  status: string
  created_at: string
  updated_at: string
  attendees?: Array<{
    id: string
    name: string
    email: string
    status: string
    client_id?: string
  }>
  reminders?: Array<{
    id: string
    reminder_type: string
    sent_at?: string
    status: string
  }>
}

export function useMeetingData() {
  const queryClient = useQueryClient()

  // Meetings Query
  const { data: meetings, isLoading: meetingsLoading } = useQuery({
    queryKey: ['meetings'],
    queryFn: async (): Promise<Meeting[]> => {
      // Get meetings
      const { data: meetingsData, error: meetingsError } = await supabase
        .from('meetings')
        .select('*')
        .order('meeting_date', { ascending: true })

      if (meetingsError) {
        console.error('Error fetching meetings:', meetingsError)
        throw meetingsError
      }

      // Get attendees for all meetings
      const { data: attendeesData, error: attendeesError } = await supabase
        .from('meeting_attendees')
        .select('*')

      if (attendeesError) {
        console.error('Error fetching attendees:', attendeesError)
        // Don't throw, just return meetings without attendees
      }

      // Get reminders for all meetings
      const { data: remindersData, error: remindersError } = await supabase
        .from('meeting_reminders')
        .select('*')

      if (remindersError) {
        console.error('Error fetching reminders:', remindersError)
        // Don't throw, just return meetings without reminders
      }

      // Combine data
      return (meetingsData || []).map(meeting => ({
        ...meeting,
        attendees: attendeesData?.filter(a => a.meeting_id === meeting.id) || [],
        reminders: remindersData?.filter(r => r.meeting_id === meeting.id) || []
      }))
    }
  })

  // Create Meeting
  const createMeeting = async (meetingData: any) => {
    const { data: user } = await supabase.auth.getUser()
    
    if (!user.user) {
      throw new Error('User not authenticated')
    }

    // Generate meeting ID
    const { data: meetingNumber } = await supabase.rpc('generate_meeting_number')

    // Create meeting
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .insert([{
        ...meetingData,
        user_id: user.user.id,
        meeting_id: meetingNumber,
        attendees: undefined // Remove attendees from meeting data
      }])
      .select()
      .single()

    if (meetingError) throw meetingError

    // Add attendees
    if (meetingData.attendees && meetingData.attendees.length > 0) {
      const attendeesToInsert = meetingData.attendees.map((attendee: any) => ({
        meeting_id: meeting.id,
        client_id: attendee.client_id || null,
        email: attendee.email,
        name: attendee.name,
        status: 'invited'
      }))

      const { error: attendeesError } = await supabase
        .from('meeting_attendees')
        .insert(attendeesToInsert)

      if (attendeesError) {
        console.error('Error adding attendees:', attendeesError)
        // Don't throw, meeting is created successfully
      }
    }

    // Create automatic reminders
    const reminderTypes = ['1_day', '1_hour', '30_min', '15_min']
    const remindersToInsert = reminderTypes.map(type => ({
      meeting_id: meeting.id,
      reminder_type: type,
      status: 'pending'
    }))

    const { error: remindersError } = await supabase
      .from('meeting_reminders')
      .insert(remindersToInsert)

    if (remindersError) {
      console.error('Error creating reminders:', remindersError)
      // Don't throw, meeting is created successfully
    }

    queryClient.invalidateQueries({ queryKey: ['meetings'] })
    return meeting
  }

  // Update Meeting
  const updateMeeting = async (meetingData: any) => {
    const { data, error } = await supabase
      .from('meetings')
      .update(meetingData)
      .eq('id', meetingData.id)
      .select()
      .single()

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['meetings'] })
    return data
  }

  // Delete Meeting
  const deleteMeeting = async (id: string) => {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id)

    if (error) throw error
    
    queryClient.invalidateQueries({ queryKey: ['meetings'] })
  }

  // Send meeting invitations
  const sendMeetingInvitations = async (meetingId: string) => {
    const { data, error } = await supabase.functions.invoke('send-meeting-invitations', {
      body: { meetingId }
    })

    if (error) throw error
    return data
  }

  return {
    meetings,
    loading: meetingsLoading,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    sendMeetingInvitations
  }
}
