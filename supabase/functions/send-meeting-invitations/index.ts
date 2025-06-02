
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MeetingInvitationRequest {
  meetingId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { meetingId }: MeetingInvitationRequest = await req.json();

    // Get meeting details
    const { data: meeting, error: meetingError } = await supabaseClient
      .from('meetings')
      .select(`
        *,
        meeting_attendees (
          id,
          email,
          name,
          status
        )
      `)
      .eq('id', meetingId)
      .single();

    if (meetingError || !meeting) {
      throw new Error('Meeting not found');
    }

    // Format meeting date
    const meetingDate = new Date(meeting.meeting_date);
    const dateStr = meetingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeStr = meetingDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Generate calendar event
    const calendarEvent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FeatherBiz//Meeting Invitation//EN
BEGIN:VEVENT
UID:${meetingId}@featherbiz.com
DTSTART:${meetingDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(meetingDate.getTime() + meeting.duration_minutes * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${meeting.title}
DESCRIPTION:${meeting.description || ''}
LOCATION:${meeting.location || meeting.meeting_url || ''}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    // Send invitations to all attendees
    const invitationPromises = meeting.meeting_attendees.map(async (attendee: any) => {
      const emailContent = `
        <h2>Meeting Invitation: ${meeting.title}</h2>
        <p>Hello ${attendee.name},</p>
        <p>You are invited to attend the following meeting:</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>${meeting.title}</h3>
          ${meeting.description ? `<p><strong>Description:</strong> ${meeting.description}</p>` : ''}
          <p><strong>Date:</strong> ${dateStr}</p>
          <p><strong>Time:</strong> ${timeStr}</p>
          <p><strong>Duration:</strong> ${meeting.duration_minutes} minutes</p>
          <p><strong>Platform:</strong> ${meeting.meeting_platform}</p>
          ${meeting.meeting_url ? `<p><strong>Join URL:</strong> <a href="${meeting.meeting_url}">${meeting.meeting_url}</a></p>` : ''}
          ${meeting.meeting_password ? `<p><strong>Password:</strong> ${meeting.meeting_password}</p>` : ''}
          ${meeting.location ? `<p><strong>Location:</strong> ${meeting.location}</p>` : ''}
        </div>

        ${meeting.notes ? `<p><strong>Notes:</strong> ${meeting.notes}</p>` : ''}
        
        <p>Please save this invitation to your calendar and join on time.</p>
        
        <p>Best regards,<br>FeatherBiz Team</p>
      `;

      return resend.emails.send({
        from: "FeatherBiz <noreply@featherbiz.com>",
        to: [attendee.email],
        subject: `Meeting Invitation: ${meeting.title}`,
        html: emailContent,
        attachments: [
          {
            filename: "meeting.ics",
            content: Buffer.from(calendarEvent).toString('base64'),
            contentType: "text/calendar"
          }
        ]
      });
    });

    const results = await Promise.allSettled(invitationPromises);
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Invitation sent to ${meeting.meeting_attendees[index].email}`);
      } else {
        console.error(`Failed to send invitation to ${meeting.meeting_attendees[index].email}:`, result.reason);
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        sent: results.filter(r => r.status === 'fulfilled').length,
        failed: results.filter(r => r.status === 'rejected').length
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-meeting-invitations function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
