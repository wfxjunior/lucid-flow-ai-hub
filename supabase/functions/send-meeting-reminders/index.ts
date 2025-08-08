
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const now = new Date();
    
    // Calculate time windows for different reminder types
    const reminderWindows = {
      '1_day': new Date(now.getTime() + 24 * 60 * 60 * 1000), // 1 day from now
      '1_hour': new Date(now.getTime() + 60 * 60 * 1000), // 1 hour from now
      '30_min': new Date(now.getTime() + 30 * 60 * 1000), // 30 minutes from now
      '15_min': new Date(now.getTime() + 15 * 60 * 1000)  // 15 minutes from now
    };

    let totalSent = 0;

    // Process each reminder type
    for (const [reminderType, targetTime] of Object.entries(reminderWindows)) {
      // Find meetings that need reminders
      const { data: meetings, error: meetingsError } = await supabaseClient
        .from('meetings')
        .select(`
          *,
          meeting_attendees (
            id,
            email,
            name
          ),
          meeting_reminders!inner (
            id,
            reminder_type,
            status
          )
        `)
        .eq('status', 'scheduled')
        .eq('meeting_reminders.reminder_type', reminderType)
        .eq('meeting_reminders.status', 'pending')
        .gte('meeting_date', now.toISOString())
        .lte('meeting_date', targetTime.toISOString());

      if (meetingsError) {
        console.error(`Error fetching meetings for ${reminderType}:`, meetingsError);
        continue;
      }

      // Send reminders for each meeting
      for (const meeting of meetings || []) {
        try {
          const meetingDate = new Date(meeting.meeting_date);
          const timeUntilMeeting = Math.round((meetingDate.getTime() - now.getTime()) / (1000 * 60));
          
          let reminderMessage = '';
          switch (reminderType) {
            case '1_day':
              reminderMessage = 'Your meeting is scheduled for tomorrow';
              break;
            case '1_hour':
              reminderMessage = 'Your meeting starts in 1 hour';
              break;
            case '30_min':
              reminderMessage = 'Your meeting starts in 30 minutes';
              break;
            case '15_min':
              reminderMessage = 'Your meeting starts in 15 minutes';
              break;
          }

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

          // Send reminder to each attendee
          const reminderPromises = meeting.meeting_attendees.map((attendee: any) => {
            const emailContent = `
              <h2>Meeting Reminder: ${meeting.title}</h2>
              <p>Hello ${attendee.name},</p>
              <p>${reminderMessage}:</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>${meeting.title}</h3>
                <p><strong>Date:</strong> ${dateStr}</p>
                <p><strong>Time:</strong> ${timeStr}</p>
                <p><strong>Duration:</strong> ${meeting.duration_minutes} minutes</p>
                ${meeting.meeting_url ? `<p><strong>Join URL:</strong> <a href="${meeting.meeting_url}" style="color: #007bff;">${meeting.meeting_url}</a></p>` : ''}
                ${meeting.meeting_password ? `<p><strong>Password:</strong> ${meeting.meeting_password}</p>` : ''}
                ${meeting.location ? `<p><strong>Location:</strong> ${meeting.location}</p>` : ''}
              </div>

              ${reminderType === '15_min' || reminderType === '30_min' ? 
                `<p><strong>Action needed:</strong> Please join the meeting now or be ready to join soon.</p>` : 
                `<p>Please make sure you're prepared and have the meeting details saved.</p>`
              }
              
              <p>Best regards,<br>FeatherBiz Team</p>
            `;

            return resend.emails.send({
              from: "FeatherBiz <noreply@featherbiz.io>",
              to: [attendee.email],
              subject: `Reminder: ${meeting.title} ${reminderType === '15_min' ? '(Starting Soon!)' : ''}`,
              html: emailContent
            });
          });

          await Promise.allSettled(reminderPromises);

          // Mark reminders as sent
          const { error: updateError } = await supabaseClient
            .from('meeting_reminders')
            .update({
              status: 'sent',
              sent_at: now.toISOString()
            })
            .eq('meeting_id', meeting.id)
            .eq('reminder_type', reminderType);

          if (updateError) {
            console.error('Error updating reminder status:', updateError);
          } else {
            totalSent += meeting.meeting_attendees.length;
            console.log(`Sent ${reminderType} reminders for meeting: ${meeting.title}`);
          }

        } catch (error) {
          console.error(`Error sending reminders for meeting ${meeting.id}:`, error);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalRemindersSent: totalSent,
        timestamp: now.toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-meeting-reminders function:", error);
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
