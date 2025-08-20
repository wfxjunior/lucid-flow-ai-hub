-- Fix meeting_attendees table security issues
-- Drop existing policies to recreate them with proper restrictions
DROP POLICY IF EXISTS "Attendees can view only their own attendance records" ON public.meeting_attendees;
DROP POLICY IF EXISTS "Only meeting organizers can manage attendees" ON public.meeting_attendees;

-- Ensure RLS is enabled
ALTER TABLE public.meeting_attendees ENABLE ROW LEVEL SECURITY;

-- Create restrictive SELECT policy: Only authenticated users can view
-- Either they are the meeting organizer OR they are the specific attendee (by email)
CREATE POLICY "meeting_attendees_select_policy" ON public.meeting_attendees
FOR SELECT 
TO authenticated
USING (
  -- User is the meeting organizer
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
  OR
  -- User is the specific attendee (email matches their auth email)
  (
    meeting_attendees.email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  )
);

-- Create restrictive INSERT policy: Only meeting organizers can add attendees
CREATE POLICY "meeting_attendees_insert_policy" ON public.meeting_attendees
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- Create restrictive UPDATE policy: Only meeting organizers can update attendees
CREATE POLICY "meeting_attendees_update_policy" ON public.meeting_attendees
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- Create restrictive DELETE policy: Only meeting organizers can delete attendees
CREATE POLICY "meeting_attendees_delete_policy" ON public.meeting_attendees
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.meetings 
    WHERE meetings.id = meeting_attendees.meeting_id 
    AND meetings.user_id = auth.uid()
  )
);

-- Deny all access to anonymous users by default (no policies for anon role)
-- This ensures no public access to meeting attendee data