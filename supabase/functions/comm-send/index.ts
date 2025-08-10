import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8"
import sgMail from "npm:@sendgrid/mail@7.7.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

type Channel = "email" | "sms" | "both"

interface AttachmentInput { name: string; url: string; type?: string }

interface SendPayload {
  channel: Channel
  toEmail?: string
  toPhone?: string
  fromEmailId?: string
  fromEmail?: string
  fromName?: string
  templateId?: string
  subject?: string
  html?: string
  text?: string
  attachments?: AttachmentInput[]
  scheduleAt?: string | null
  context?: { type?: string; id?: string }
  clientId?: string | null
}

async function fetchAsBase64(url: string): Promise<{ content: string; type?: string } | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = new Uint8Array(await res.arrayBuffer())
    let binary = ""
    const chunk = 0x8000
    for (let i = 0; i < buf.length; i += chunk) {
      const sub = buf.subarray(i, i + chunk)
      binary += String.fromCharCode.apply(null, Array.from(sub) as any)
    }
    const content = btoa(binary)
    const type = res.headers.get("content-type") || undefined
    return { content, type }
  } catch (e) {
    console.error("Attachment fetch failed:", e)
    return null
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!
  const sendgridKey = Deno.env.get("SENDGRID_API_KEY")

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: req.headers.get("Authorization") || "" } },
  })

  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }

  try {
    const payload: SendPayload = req.method === "GET" ? ({} as any) : await req.json()

    const {
      channel = "email",
      toEmail,
      toPhone,
      fromEmailId,
      fromEmail,
      fromName,
      subject,
      html,
      text,
      attachments = [],
      scheduleAt,
      context = {},
      clientId,
    } = payload

    // Only immediate send in MVP
    if (scheduleAt) {
      console.log("ScheduleAt provided but not supported in MVP; sending now.")
    }

    // Resolve sender
    let resolvedFromEmail = fromEmail || null
    let resolvedFromName = fromName || undefined
    if (!resolvedFromEmail) {
      if (fromEmailId) {
        const { data: sender } = await supabase
          .from("senders_email")
          .select("email,name")
          .eq("id", fromEmailId)
          .eq("user_id", auth.user.id)
          .maybeSingle()
        if (sender) {
          resolvedFromEmail = sender.email
          resolvedFromName = sender.name ?? undefined
        }
      }
      if (!resolvedFromEmail) {
        // fallback to user_email_settings default
        const { data: settings } = await supabase
          .from("user_email_settings")
          .select("from_email,from_name,is_active")
          .eq("user_id", auth.user.id)
          .eq("is_active", true)
          .maybeSingle()
        if (settings?.from_email) {
          resolvedFromEmail = settings.from_email
          resolvedFromName = settings.from_name ?? undefined
        }
      }
    }

    // Prepare base log row (queued)
    const baseLog = {
      user_id: auth.user.id,
      client_id: clientId ?? null,
      channel,
      to_email: toEmail ?? null,
      to_phone: toPhone ?? null,
      from_email: resolvedFromEmail,
      from_name: resolvedFromName ?? null,
      subject: subject ?? null,
      body_html: html ?? null,
      body_text: text ?? null,
      status: "queued",
      context_type: context.type ?? null,
      context_id: context.id ?? null,
      scheduled_at: scheduleAt ? new Date(scheduleAt).toISOString() : null,
      meta: {},
    }

    const { data: queuedLog, error: logErr } = await supabase
      .from("comm_messages")
      .insert(baseLog)
      .select("id")
      .single()

    if (logErr) {
      console.error("Failed to create queued log:", logErr)
    }

    // MVP supports email only
    if (channel === "sms") {
      await supabase
        .from("comm_messages")
        .update({ status: "failed", meta: { reason: "sms_not_implemented" } })
        .eq("id", queuedLog?.id)
      return new Response(JSON.stringify({ success: false, error: "SMS not implemented yet" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!sendgridKey) {
      await supabase
        .from("comm_messages")
        .update({ status: "failed", meta: { reason: "missing_sendgrid_key" } })
        .eq("id", queuedLog?.id)
      return new Response(JSON.stringify({ success: false, error: "Email provider not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!toEmail) {
      await supabase
        .from("comm_messages")
        .update({ status: "failed", meta: { reason: "missing_to_email" } })
        .eq("id", queuedLog?.id)
      return new Response(JSON.stringify({ success: false, error: "Missing recipient email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!resolvedFromEmail) {
      await supabase
        .from("comm_messages")
        .update({ status: "failed", meta: { reason: "missing_from_email" } })
        .eq("id", queuedLog?.id)
      return new Response(JSON.stringify({ success: false, error: "Missing sender email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    sgMail.setApiKey(sendgridKey)

    // Build attachments if any
    const sgAttachments = [] as Array<{ filename: string; content: string; type?: string; disposition?: string }>
    for (const a of attachments) {
      const base64 = await fetchAsBase64(a.url)
      if (base64) {
        sgAttachments.push({ filename: a.name, content: base64.content, type: a.type || base64.type, disposition: "attachment" })
      }
    }

    const msg: any = {
      to: toEmail,
      from: resolvedFromName ? { email: resolvedFromEmail, name: resolvedFromName } : resolvedFromEmail,
      subject: subject || "",
      html: html || undefined,
      text: text || undefined,
      attachments: sgAttachments.length ? sgAttachments : undefined,
    }

    try {
      const [resp] = await sgMail.send(msg)
      const providerId = resp?.headers?.["x-message-id"] || resp?.headers?.["X-Message-Id"] || null

      await supabase
        .from("comm_messages")
        .update({ status: "sent", provider_message_id: providerId, sent_at: new Date().toISOString() })
        .eq("id", queuedLog?.id)

      return new Response(JSON.stringify({ success: true, id: queuedLog?.id, providerMessageId: providerId }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    } catch (error: any) {
      console.error("SendGrid error:", error)
      await supabase
        .from("comm_messages")
        .update({ status: "failed", meta: { error: String(error?.message || error) } })
        .eq("id", queuedLog?.id)

      return new Response(JSON.stringify({ success: false, error: error?.message || "Failed to send" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }
  } catch (e: any) {
    console.error("comm-send handler error:", e)
    return new Response(JSON.stringify({ error: e?.message || "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
